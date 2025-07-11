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
