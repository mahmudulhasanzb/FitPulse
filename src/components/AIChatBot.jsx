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
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";
import { sendChatMessage } from "@/lib/api/chat/action";

const PRESET_PROMPTS = [
  "🔥 Quick 20-min HIIT routine",
  "🥗 High-protein post-workout meal",
  "💪 4-Day hypertrophy split",
  "🧘 Best stretches for back pain",
];

const INITIAL_MESSAGES = [
  {
    role: "model",
    content:
      "Hey champion! 🏋️ I'm your **FitPulse AI Coach**. Ask me about workout routines, nutrition advice, exercise form, or finding the right fitness class!",
  },
];

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSend = async (customPrompt) => {
    const messageText = customPrompt || input.trim();
    if (!messageText || isLoading) return;

    const userMessage = { role: "user", content: messageText };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const data = await sendChatMessage(updatedMessages);
      if (data?.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "model", content: data.reply },
        ]);
      }
    } catch (error) {
      toast.error(error.message || "Failed to get AI response. Check GEMINI_API_KEY.");
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content:
            "⚠️ Sorry, I encountered an issue connecting to my brain. Please ensure the `GEMINI_API_KEY` is configured in your `.env` file.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
    toast.success("Chat conversation reset!");
  };

  // Helper to format bold markdown and line breaks cleanly
  const renderFormattedText = (text) => {
    return text.split("\n").map((line, index) => {
      // Basic bold parsing: **text**
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

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <div className="relative">
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-primary"></span>
            </span>
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open FitPulse AI Chatbot"
              className="group flex items-center gap-2.5 px-4 py-3 bg-bg-card border-2 border-primary/40 hover:border-primary text-foreground rounded-full shadow-2xl hover:shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-secondary transition-colors">
                <Bot className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold tracking-wide hidden sm:inline text-foreground">
                Ask Coach AI
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
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary rounded-full ring-2 ring-bg-dark"></span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                    FitPulse AI Coach
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                      Gemini
                    </span>
                  </h3>
                  <p className="text-[11px] text-neutral-light">
                    Online • Workouts, Nutrition & Form
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Reset Conversation"
                  aria-label="Reset Conversation"
                  className="p-1.5 rounded-lg text-neutral-light hover:text-foreground hover:bg-white/5 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Chat"
                  aria-label="Close Chat"
                  className="p-1.5 rounded-lg text-neutral-light hover:text-foreground hover:bg-white/5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
              {messages.map((msg, idx) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={idx}
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
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      ) : (
                        <div className="space-y-1">
                          {renderFormattedText(msg.content)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-secondary text-primary border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-secondary/90 border border-white/10 rounded-2xl rounded-tl-xs px-3.5 py-2.5 flex items-center gap-2 text-neutral-light text-xs">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                    <span>Coach is crafting your answer...</span>
                  </div>
                </div>
              )}

              {/* Preset suggestion chips (visible when starting) */}
              {messages.length <= 1 && !isLoading && (
                <div className="pt-2">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-light mb-2">
                    Quick suggestions:
                  </p>
                  <div className="grid grid-cols-1 gap-1.5">
                    {PRESET_PROMPTS.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(prompt)}
                        className="text-left text-xs bg-secondary/70 hover:bg-primary/10 hover:border-primary/40 border border-white/5 rounded-xl px-3 py-2 text-neutral-light hover:text-foreground transition-all duration-150"
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
                  onKeyDown={handleKeyDown}
                  placeholder="Ask for workout, diet, form tips..."
                  disabled={isLoading}
                  className="flex-1 bg-secondary border border-white/10 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs text-foreground placeholder:text-neutral-light/50 focus:outline-none transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 bg-primary text-secondary rounded-xl hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center flex-shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-neutral-light/60">
                <span>FitPulse Coach AI</span>
                <span>Powered by Gemini</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
