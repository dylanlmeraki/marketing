import React, { useState } from "react";
import ChatBot from "@/components/ChatBot.jsx";
import NotificationCenter from "@/components/notifications/NotificationCenter";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function FloatingButtons({ user }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Chat Bot with State Tracking */}
      <ErrorBoundary>
        <div>
          <ChatBotWrapper onOpenChange={setIsChatOpen} />
        </div>
      </ErrorBoundary>

      {/* Floating Notification Button */}
      {user && (
        <div className="fixed bottom-6 z-50 flex items-center gap-3 transition-all duration-300"
             style={{ right: isChatOpen ? 'calc(24rem + 1.5rem + 1.5rem)' : '6.5rem' }}>
          <ErrorBoundary>
            <div className="relative">
              <NotificationCenter user={user} />
            </div>
          </ErrorBoundary>
        </div>
      )}
    </>
  );
}

function ChatBotWrapper({ onOpenChange }) {
  return <ChatBotWithCallback onOpenChange={onOpenChange} />;
}

function ChatBotWithCallback({ onOpenChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (newState) => {
    setIsOpen(newState);
    onOpenChange?.(newState);
  };

  return <ChatBot isOpen={isOpen} onToggle={handleToggle} />;
}