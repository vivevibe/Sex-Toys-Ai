export default async function handler(req, res) {
  try {
    const { prompt } = JSON.parse(req.body);
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      res.status(500).json({ reply: "Missing API Key" });
      return;
    }
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await openaiRes.json();
    if (!data.choices || !data.choices[0]) {
      res.status(500).json({ reply: "OpenAI API Error: " + (data.error?.message || "No choices returned") });
      return;
    }
    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ reply: "Server Error: " + err.message });
  }
}
