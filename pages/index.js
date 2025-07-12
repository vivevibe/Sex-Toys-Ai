import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi, I’m your AI toy advisor 👋<br>Ask me anything about sex toys, and I’ll recommend something real." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const inputRef = useRef(null);
  const chatEndRef = useRef(null);

  // 滚到底
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // 发送消息
  async function handleSend(e) {
    e && e.preventDefault();
    if (!input.trim() || loading) return;
    setMessages(msgs => [...msgs, { role: "user", content: input }]);
    setLoading(true);
    setPending(true);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input })
      });
      const data = await res.json();
      setMessages(msgs =>
        [...msgs, { role: "assistant", content: data.reply }]
      );
    } catch {
      setMessages(msgs =>
        [...msgs, { role: "assistant", content: "⚠️ Network error, try again." }]
      );
    }
    setLoading(false);
    setPending(false);
  }

  return (
    <div style={{
      maxWidth: 480, minHeight: "100vh",
      background: "#fff", margin: "0 auto", borderRadius: 18,
      boxShadow: "0 4px 32px #ddd", padding: 0,
      display: "flex", flexDirection: "column"
    }}>
      <div style={{
        padding: "22px 18px 10px 18px",
        fontWeight: 800, fontSize: 22, letterSpacing: 1, borderBottom: "1px solid #f2f2f2"
      }}>
        ViveVibe AI Toy Advisor
      </div>
      <div style={{
        flex: 1, overflowY: "auto", padding: "12px 10px 8px 10px",
        background: "#fafaff", minHeight: 320
      }}>
        {messages.map((msg, i) => (
          <div key={i}
            style={{
              margin: "16px 0",
              textAlign: msg.role === "user" ? "right" : "left",
              display: "flex",
              flexDirection: msg.role === "user" ? "row-reverse" : "row"
            }}>
            <div style={{
              display: "inline-block",
              background: msg.role === "user" ? "#f4f6f8" : "#fff",
              borderRadius: 18,
              padding: "10px 16px",
              color: "#23232a",
              maxWidth: 340,
              fontSize: 15,
              lineHeight: 1.7,
              boxShadow: msg.role === "assistant" ? "0 2px 8px #f6f6fa" : "none",
              border: msg.role === "assistant" ? "1px solid #f6f6fa" : "none"
            }}
              {...(msg.role === "assistant"
                ? { dangerouslySetInnerHTML: { __html: msg.content } }
                : { children: msg.content })} />
          </div>
        ))}
        {/* AI思考中提示 */}
        {pending &&
          <div style={{
            color: "#b8b8c9", fontSize: 15, margin: "10px 0 6px 0", display: "flex", alignItems: "center", gap: 6, paddingLeft: 8
          }}>
            <LoadingDots /> Thinking...
          </div>
        }
        <div ref={chatEndRef}></div>
      </div>
      <form
        onSubmit={handleSend}
        style={{
          display: "flex", gap: 10, padding: 14, borderTop: "1px solid #f2f2f2",
          background: "#fff", alignItems: "center", minHeight: 62
        }}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your question…"
          disabled={loading}
          style={{
            flex: 1,
            border: "1px solid #f0f0f6",
            borderRadius: 16,
            padding: "14px 15px",
            fontSize: 15,
            outline: "none",
            background: loading ? "#fafafa" : "#fff",
            minWidth: 0
          }}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleSend(e);
            }
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            border: "none", background: "#f172a1",
            borderRadius: "50%", width: 44, height: 44,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: loading ? "none" : "0 2px 8px #f2ddea33",
            cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.65 : 1,
            transition: "opacity 0.2s"
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#f172a1" />
            <path d="M7 12l7-4v8l-7-4z" fill="#fff" />
          </svg>
        </button>
      </form>
      <style>{`
        @media (max-width:600px){
          div[style*="max-width: 480"]{max-width:100vw!important;border-radius:0!important;}
        }
      `}</style>
    </div>
  );
}

// 动画组件
function LoadingDots() {
  return (
    <span style={{ display: "inline-block", width: 22, verticalAlign: "middle" }}>
      <span className="dot" style={{
        display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#b8b8c9", marginRight: 2, animation: "dotflash 1.2s infinite"
      }}></span>
      <span className="dot" style={{
        display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#b8b8c9", marginRight: 2, animation: "dotflash 1.2s 0.3s infinite"
      }}></span>
      <span className="dot" style={{
        display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#b8b8c9", animation: "dotflash 1.2s 0.6s infinite"
      }}></span>
      <style>{`
        @keyframes dotflash {
          0%, 80%, 100% { opacity: .4; }
          40% { opacity: 1; }
        }
      `}</style>
    </span>
  );
}
