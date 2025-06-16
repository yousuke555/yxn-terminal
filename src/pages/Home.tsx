import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'

type Stock = {
  code: string
  name: string
  quantity: number
  price: number
}

function Home() {
  const [portfolio, setPortfolio] = useState<Stock[]>([])

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'portfolio'))
        const stocks = snapshot.docs.map((doc) => doc.data() as Stock)
        setPortfolio(stocks)
        console.log('✅ Firestoreから取得:', stocks)
      } catch (e) {
        console.error('❌ Firestore取得エラー', e)
      }
    }

    fetchPortfolio()
  }, [])

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">📈 ポートフォリオ</h2>
      <p className="mb-4 text-gray-400">現在の保有銘柄:</p>

      <ul className="space-y-2">
        {portfolio.map((stock) => (
          <li
            key={stock.code}
            className="bg-slate-800 p-3 rounded shadow-md flex justify-between items-center"
          >
            <div>
              <div className="font-bold text-white">{stock.name}（{stock.code}）</div>
              <div className="text-sm text-slate-300">数量: {stock.quantity} / 平均取得: ¥{stock.price}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home