import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { parseCSVContent } from '../utils/parseCSV'
import { recognize } from '../utils/ocrImage'

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<string>('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null)
    setStatus('')
  }

  const handleUpload = async () => {
    if (!file) {
      setStatus('ファイルを選択してください')
      return
    }

    setStatus('アップロード中...')

    try {
      let portfolioData: any[] = []

      if (file.name.endsWith('.csv')) {
        const text = await file.text()
        portfolioData = parseCSVContent(text)
      } else if (file.type.startsWith('image/')) {
        const text = await recognize(file)
        portfolioData = parseCSVContent(text)
      } else {
        setStatus('対応しているのはCSVまたは画像ファイルです')
        return
      }

      const promises = portfolioData.map((item) =>
        addDoc(collection(db, 'portfolio'), {
          code: item.code,
          name: item.name,
          quantity: Number(item.quantity),
          price: Number(item.price),
          createdAt: Date.now()
        })
      )

      await Promise.all(promises)
      setStatus('✅ Firestoreへの登録が完了しました')
    } catch (err) {
      console.error(err)
      setStatus('❌ 登録中にエラーが発生しました')
    }
  }

  return (
    <div className="p-4 bg-slate-800 border border-slate-500 rounded text-white space-y-4">
      <p>CSVまたは画像ファイルを選択してください。</p>
      <input type="file" accept=".csv,image/*" onChange={handleFileChange} className="text-white" />
      <button
        onClick={handleUpload}
        className="bg-blue-500 px-4 py-1 rounded hover:bg-blue-600 text-white"
      >
        アップロード
      </button>
      {status && <p className="text-sm">{status}</p>}
    </div>
  )
}