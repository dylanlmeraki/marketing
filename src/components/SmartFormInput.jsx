import React, { useState, useEffect, useRef } from "react";
import { apiClient } from "@/components/utils/apiClient";
import { Input } from "@/components/ui/input";
import { Loader2, Check, Sparkles } from "lucide-react";

export default function SmartFormInput({ 
  value, 
  onChange, 
  type = "text",
  placeholder,
  id,
  className = "",
  onSuggestionAccept,
  enableSmartComplete = true
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSmartSuggestions = async (inputValue) => {
    if (!enableSmartComplete || !inputValue || inputValue.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    
    try {
      let prompt = "";
      
      if (type === "address") {
        prompt = `Given the partial address "${inputValue}", suggest 3 complete, realistic California addresses that match. Format each as a single line address. Return ONLY a JSON array of strings, no explanations.`;
      } else if (type === "company") {
        prompt = `Given the partial company name "${inputValue}", suggest 3 realistic construction/engineering company names in the Bay Area. Return ONLY a JSON array of strings, no explanations.`;
      } else {
        return;
      }

      const response = await apiClient.integrations.Core.InvokeLLM({
        prompt: prompt,
        response_json_schema: {
          type: "object",
          properties: {
            suggestions: {
              type: "array",
              items: { type: "string" }
            }
          }
        }
      });

      if (response?.suggestions && Array.isArray(response.suggestions)) {
        setSuggestions(response.suggestions);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error("Smart suggestion error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(e);
    
    if (debounceRef.current) clearTimeout(debounceRef.current);
    
    debounceRef.current = setTimeout(() => {
      fetchSmartSuggestions(newValue);
    }, 800);
  };

  const handleSuggestionClick = (suggestion) => {
    onChange({ target: { value: suggestion } });
    setSuggestions([]);
    setShowSuggestions(false);
    if (onSuggestionAccept) onSuggestionAccept(suggestion);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[selectedIndex]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <Input
          id={id}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder={placeholder}
          className={className}
        />
        {enableSmartComplete && isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
          </div>
        )}
        {enableSmartComplete && !isLoading && value && value.length >= 3 && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Sparkles className="w-4 h-4 text-blue-600" />
          </div>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-auto">
          <div className="p-2 border-b border-gray-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-xs text-gray-600 font-medium">AI Suggestions</span>
          </div>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0 ${
                selectedIndex === index ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{suggestion}</span>
                <Check className="w-4 h-4 text-blue-600 opacity-0 group-hover:opacity-100" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}