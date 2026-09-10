"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  X,
  Send,
  Sparkles,
  RotateCcw,
  User,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import { useChat } from "@ai-sdk/react";

const PRESET_PROMPTS = [
  "🔥 Quick 20-min HIIT routine",
  "🥗 High-protein post-workout meal",
  "💪 4-Day hypertrophy split",
  "🧘 Best stretches for back pain",
];

const INITIAL_MESSAGES = [
  {
    id: "coach-welcome",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Hey champion! 🏋️ I'm FitPulse AI Coach. Ask me about workout routines, nutrition advice, or fitness goals!",
      },
    ],
  },
];

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const {
    messages,
    sendMessage,
    status,
    setMessages,
  } = useChat({
    api: "/api/chat",
    messages: INITIAL_MESSAGES,
    onError: (error) => {
      toast.error(error?.message || "Failed to get AI response. Check GEMINI_API_KEY.");
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSend = (customPrompt) => {
    const messageText = (customPrompt || input).trim();
    if (!messageText || isLoading) return;

    sendMessage({ text: messageText });
    setInput("");
  };

  const handlePresetClick = (prompt) => {
    handleSend(prompt);
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
    toast.success("Chat conversation reset!");
  };

  // Helper to extract text from message regardless of format (content or parts)
  const getMessageText = (msg) => {
    if (typeof msg.content === "string") return msg.content;
    if (Array.isArray(msg.parts)) {
      return msg.parts
        .filter((part) => part.type === "text")
        .map((part) => part.text)
        .join("");
    }
    return "";
  };

  // Helper to format bold markdown and line breaks cleanly
  const renderFormattedText = (text) => {
    return text.split("\n").map((line, index) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={index} className="min-h-[1.25rem]">
          {parts.map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={i} className="text-primary font-semibold">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  const isWaitingInitialResponse =
    isLoading &&
    (messages.length === 0 || messages[messages.length - 1]?.role === "user");

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <div className="relative">
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open FitPulse AI Chatbot"
              className="group flex items-center gap-2.5 px-4 py-3 bg-bg-card border-2 border-primary/40 hover:border-primary text-foreground rounded-full shadow-2xl hover:shadow-primary/20 hover:scale-104 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-secondary transition-colors">
                <Bot className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold tracking-wide hidden sm:inline text-foreground">
                Coach AI
              </span>
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            </button>
          </div>
        )}
      </div>

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] bg-bg-card/95 backdrop-blur-xl border border-primary/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 bg-bg-navbar/80 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                    FitPulse AI Coach
                  </h3>
                  <p className="text-[11px] text-neutral-light">
                    Ask about Workout plans, Nutrition & Fitness Goals.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Reset Conversation"
                  aria-label="Reset Conversation"
                  className="p-1.5 rounded-lg text-neutral-light hover:text-foreground hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Chat"
                  aria-label="Close Chat"
                  className="p-1.5 rounded-lg text-neutral-light hover:text-foreground hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
              {messages.map((msg, idx) => {
                const isUser = msg.role === "user";
                const messageText = getMessageText(msg);
                const isLast = idx === messages.length - 1;

                if (!messageText && !isUser && !(isLoading && isLast)) return null;

                return (
                  <div
                    key={msg.id || idx}
                    className={`flex items-start gap-2.5 ${
                      isUser ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                        isUser
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "bg-secondary text-primary border border-white/10"
                      }`}
                    >
                      {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 max-w-[80%] leading-relaxed ${
                        isUser
                          ? "bg-primary text-secondary font-medium rounded-tr-xs"
                          : "bg-secondary/90 text-foreground border border-white/10 rounded-tl-xs"
                      }`}
                    >
                      {isUser ? (
                        <p className="whitespace-pre-wrap">{messageText}</p>
                      ) : messageText ? (
                        <div className="space-y-1">
                          {renderFormattedText(messageText)}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 py-1 px-1">
                          <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
                          <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></span>
                          <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Loading Indicator (before stream starts) */}
              {isWaitingInitialResponse && (
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-secondary text-primary border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-secondary/90 border border-white/10 rounded-2xl rounded-tl-xs px-3.5 py-2.5 flex items-center gap-2 text-neutral-light text-xs">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                    <span>AI Coach is crafting your answer...</span>
                  </div>
                </div>
              )}

              {/* Preset suggestion chips (visible when only welcome message exists) */}
              {messages.length <= 1 && !isLoading && (
                <div className="pt-2">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-light mb-2">
                    Quick suggestions:
                  </p>
                  <div className="grid grid-cols-1 gap-1.5">
                    {PRESET_PROMPTS.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handlePresetClick(prompt)}
                        className="text-left text-xs bg-secondary/70 hover:bg-primary/10 hover:border-primary/40 border border-white/5 rounded-xl px-3 py-2 text-neutral-light hover:text-foreground transition-all duration-150 cursor-pointer"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-bg-navbar/90 border-t border-white/5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask for workout, diet, form tips..."
                  disabled={isLoading}
                  className="flex-1 bg-secondary border border-white/10 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs text-foreground placeholder:text-neutral-light/50 focus:outline-none transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 bg-primary text-secondary rounded-xl hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center flex-shrink-0 cursor-pointer"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-neutral-light/60">
                <span>FitPulse Coach AI</span>
                <span>AI can make mistakes. Please verify important info!</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
