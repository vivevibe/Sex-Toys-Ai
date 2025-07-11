import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi, I’m your AI toy advisor 👋<br>Ask me anything about sex toys, and I’ll give you real recommendations!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setLoading(true);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input })
      });
      const data = await res.json();
      setMessages(msgs => [
        ...msgs,
        { role: "assistant", content: data.reply }
      ]);
    } catch (err) {
      setMessages(msgs => [
        ...msgs,
        { role: "assistant", content: "⚠️ Network error. Please try again." }
      ]);
    }
    setLoading(false);
  }

  return (
    <div style={{
      maxWidth: 480, margin: "40px auto 0", background: "#fff", borderRadius: 18, boxShadow: "0 4px 28px #ddd",
      padding: 20, minHeight: "80vh", fontFamily: "system-ui,sans-serif"
    }}>
      <h2 style={{ fontSize: 24, marginBottom: 18, fontWeight: 700, letterSpacing: 1 }}>
        ViveVibe AI Toy Advisor
      </h2>

      <div style={{ minHeight: 300 }}>
        {messages.map((msg, i) =>
          <div key={i} style={{
            margin: "16px 0",
            textAlign: msg.role === "user" ? "right" : "left"
          }}>
            {msg.role === "user"
              ? <div style={{
                  display: "inline-block", background: "#eee", borderRadius: 16, padding: "8px 14px",
                  color: "#111", maxWidth: 350, fontSize: 15, lineHeight: 1.5
                }}>{msg.content}</div>
              : <div style={{
                  display: "inline-block", background: "#fafaff", borderRadius: 16, padding: "8px 14px",
                  color: "#333", maxWidth: 350, fontSize: 15, lineHeight: 1.5
                }}
                dangerouslySetInnerHTML={{ __html: msg.content }}
                />
            }
          </div>
        )}
      </div>

      <form
        style={{ display: "flex", gap: 8, marginTop: 24 }}
        onSubmit={e => { e.preventDefault(); handleSend(); }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
          placeholder="Type your question…"
          style={{
            flex: 1, border: "1px solid #eee", borderRadius: 8,
            padding: "12px 12px", fontSize: 16, outline: "none", background: "#fafafa"
          }}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) handleSend(); }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#f172a1", color: "#fff", border: "none", borderRadius: 8,
            padding: "12px 18px", fontWeight: 600, fontSize: 16, cursor: "pointer",
            opacity: loading ? 0.5 : 1
          }}
        >
          {loading ? "…" : "Send"}
        </button>
      </form>
    </div>
  );
}
