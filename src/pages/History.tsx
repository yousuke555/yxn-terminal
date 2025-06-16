import { useState } from 'react'

type Stock = {
  code: string
  name: string
  quantity: number
  price: number
}

const initialPortfolio: Stock[] = [
  { code: '7203', name: 'トヨタ自動車', quantity: 100, price: 2500 },
  { code: '9984', name: 'ソフトバンクG', quantity: 50, price: 6020 }
]

function Home() {
  const [portfolio, setPortfolio] = useState<Stock[]>(initialPortfolio)

  return (
    <div className="text-white">
      <h2 className="text-lg font-bold mb-4">📈 ポートフォリオ</h2>
      <p className="text-sm text-slate-400 mb-4">保有銘柄の一覧が表示されます。</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {portfolio.map((stock) => (
          <div
            key={stock.code}
            className="bg-slate-800 rounded-lg shadow p-4 border border-slate-700"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-semibold">{stock.name}</h3>
              <span className="text-xs text-slate-400">コード: {stock.code}</span>
            </div>
            <p>保有数: {stock.quantity} 株</p>
            <p>現在値: ¥{stock.price.toLocaleString()}</p>
            <p className="mt-2 font-bold text-green-400">
              評価額: ¥{(stock.quantity * stock.price).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home