import { useState, useRef, useEffect } from "react";

const BOT_AVATAR = "https://cdn.shopify.com/s/files/1/0940/0539/5765/files/logo.png?v=1752330541";

function SendIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#FD8291" />
      <path d="M7 12l7-4v8l-7-4z" fill="#fff" />
    </svg>
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
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); // 自动滚动到底部
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
      <div className="chatgpt-chat-body">
        <div className="chatgpt-chat-content">
          {messages.map((msg, i) => (
            <div key={i} className={`chatgpt-row ${msg.role === "user" ? "chatgpt-row-user" : "chatgpt-row-ai"}`}>
              {msg.role === "assistant" && (
                <img src={BOT_AVATAR} alt="Bot" className="chatgpt-avatar" />
              )}
              <div className={`chatgpt-bubble chatgpt-bubble-${msg.role}`} style={msg.role === "assistant" ? { background: "#fff" } : {}}>
                {msg.content}
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
          background: #FD8291;
          color: #fff;
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
          background: #FD8291;
          border: none;
          border-radius: 50%;
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 8px #f2ddea33;
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
