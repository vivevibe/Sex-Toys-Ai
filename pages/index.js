import { useState, useRef, useEffect } from "react";

// 品牌头像（AI消息用）
const BOT_AVATAR = "https://cdn.shopify.com/s/files/1/0940/0539/5765/files/20250513211746.png?v=1747712780";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi, I’m your AI toy advisor 👋<br>Ask me anything about sex toys, and I’ll recommend something real." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
      minHeight: "100vh", width: "100vw", background: "#fafaff", margin: 0, padding: 0,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        width: "100%", maxWidth: 650,
        minHeight: "96vh", background: "#fff", borderRadius: 0,
        boxShadow: "0 4px 32px #eee",
        display: "flex", flexDirection: "column",
        margin: 0, overflow: "hidden"
      }}>
        <div style={{
          padding: "24px 22px 14px 22px",
          fontWeight: 800, fontSize: 25, letterSpacing: 1,
          borderBottom: "1px solid #f2f2f2",
          display: "flex", alignItems: "center", gap: 10
        }}>
          <img src={BOT_AVATAR} style={{ width: 38, height: 38, borderRadius: "18px", marginRight: 10, background: "#fff" }} alt="ViveVibe" />
          ViveVibe AI Toy Advisor
        </div>
        <div style={{
          flex: 1, overflowY: "auto", padding: "22px 16px 14px 16px",
          background: "#fafaff", minHeight: 320
        }}>
          {messages.map((msg, i) => (
            <div key={i}
              style={{
                margin: "20px 0",
                textAlign: msg.role === "user" ? "right" : "left",
                display: "flex",
                flexDirection: msg.role === "user" ? "row-reverse" : "row",
                alignItems: "flex-start"
              }}>
              {/* 头像，仅AI显示 */}
              {msg.role === "assistant" && (
                <img src={BOT_AVATAR}
                  alt="Bot" style={{
                    width: 34, height: 34, borderRadius: "16px", marginRight: 10, marginTop: 1, background: "#fff", flexShrink: 0
                  }} />
              )}
              <div style={{
                display: "inline-block",
                background: msg.role === "user" ? "#f4f6f8" : "#fff",
                borderRadius: 18,
                padding: "11px 18px",
                color: "#23232a",
                maxWidth: 450,
                fontSize: 16,
                lineHeight: 1.7,
                boxShadow: msg.role === "assistant" ? "0 2px 8px #f6f6fa" : "none",
                border: msg.role === "assistant" ? "1px solid #f6f6fa" : "none",
                marginLeft: msg.role === "assistant" ? 0 : "auto"
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
            display: "flex", gap: 10, padding: 18, borderTop: "1px solid #f2f2f2",
            background: "#fff", alignItems: "center", minHeight: 66
          }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your question…"
            disabled={loading}
            style={{
              flex: 1,
              border: "1px solid #f0f0f6",
              borderRadius: 16,
              padding: "15px 17px",
              fontSize: 16,
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
              borderRadius: "50%", width: 50, height: 50,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: loading ? "none" : "0 2px 8px #f2ddea33",
              cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.65 : 1,
              transition: "opacity 0.2s", padding: 0
            }}
          >
            {/* 你的品牌icon */}
            <img src={BOT_AVATAR} alt="send" style={{ width: 26, height: 26 }} />
          </button>
        </form>
        <style>{`
          @media (max-width: 750px){
            div[style*="max-width: 650"]{max-width:100vw!important;border-radius:0!important;}
            .chatbox-main{padding-left:3vw!important;padding-right:3vw!important;}
          }
          html,body{background:#fafaff!important;}
        `}</style>
      </div>
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
