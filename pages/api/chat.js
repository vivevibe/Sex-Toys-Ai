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
