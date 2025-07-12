import { useState, useRef, useEffect } from "react";

const BOT_AVATAR = "https://cdn.shopify.com/s/files/1/0940/0539/5765/files/logo.png?v=1752330541";

// 飞机icon
function SendIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#19c37d" />
      <path d="M7 12l7-4v8l-7-4z" fill="#fff" />
    </svg>
  );
}

// 大卡片（和上面一样）
function ProductCard({ name, img, desc, url }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 22,
      border: "1.5px solid #eaeaea",
      borderRadius: 18,
      padding: "20px 26px",
      margin: "30px 0",
      background: "#fff",
      boxShadow: "0 3px 16px #f3f3f5cc",
      minWidth: 0, maxWidth: 540
    }}>
      <img src={img} alt={name}
        style={{
          width: 98, height: 98, objectFit: "cover",
          borderRadius: 15, boxShadow: "0 2px 12px #f3e7ed55", background: "#fafafc"
        }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontWeight: 800, fontSize: 19, color: "#ea3c77",
          marginBottom: 7, letterSpacing: 0.5
        }}>{name}</div>
        <div style={{
          color: "#444", fontSize: 15.2, marginBottom: 14, lineHeight: 1.65, fontWeight: 400
        }}>{desc}</div>
        <a href={url} target="_blank" rel="noopener"
          style={{
            fontWeight: 700, color: "#19c37d", fontSize: 15.5,
            textDecoration: "underline"
          }}>See Details &gt;</a>
      </div>
    </div>
  );
}

// 插入产品卡
function renderWithProductCards(html) {
  const regex = /<div class="product-card" data-product='([^']+)'><\/div>/g;
  let lastIndex = 0, match, output = [];
  let key = 0;
  while ((match = regex.exec(html))) {
    if (match.index > lastIndex) {
      output.push(
        <span key={key++}
          dangerouslySetInnerHTML={{ __html: html.slice(lastIndex, match.index) }} />
      );
    }
    try {
      const prod = JSON.parse(match[1]);
      output.push(<ProductCard key={key++} {...prod} />);
    } catch (e) {}
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < html.length) {
    output.push(
      <span key={key++}
        dangerouslySetInnerHTML={{ __html: html.slice(lastIndex) }} />
    );
  }
  return output;
}

// loading动画
function LoadingDots() {
  return (
    <span style={{ display: "inline-block", width: 22, verticalAlign: "middle" }}>
      <span style={{
        display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#b8b8c9", marginRight: 2, animation: "dotflash 1.2s infinite"
      }}></span>
      <span style={{
        display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#b8b8c9", marginRight: 2, animation: "dotflash 1.2s 0.3s infinite"
      }}></span>
      <span style={{
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
    <div className="chatgpt-root">
      {/* 聊天内容区 */}
      <div className="chatgpt-chat-body">
        <div className="chatgpt-chat-content">
          {messages.map((msg, i) => (
            <div key={i} className={`chatgpt-row ${msg.role === "user" ? "chatgpt-row-user" : "chatgpt-row-ai"}`}>
              {msg.role === "assistant" && (
                <img src={BOT_AVATAR} alt="Bot" className="chatgpt-avatar" />
              )}
              <div
                className={`chatgpt-bubble chatgpt-bubble-${msg.role}`}
                style={msg.role === "assistant" ? { background: "#fff" } : {}}
              >
                {msg.role === "assistant"
                  ? renderWithProductCards(msg.content)
                  : msg.content}
              </div>
              {msg.role === "user" && <div className="chatgpt-avatar-space" />}
            </div>
          ))}
          {pending &&
            <div className="chatgpt-row chatgpt-row-ai">
              <img src={BOT_AVATAR} alt="Bot" className="chatgpt-avatar" />
              <div className="chatgpt-bubble chatgpt-bubble-ai">
                <LoadingDots /> <span style={{ color: "#b8b8c9" }}>Thinking...</span>
              </div>
            </div>
          }
          <div ref={chatEndRef}></div>
        </div>
      </div>

      {/* 输入栏 */}
      <form className="chatgpt-inputbar" onSubmit={handleSend}>
        <input
          className="chatgpt-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your question…"
          disabled={loading}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleSend(e);
            }
          }}
        />
        <button
          className="chatgpt-sendbtn"
          type="submit"
          disabled={loading || !input.trim()}
        >
          <SendIcon />
        </button>
      </form>
      {/* 样式区 */}
      <style jsx global>{`
        body,html,#__next{margin:0;padding:0;height:100%;background:#fff;}
        .chatgpt-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          width: 100vw;
          background: #fff;
        }
        .chatgpt-chat-body {
          flex: 1;
          overflow-y: auto;
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .chatgpt-chat-content {
          width: 100%;
          max-width: 710px;
          margin: 0 auto;
          padding: 28px 6px 22px 6px;
        }
        .chatgpt-row {
          display: flex;
          align-items: flex-start;
          margin-bottom: 22px;
        }
        .chatgpt-row-user {
          flex-direction: row-reverse;
        }
        .chatgpt-row-ai {
          flex-direction: row;
        }
        .chatgpt-avatar {
          width: 34px;
          height: 34px;
          border-radius: 11px;
          margin-right: 13px;
          margin-top: 3px;
          background: #fff;
          flex-shrink: 0;
          box-shadow: 0 2px 6px #f5f5fa;
        }
        .chatgpt-avatar-space {
          width: 34px;
          height: 34px;
          margin-left: 13px;
        }
        .chatgpt-bubble {
          max-width: 570px;
          font-size: 16px;
          line-height: 1.78;
          padding: 18px 20px;
          border-radius: 14px;
          min-height: 21px;
          background: #fff;
          color: #23232a;
          box-shadow: none;
          border: none;
          overflow-x: auto;
          word-break: break-word;
          transition: background .2s;
        }
        .chatgpt-bubble-user {
          background: #d2f7e5;
          color: #20282a;
          text-align: right;
        }
        .chatgpt-bubble-ai {
          background: #fff;
          color: #23232a;
          text-align: left;
        }
        .chatgpt-inputbar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100vw;
          background: #fff;
          border-top: 1px solid #eee;
          padding: 20px 0 19px 0;
          z-index: 10;
          position: sticky;
          bottom: 0;
        }
        .chatgpt-input {
          flex: 1;
          max-width: 600px;
          font-size: 17px;
          padding: 14px 20px;
          border: 1.5px solid #e2e8ee;
          border-radius: 13px;
          outline: none;
          background: #fff;
          margin-right: 13px;
          box-shadow: 0 2px 8px #f6f6fa33;
        }
        .chatgpt-sendbtn {
          background: #19c37d;
          border: none;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 8px #b9e9d7a0;
          opacity: 1;
          transition: opacity 0.2s;
        }
        .chatgpt-sendbtn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
        @media (max-width: 900px){
          .chatgpt-chat-content {max-width: 98vw;}
          .chatgpt-bubble{max-width:92vw;}
          .chatgpt-input{max-width: 78vw;}
        }
        @media (max-width:600px){
          .chatgpt-avatar,.chatgpt-avatar-space{width:25px;height:25px;}
          .chatgpt-bubble{font-size:14.5px;padding:8px 9px;border-radius:10px;}
          .chatgpt-chat-content{padding:8px 1vw 12vw 1vw;}
        }
      `}</style>
    </div>
  );
}
