import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([{ role: "assistant", content: "Hey! I'm your AI toy expert 👀 Ask me anything~" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    setMessages([...messages, { role: "user", content: input }]);
    setLoading(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();
    setMessages((msgs) => [...msgs, { role: "assistant", content: data.reply }]);
    setInput("");
    setLoading(false);
  }

  return (
    <div style={{maxWidth:600,margin:"40px auto",padding:20,borderRadius:16,boxShadow:"0 4px 32px #ccc"}}>
      {messages.map((msg, i) => (
        <div key={i} style={{margin: "10px 0", color: msg.role==="user"?"#007":"#222"}}>
          <b>{msg.role==="user"?"You":"AI"}:</b> {msg.content}
        </div>
      ))}
      <div style={{display:"flex",marginTop:16}}>
        <input value={input} disabled={loading} onChange={e=>setInput(e.target.value)} style={{flex:1,padding:10}}/>
        <button disabled={loading} onClick={handleSend} style={{marginLeft:8,padding:"10px 20px"}}>Send</button>
      </div>
    </div>
  );
}
