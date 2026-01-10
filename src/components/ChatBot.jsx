import React, { useState, useEffect, useRef } from "react";
import { apiClient } from "@/components/utils/apiClient";
import { MessageSquare, X, Send, Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { createPageUrl } from "@/utils";

const STORAGE_KEY = "peci_chatbot_state_v2";
const PHONE = "+14156894428";
const CONSULTATION_PATH = createPageUrl("SWPPPChecker");
const CONTACT_PATH = createPageUrl("Contact");

const URGENCY_KEYWORDS = /\b(asap|urgent|today|tomorrow|now|rush|emergency)\b/i;
const INSPECTION_KEYWORDS = /\b(concrete|inspection|inspections|pour|rebar|shear wall|hold[- ]down|bolt|testing)\b/i;
const TESTING_KEYWORDS = /\b(test|testing|pcb|pcbs|heavy metal|turbidity|coliform|e-coli|e coli|soil|compaction)\b/i;
const SWPPP_KEYWORDS = /\b(swppp|stormwater|bmps|storm water|storm-water)\b/i;
const ENGINEERING_KEYWORDS = /\b(engineer|engineering|structural|design|calc|calculation)\b/i;
const LOCATION_KEYWORDS = /\b([A-Za-z ]+,(?:\s)?(?:CA|California)|San Francisco|Oakland|Berkeley|San Jose|Bay Area)\b/i;
const TIMELINE_KEYWORDS = /\b(\b(?:next week|this week|tomorrow|today|asap|within \d+ (days|weeks))\b)/i;
const AGENCY_KEYWORDS = /\b(permit|city|county|baykeeper|water board|sfbru|caltrans|california)\b/i;

function classifyIntent(text) {
  if (!text) return { intent: "unknown", confidence: 0.5 };
  const t = text.toLowerCase();
  if (URGENCY_KEYWORDS.test(t)) return { intent: "urgent", confidence: 0.99 };
  if (INSPECTION_KEYWORDS.test(t)) return { intent: "inspection", confidence: 0.9 };
  if (TESTING_KEYWORDS.test(t)) return { intent: "testing", confidence: 0.9 };
  if (SWPPP_KEYWORDS.test(t)) return { intent: "swppp", confidence: 0.9 };
  if (ENGINEERING_KEYWORDS.test(t)) return { intent: "engineering", confidence: 0.85 };
  if (/price|cost|rate|quote/.test(t)) return { intent: "pricing", confidence: 0.8 };
  if (/contact|talk|call|phone/.test(t)) return { intent: "contact", confidence: 0.8 };
  if (/consult|consultation|start form|intake|schedule/.test(t)) return { intent: "consult", confidence: 0.85 };
  return { intent: "unknown", confidence: 0.5 };
}

function extractEntities(text) {
  if (!text) return {};
  const entities = {};
  const loc = text.match(LOCATION_KEYWORDS);
  if (loc) entities.location = loc[0].trim();
  const tl = text.match(TIMELINE_KEYWORDS);
  if (tl) entities.timeline = tl[0].trim();
  const ag = text.match(AGENCY_KEYWORDS);
  if (ag) entities.agency = ag[0].trim();
  if (INSPECTION_KEYWORDS.test(text)) entities.projectType = "inspection";
  else if (TESTING_KEYWORDS.test(text)) entities.projectType = "testing";
  else if (SWPPP_KEYWORDS.test(text)) entities.projectType = "swppp";
  else if (ENGINEERING_KEYWORDS.test(text)) entities.projectType = "engineering";
  return entities;
}

function loadState() {
  try {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveState(state) {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // noop
  }
}

function formatPhoneForDisplay(phone) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    return `(${digits.slice(1,4)}) ${digits.slice(4,7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
  }
  return phone;
}

export default function ChatBot({ isOpen: controlledIsOpen, onToggle }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;
  
  const setIsOpen = (val) => {
    if (onToggle) onToggle(val);
    else setInternalOpen(val);
  };

  const [messages, setMessages] = useState([]);
  const [memory, setMemory] = useState({ projectType: null, location: null, timeline: null, agency: null });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [urgentFlag, setUrgentFlag] = useState(false);
  const [showCallOverlay, setShowCallOverlay] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [sessionId] = useState(() => `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  const messagesEndRef = useRef(null);

  // Load saved state on mount
  useEffect(() => {
    const saved = loadState();
    if (saved) {
      setMessages(saved.messages || []);
      setMemory(saved.memory || { projectType: null, location: null, timeline: null, agency: null });
    }
    setInitialized(true);
  }, []);

  // Save state when messages/memory change
  useEffect(() => {
    if (initialized) {
      saveState({ messages, memory });
    }
  }, [messages, memory, initialized]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Check for urgency
  useEffect(() => {
    const lastUser = [...messages].reverse().find(m => m.role === "user");
    const lastText = input || (lastUser?.content) || "";
    setUrgentFlag(URGENCY_KEYWORDS.test(lastText));
  }, [messages, input]);

  // Log conversation when chat is closed or after significant exchanges
  useEffect(() => {
    if (!isOpen && messages.length >= 3) {
      logConversation();
    }
  }, [isOpen]);

  const logConversation = async () => {
    if (messages.length < 3) return;
    
    try {
      await apiClient.functions.logChatbotActivity({ sessionId, messages, memory, urgentFlag });
    } catch (error) {
      console.error("Failed to log conversation:", error);
    }
  };

  const defaultQuickActions = [
    "Start consultation",
    "Contact page",
    `Call ${formatPhoneForDisplay(PHONE)}`
  ];

  const systemPrompt = `You are Jordan, the friendly AI assistant for Pacific Engineering & Construction Inc., a Bay Area engineering and construction firm with decades of expertise. 

Your personality: You're approachable, conversational, and genuinely helpful - like chatting with a knowledgeable friend who happens to be an expert in construction services. You use natural language, occasional light humor when appropriate, and empathetic responses. You understand the stress of managing projects and compliance requirements.

Your expertise: You have deep knowledge about:
- SWPPP (stormwater pollution prevention planning)
- Construction services (Class A & B licensed work)
- Inspections & Testing (materials, stormwater, structural)
- Structural Engineering (seismic, foundation, design)
- Special Inspections (welding, structural materials)
- Bay Area regulations and permitting processes
- Timeline and compliance requirements

Your approach:
1. Listen actively and understand the user's actual needs (don't just push for conversion)
2. Provide genuinely helpful information - if they have a simple question, answer it clearly
3. Use 2-3 sentence responses (conversational but concise)
4. Show personality: use phrases like "I'd love to help with that" or "Great question!" or "That makes sense"
5. When appropriate, share brief relevant insights or context
6. Naturally guide toward next steps when the conversation warrants it
7. Escalate to human contact when: complex technical questions arise, urgent needs are detected, or after 3-4 exchanges without resolution

Call to action strategy:
- PRIMARY: Encourage starting the consultation form (comprehensive project intake)
- SECONDARY: Call ${formatPhoneForDisplay(PHONE)} for urgent matters or quick questions
- TERTIARY: Contact page for general inquiries

When to escalate to human:
- User mentions "urgent", "emergency", or time-sensitive needs
- Technical questions beyond basic information
- Pricing discussions (suggest consultation for accurate quotes)
- Complex project scenarios requiring expert assessment
- User expresses frustration or confusion
- After 4+ back-and-forth exchanges without clear resolution

Remember: You're here to be helpful first, generate leads second. Building trust through genuine assistance converts better than aggressive sales tactics.`;

  const buildSuggestionChips = (intent) => {
    const base = ["Start consultation", "Contact page", `Call ${formatPhoneForDisplay(PHONE)}`];
    switch (intent) {
      case "inspection":
        return ["Start inspection consultation", "Request next-day availability", ...base];
      case "testing":
        return ["Schedule testing", "Ask about PCB testing", ...base];
      case "swppp":
        return ["Start SWPPP consultation", "Ask about BMP timing", ...base];
      case "pricing":
        return ["Get a pricing consult", "Provide project details", ...base];
      case "urgent":
        return ["Call now", "Request urgent scheduling", ...base];
      case "contact":
        return ["Open Contact page", ...base];
      default:
        return base;
    }
  };

  const ensureCTA = (text) => {
    const lower = (text || "").toLowerCase();
    if (/(consult|start the consultation|start consultation|start intake|call|phone)/.test(lower)) return text;
    return `${text.trim()} Start the consultation or call ${formatPhoneForDisplay(PHONE)}?`;
  };

  const sendMessage = async (messageText) => {
    if (!messageText || !messageText.trim()) return;
    const trimmed = messageText.trim();

    const userMessage = { role: "user", content: trimmed, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const classification = classifyIntent(trimmed);
    const entities = extractEntities(trimmed);

    const newMemory = { ...memory };
    if (entities.projectType) newMemory.projectType = newMemory.projectType || entities.projectType;
    if (entities.location) newMemory.location = newMemory.location || entities.location;
    if (entities.timeline) newMemory.timeline = newMemory.timeline || entities.timeline;
    if (entities.agency) newMemory.agency = newMemory.agency || entities.agency;
    setMemory(newMemory);

    const chips = buildSuggestionChips(classification.intent);
    setSuggestions(chips);

    const isUrgent = classification.intent === "urgent" || URGENCY_KEYWORDS.test(trimmed);
    if (isUrgent) {
      setShowCallOverlay(true);
    }

    try {
      const conv = [
        { role: "system", content: systemPrompt },
        { role: "system", content: `Context about this conversation: ${JSON.stringify(newMemory)}. Message count: ${messages.length}` },
        ...messages.slice(-8),
        { role: "user", content: trimmed }
      ];

      const promptForLLM = conv.map(m => `${m.role}: ${m.content}`).join("\n\n");

      const shouldEscalate = 
        messages.length >= 8 || 
        /complex|pricing|quote|cost|technical|specification|urgent|emergency/i.test(trimmed);

      const response = await apiClient.integrations.Core.InvokeLLM({
        prompt: shouldEscalate 
          ? `${promptForLLM}\n\nNote: This conversation has gone on for a while or involves complex/urgent needs. Consider suggesting they speak with our team directly via call or consultation form.`
          : promptForLLM,
      });

      let assistantText = (typeof response === "string") ? response : (response?.output || "I'd love to help! Want to start a consultation?");
      
      // Don't force CTAs on every response - let natural conversation flow
      const finalAssistantText = shouldEscalate ? ensureCTA(assistantText) : assistantText;

      const assistantMessage = { role: "assistant", content: finalAssistantText, timestamp: new Date().toISOString() };
      setMessages(prev => [...prev, assistantMessage]);

      if (/consultation|start|call|schedule|contact|book/.test(finalAssistantText.toLowerCase())) {
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              role: "system",
              content: "quick_actions",
              actions: chips.length ? chips : defaultQuickActions
            }
          ]);
        }, 600);
      }

    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: `Sorry — a technical issue occurred. Please call ${formatPhoneForDisplay(PHONE)} or visit our Contact page.`, 
        timestamp: new Date().toISOString() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action) => {
    if (!action) return;
    if (/start consultation|start inspection|start swppp|schedule/i.test(action)) {
      window.location.href = CONSULTATION_PATH;
    } else if (/contact/i.test(action)) {
      window.location.href = CONTACT_PATH;
    } else if (/call/i.test(action)) {
      window.location.href = `tel:${PHONE}`;
    } else if (/availability/i.test(action)) {
      sendMessage(action);
    } else {
      sendMessage(action);
    }
  };

  const clearHistory = () => {
    if (messages.length >= 3) {
      logConversation();
    }
    setMessages([]);
    setMemory({ projectType: null, location: null, timeline: null, agency: null });
    setSuggestions([]);
    saveState({ messages: [], memory: { projectType: null, location: null, timeline: null, agency: null } });
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 group relative"
            aria-label="Open chat"
          >
            <MessageSquare className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse" />
          </button>
        </div>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col h-[600px] max-h-[calc(100vh-8rem)]">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Jordan - Pacific Engineering</h3>
                  <p className="text-blue-100 text-xs">Here to help with your project needs 👋</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {urgentFlag && (
                  <a
                    href={`tel:${PHONE}`}
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500 text-white text-sm font-semibold animate-pulse shadow-lg"
                  >
                    <Phone className="w-4 h-4" /> Call now
                  </a>
                )}
                <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.length === 0 && (
                <div className="text-center space-y-4 py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto">
                    <MessageSquare className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Hello! Jordan here.</h4>
                    <p className="text-sm text-gray-600">Ask me anything about our services, or let me help you get started!</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center pt-2">
                    {defaultQuickActions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickAction(action)}
                        className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm rounded-lg transition-colors font-medium"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message, index) => (
                <div key={index}>
                  {message.role === "user" ? (
                    <div className="flex justify-end">
                      <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-tr-sm max-w-[80%]">
                        {message.content}
                      </div>
                    </div>
                  ) : message.role === "system" && message.content === "quick_actions" ? (
                    <div className="flex gap-2 justify-start flex-wrap">
                      {message.actions?.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickAction(action)}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors font-medium shadow-sm"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  ) : message.role === "assistant" ? (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl rounded-tl-sm max-w-[80%] shadow-sm">
                        {message.content}
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl rounded-tl-sm">
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion chips */}
            {suggestions.length > 0 && messages.length > 0 && (
              <div className="p-3 bg-white border-t border-gray-200 flex gap-2 overflow-x-auto">
                {suggestions.slice(0, 4).map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickAction(s)}
                    className="flex-shrink-0 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full text-sm font-medium shadow hover:scale-105 transform transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input form */}
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className={cn("bg-blue-600 hover:bg-blue-700", isLoading && "opacity-60")}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              {messages.length > 0 && (
                <button 
                  type="button" 
                  onClick={clearHistory}
                  className="text-xs text-gray-400 hover:text-gray-600 mt-2 transition-colors"
                >
                  Clear chat history
                </button>
              )}
            </form>
          </div>

          {/* Urgent call overlay */}
          {showCallOverlay && (
            <div className="mt-3 rounded-lg shadow-lg bg-white p-3 flex items-center gap-3 border border-red-100">
              <div className="flex-1">
                <div className="text-sm font-semibold text-red-600">Urgent request?</div>
                <div className="text-xs text-slate-600">Call now for fastest scheduling or request urgent availability.</div>
              </div>
              <div className="flex gap-2">
                <a href={`tel:${PHONE}`} className="bg-red-500 text-white px-3 py-2 rounded-lg font-semibold hover:bg-red-600 transition">Call</a>
                <button onClick={() => setShowCallOverlay(false)} className="px-3 py-2 rounded border hover:bg-gray-50 transition">Dismiss</button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}