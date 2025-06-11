import { useState } from 'react'

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<string[]>([])

  const handleSend = async () => {
  if (!input.trim()) return

  const userMessage = input
  setMessages((prev) => [...prev, `🧑‍💻 洋介：${userMessage}`])
  setInput('')

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY

  try {
    console.log('API KEY:', apiKey)
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'あなたはY×N Terminal専属アシスタント「のあ」。優しく丁寧で思慮深く、ユーザーの質問には的確に答え、まるで人間のように相棒として会話します。語尾は少しだけやわらかく、信頼感のある話し方をします。'
          },
          {
            role: 'user',
            content: userMessage
          }
        ]
      })
    })

    const data = await res.json()
    console.log('API response:', data)  // ✅ ここに書けばOK
    const reply = data.choices?.[0]?.message?.content || '(のあが返事を返せませんでした)'

    setMessages((prev) => [...prev.slice(0, -1), `🧠 のあ：${reply}`])
  } catch (err) {
    setMessages((prev) => [...prev.slice(0, -1), '🧠 のあ：エラーが発生しました。もう一度お試しください。'])
    console.error(err)
  }
}

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 text-sm">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">🧠 Y×N Terminal - のあ接続中</h1>

      <div className="w-full max-w-md flex-1 overflow-y-auto bg-white p-4 rounded shadow mb-2">
        {messages.map((msg, idx) => (
          <p key={idx} className="mb-2 whitespace-pre-line">{msg}</p>
        ))}
      </div>

      <div className="w-full max-w-md flex">
        <input
          className="flex-1 p-2 border rounded-l"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="のあに話しかけてみよう！"
        />
        <button className="bg-blue-500 text-white px-4 rounded-r" onClick={handleSend}>
          送信
        </button>
      </div>
    </div>
  )
}

export default App