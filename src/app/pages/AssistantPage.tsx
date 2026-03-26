import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { Send, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "ai" | "user";
  text: string;
}

const aiResponses = [
  "Great question! Let me break that down for you in a simpler way.",
  "That's a common confusion! Think of it this way — the key insight is that you need to work backwards from what you want to prove.",
  "Let me give you a quick practice problem to test your understanding. If f(x) = x², what is the limit as x approaches 3?",
  "Exactly right! You're getting the hang of this. Want to try a harder example?",
];

const initialMessages: Message[] = [
  {
    id: "1",
    role: "ai",
    text: "Hi Alex! I see you're working on MATH 125 limits today. Want me to explain ε-δ in simple terms?",
  },
  {
    id: "2",
    role: "user",
    text: "Yes please, I keep getting confused by the formal definition.",
  },
  {
    id: "3",
    role: "ai",
    text: "Think of it like a zoom lens 🔍\nε = how close to the limit value you want.\nδ = how close your input needs to be to get there.\n\nWant a quick practice problem?",
  },
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const aiResponseIdx = useRef(0);

  useEffect(() => {
    // Keep the latest reply visible, but do not jump on initial render.
    if (messages.length > initialMessages.length || isTyping) {
      bottomRef.current?.scrollIntoView({ behavior: "instant" });
    }
  }, [messages, isTyping]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = aiResponses[aiResponseIdx.current % aiResponses.length];
      aiResponseIdx.current++;
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "ai", text: reply },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className="flex flex-col"
      style={{ height: "var(--page-height)", background: "transparent" }}
    >
      {/* Header — transparent, blends into gradient */}
      <header className="shrink-0 px-5 pt-5 pb-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[18px]"
            style={{
              background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
              boxShadow: "0 6px 20px rgba(13,148,136,0.32)",
            }}
            aria-hidden="true"
          >
            <Sparkles size={20} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1
              className="text-[18px] text-[#0f172a] leading-tight"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
            >
              Study Assistant
            </h1>
            <p className="text-[11px] text-[#94a3b8] font-medium mt-0.5">
              Powered by AI · MATH 125
            </p>
          </div>
          <span
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-bold shrink-0"
            style={{ background: "rgba(13,148,136,0.12)", color: "#0d9488" }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#0d9488] animate-pulse"
              aria-hidden="true"
            />
            Online
          </span>
        </div>
      </header>

      {/* Messages */}
      <main
        className="flex flex-1 flex-col overflow-y-auto px-4"
        aria-label="Conversation"
        aria-live="polite"
        aria-relevant="additions"
      >
        <div className="flex flex-col gap-2.5 py-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "ai" && (
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] mb-0.5"
                style={{
                  background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                  boxShadow: "0 2px 8px rgba(13,148,136,0.25)",
                }}
                aria-hidden="true"
              >
                <Sparkles size={13} className="text-white" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-[20px] px-4 py-3 text-[13px] leading-relaxed ${
                msg.role === "user"
                  ? "rounded-br-[6px] text-white"
                  : "rounded-bl-[6px] text-[#0f172a]"
              }`}
              style={
                msg.role === "user"
                  ? {
                      background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                      boxShadow: "0 4px 18px rgba(13,148,136,0.3)",
                    }
                  : {
                      background: "rgba(255,255,255,0.88)",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                      border: "1px solid rgba(255,255,255,0.95)",
                    }
              }
              role="article"
              aria-label={msg.role === "ai" ? "Assistant message" : "Your message"}
            >
              {msg.text.split("\n").map((line, i) => (
                <p key={i} className={i > 0 ? "mt-1" : ""}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-end gap-2">
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] mb-0.5"
              style={{
                background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                boxShadow: "0 2px 8px rgba(13,148,136,0.25)",
              }}
              aria-hidden="true"
            >
              <Sparkles size={13} className="text-white" />
            </div>
            <div
              className="flex gap-1.5 rounded-[20px] rounded-bl-[6px] px-4 py-3.5"
              aria-label="Assistant is typing"
              aria-live="polite"
              style={{
                background: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                border: "1px solid rgba(255,255,255,0.95)",
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: "#0d9488",
                    opacity: 0.5,
                    animation: "typing-bounce 1.2s ease-in-out infinite",
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
        </div>
      </main>

      {/* Input — frosted glass, no hard divider */}
      <div className="shrink-0 px-4 pt-2 pb-3">
        <div
          className="flex items-end gap-2.5 rounded-[22px] px-4 py-2.5"
          style={{
            background: "rgba(255,255,255,0.82)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.09), 0 1px 0 rgba(255,255,255,0.9) inset",
            border: "1.5px solid rgba(255,255,255,0.9)",
          }}
        >
          <label htmlFor="chat-input" className="sr-only">
            Ask a question
          </label>
          <textarea
            id="chat-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your studies…"
            rows={1}
            className="flex-1 resize-none bg-transparent py-1.5 text-[13px] text-gray-800 placeholder-[#b0bac9] focus:outline-none"
            style={{ maxHeight: "120px", fontFamily: "var(--font-sans)" }}
            aria-label="Message input"
          />
          <button
            type="button"
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            aria-label="Send message"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] text-white transition-all disabled:opacity-25 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488] focus-visible:ring-offset-2"
            style={{
              background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
              boxShadow: input.trim() ? "0 4px 14px rgba(13,148,136,0.4)" : "none",
            }}
          >
            <Send size={14} aria-hidden="true" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes typing-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.45; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
