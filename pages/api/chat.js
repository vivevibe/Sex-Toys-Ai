export default async function handler(req, res) {
  const { prompt } = JSON.parse(req.body);
  const apiKey = process.env.OPENAI_API_KEY;
  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await openaiRes.json();
  res.status(200).json({ reply: data.choices[0].message.content });
}
