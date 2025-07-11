export default async function handler(req, res) {
  const { prompt } = JSON.parse(req.body);
  // 优先用Vercel环境变量，如果没有直接写死Key（不推荐，容易被扒！）
  const apiKey = process.env.OPENAI_API_KEY || "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";
  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",   // 你用自己的模型名
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await openaiRes.json();
  res.status(200).json({ reply: data.choices[0].message.content });
}
