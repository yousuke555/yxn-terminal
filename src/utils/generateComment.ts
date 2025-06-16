export async function generateNoaComment(portfolioData: any) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY
  const prompt = `以下は株のポートフォリオです。現在の状態について短くプロっぽいコメントをください。\n${JSON.stringify(portfolioData)}`

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    }),
  })

  const data = await res.json()
  return data.choices?.[0]?.message?.content || "コメント取得失敗"
}