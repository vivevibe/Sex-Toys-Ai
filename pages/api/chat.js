export default async function handler(req, res) {
  try {
    const { prompt } = JSON.parse(req.body);

    // 你的专属OpenAI API Key
    const apiKey = "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";

    // 调用 OpenAI GPT-4o-mini
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

    // 检查OpenAI返回内容
    if (!data.choices || !data.choices[0]) {
      res.status(500).json({ reply: "OpenAI API Error: " + (data.error?.message || "No choices returned") });
      return;
    }

    res.status(200).json({ reply: data.choices[0].message.content });

  } catch (err) {
    res.status(500).json({ reply: "Server Error: " + err.message });
  }
}
