import { useState, useRef, useEffect } from "react";

// 飞机icon（SVG）
function SendIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#f172a1" />
      <path d="M7 12l7-4v8l-7-4z" fill="#fff" />
    </svg>
  );
}

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
      minHeight: "100vh",
      width: "100vw",
      background: "#fafaff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      {/* 主内容区域 */}
      <div style={{
        width: "100%",
        maxWidth: 820,
        minHeight: "100vh",
        margin: 0,
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        borderRadius: 0,
        boxShadow: "0 2px 24px #f4f4fa",
        position: "relative"
      }}>
        {/* 顶部栏 */}
        <div style={{
          padding: "28px 30px 20px 30px",
          fontWeight: 800,
          fontSize: 26,
          letterSpacing: 1,
          borderBottom: "1px solid #f2f2f2",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          gap: 16
        }}>
          <img src={BOT_AVATAR} alt="ViveVibe" style={{
            width: 38, height: 38, borderRadius: 18, marginRight: 10, background: "#fff"
          }} />
          ViveVibe AI Toy Advisor
        </div>

        {/* 聊天内容 */}
        <div style={{
          flex: 1,
          width: "100%",
          overflowY: "auto",
          padding: "38px 0 40px 0",
          background: "#fafaff",
          display: "flex",
          flexDirection: "column"
        }}>
          <div style={{ width: "100%", maxWidth: 650, margin: "0 auto" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: "flex",
                flexDirection: msg.role === "user" ? "row-reverse" : "row",
                alignItems: "flex-start",
                marginBottom: 24
              }}>
                {/* 头像和气泡留白 */}
                {msg.role === "assistant" &&
                  <div style={{
                    width: 42,
                    display: "flex",
                    justifyContent: "flex-start",
                    marginRight: 6
                  }}>
                    <img src={BOT_AVATAR}
                      alt="Bot" style={{
                        width: 36, height: 36, borderRadius: 18,
                        marginTop: 3, background: "#fff", flexShrink: 0
                      }} />
                  </div>
                }
                <div style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start"
                }}>
                  <div style={{
                    background: msg.role === "user" ? "#f4f6f8" : "#fff",
                    borderRadius: 19,
                    padding: "14px 22px",
                    color: "#23232a",
                    maxWidth: 490,
                    minHeight: 24,
                    fontSize: 16,
                    lineHeight: 1.75,
                    boxShadow: msg.role === "assistant" ? "0 2px 8px #f6f6fa" : "none",
                    border: msg.role === "assistant" ? "1px solid #f6f6fa" : "none",
                    marginLeft: msg.role === "assistant" ? 0 : "auto",
                    marginRight: msg.role === "user" ? 0 : 0
                  }}
                    {...(msg.role === "assistant"
                      ? { dangerouslySetInnerHTML: { __html: msg.content } }
                      : { children: msg.content })} />
                </div>
                {/* user侧头像留白占位，保证居中对称 */}
                {msg.role === "user" && <div style={{ width: 42, marginLeft: 6 }}></div>}
              </div>
            ))}
            {/* AI思考中提示 */}
            {pending &&
              <div style={{
                color: "#b8b8c9", fontSize: 16, margin: "8px 0 10px 54px", display: "flex", alignItems: "center", gap: 8,
              }}>
                <LoadingDots /> Thinking...
              </div>
            }
            <div ref={chatEndRef}></div>
          </div>
        </div>

        {/* 输入框 */}
        <form
          onSubmit={handleSend}
          style={{
            width: "100%",
            padding: "18px 0 18px 0",
            borderTop: "1px solid #f2f2f2",
            background: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
          <div style={{
            width: "100%", maxWidth: 650, display: "flex", gap: 12, alignItems: "center"
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your question…"
              disabled={loading}
              style={{
                flex: 1,
                border: "1px solid #f0f0f6",
                borderRadius: 17,
                padding: "16px 18px",
                fontSize: 16,
                outline: "none",
                background: loading ? "#fafafa" : "#fff",
                minWidth: 0,
                boxShadow: "0 2px 8px #f6f6fa"
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
              <SendIcon size={28} />
            </button>
          </div>
        </form>
        <style>{`
          @media (max-width: 900px){
            div[style*="max-width: 820"]{max-width:100vw!important;border-radius:0!important;}
            div[style*="max-width: 650"]{max-width:97vw!important;}
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
