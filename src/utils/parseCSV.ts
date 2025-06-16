import Papa from 'papaparse'

export type StockRecord = {
  code: string
  name: string
  quantity: number
  price: number
}

export async function parseCSVContent(text: string): Promise<StockRecord[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const data = results.data.map((row: any) => ({
            code: row.code,
            name: row.name,
            quantity: parseInt(row.quantity),
            price: parseInt(row.price)
          }))
          resolve(data)
        } catch (err) {
          reject(err)
        }
      },
      error: (err) => reject(err)
    })
  })
}