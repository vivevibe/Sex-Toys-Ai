import { useState, useRef, useEffect } from "react";

// 最新LOGO头像
const BOT_AVATAR = "https://cdn.shopify.com/s/files/1/0940/0539/5765/files/logo.png?v=1752330541";

// 粉色飞机icon
function SendIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#f172a1" />
      <path d="M7 12l7-4v8l-7-4z" fill="#fff" />
    </svg>
  );
}

// “大气”产品卡美化
function ProductCard({ name, img, desc, url }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 24,
      border: "2px solid #f172a133",
      borderRadius: 20,
      padding: "22px 30px",
      margin: "28px 0",
      background: "#fff",
      boxShadow: "0 4px 24px #f4cdda25",
      minWidth: 0,
      maxWidth: 570
    }}>
      <img src={img} alt={name}
        style={{
          width: 110, height: 110, objectFit: "cover",
          borderRadius: 16, boxShadow: "0 2px 14px #fad7e444", background: "#faf9fc"
        }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontWeight: 800, fontSize: 20, color: "#ea3c77",
          marginBottom: 7, letterSpacing: 0.5
        }}>{name}</div>
        <div style={{
          color: "#444", fontSize: 15.7,
          marginBottom: 14, lineHeight: 1.65, fontWeight: 400
        }}>{desc}</div>
        <a href={url} target="_blank" rel="noopener"
          style={{
            fontWeight: 700, color: "#f172a1", fontSize: 15.7,
            textDecoration: "underline"
          }}>See Details &gt;</a>
      </div>
    </div>
  );
}

// 提取AI内容中产品卡JSON并渲染卡片（你AI回复HTML插卡片用形如：<div class="product-card" data-product="..."></div>）
function renderWithProductCards(html) {
  // 粗暴一点：查找所有带data-product的div，转成卡片，其余直接dangerouslySetInnerHTML
  // 你AI可以返回产品JSON结构，例如：<div class="product-card" data-product='{...}'></div>
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
    } catch (e) {
      // 出错就不渲染
    }
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

// Loading动画
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
    <div className="vv-root">
      {/* 顶部栏 */}
      <div className="vv-header">
        <img src={BOT_AVATAR} alt="ViveVibe" className="vv-logo" />
        <span>ViveVibe AI Toy Advisor</span>
      </div>

      {/* 聊天内容区 */}
      <div className="vv-chat-body">
        <div className="vv-chat-content">
          {messages.map((msg, i) => (
            <div key={i} className={`vv-row ${msg.role === "user" ? "vv-row-user" : "vv-row-ai"}`}>
              {msg.role === "assistant" && (
                <img src={BOT_AVATAR} alt="Bot" className="vv-avatar" />
              )}
              <div
                className={`vv-bubble vv-bubble-${msg.role}`}
                style={msg.role === "assistant" ? { background: "#fff" } : {}}
              >
                {msg.role === "assistant"
                  ? renderWithProductCards(msg.content)
                  : msg.content}
              </div>
              {msg.role === "user" && <div className="vv-avatar-space" />}
            </div>
          ))}
          {pending &&
            <div className="vv-row vv-row-ai">
              <img src={BOT_AVATAR} alt="Bot" className="vv-avatar" />
              <div className="vv-bubble vv-bubble-ai">
                <LoadingDots /> <span style={{ color: "#b8b8c9" }}>Thinking...</span>
              </div>
            </div>
          }
          <div ref={chatEndRef}></div>
        </div>
      </div>

      {/* 输入栏 */}
      <form className="vv-inputbar" onSubmit={handleSend}>
        <input
          className="vv-input"
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
          className="vv-sendbtn"
          type="submit"
          disabled={loading || !input.trim()}
        >
          <SendIcon />
        </button>
      </form>

      {/* 专属样式 */}
      <style jsx global>{`
        body,html,#__next{margin:0;padding:0;height:100%;background:#fafaff;}
        .vv-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          width: 100vw;
          background: #fafaff;
        }
        .vv-header {
          height: 68px;
          display: flex;
          align-items: center;
          padding: 0 32px;
          font-weight: bold;
          font-size: 24px;
          background: #fff;
          border-bottom: 1px solid #f3f3f3;
          letter-spacing: 1px;
          z-index: 10;
          box-shadow: 0 4px 16px #f6f6fa44;
        }
        .vv-logo {
          width: 44px;
          height: 44px;
          border-radius: 18px;
          margin-right: 16px;
          background: #fff;
        }
        .vv-chat-body {
          flex: 1;
          overflow-y: auto;
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .vv-chat-content {
          width: 100%;
          max-width: 720px;
          margin: 0 auto;
          padding: 36px 8px 22px 8px;
        }
        .vv-row {
          display: flex;
          align-items: flex-start;
          margin-bottom: 30px;
        }
        .vv-row-user {
          flex-direction: row-reverse;
        }
        .vv-row-ai {
          flex-direction: row;
        }
        .vv-avatar {
          width: 38px;
          height: 38px;
          border-radius: 16px;
          margin-right: 14px;
          margin-top: 2px;
          background: #fff;
          flex-shrink: 0;
          box-shadow: 0 2px 6px #eee;
        }
        .vv-avatar-space {
          width: 38px;
          height: 38px;
          margin-left: 14px;
        }
        .vv-bubble {
          max-width: 600px;
          font-size: 17px;
          line-height: 1.8;
          padding: 19px 25px;
          border-radius: 21px;
          min-height: 22px;
          background: #fff;
          color: #23232a;
          box-shadow: 0 2px 12px #f4f4fa99;
          border: 1px solid #f3f3f3;
          transition: background .2s;
          overflow-x: auto;
        }
        .vv-bubble-user {
          background: #f4f6f8;
          color: #21212a;
          border: none;
          box-shadow: none;
          text-align: right;
        }
        .vv-bubble-ai {
          background: #fff;
          color: #23232a;
          text-align: left;
        }
        .vv-inputbar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100vw;
          background: #fff;
          border-top: 1px solid #eee;
          padding: 20px 0 22px 0;
          z-index: 10;
          position: sticky;
          bottom: 0;
        }
        .vv-input {
          flex: 1;
          max-width: 600px;
          font-size: 17px;
          padding: 16px 20px;
          border: 1px solid #f0f0f6;
          border-radius: 18px;
          outline: none;
          background: #fafaff;
          margin-right: 16px;
          box-shadow: 0 2px 8px #f6f6fa33;
        }
        .vv-sendbtn {
          background: #f172a1;
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
        .vv-sendbtn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
        @media (max-width: 900px){
          .vv-chat-content {max-width: 98vw;}
          .vv-bubble{max-width:92vw;}
          .vv-header{font-size:19px;padding:0 10px;}
          .vv-input{max-width: 80vw;}
        }
        @media (max-width:600px){
          .vv-header { font-size:15px; height: 52px; }
          .vv-logo { width:30px;height:30px;margin-right:7px;}
          .vv-avatar,.vv-avatar-space{width:26px;height:26px;}
          .vv-bubble{font-size:14.5px;padding:10px 9px;border-radius:14px;}
          .vv-chat-content{padding:18px 2vw 13vw 1vw;}
        }
      `}</style>
    </div>
  );
}
