import { useState } from 'react'

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<string[]>([])

  const handleSend = async () => {
    if (!input.trim()) return

    // ユーザー入力を一旦表示
    setMessages((prev) => [...prev, `🧑‍💻 洋介：${input}`])
    setInput('')

    // OpenAI APIへの送信処理（後でステップ②で実装）
    setMessages((prev) => [...prev, '🧠 のあ：...（応答待機中）'])
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