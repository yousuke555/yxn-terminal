import Tesseract from 'tesseract.js'

export const recognize = async (file: File): Promise<string> => {
  const result = await Tesseract.recognize(file, 'eng+jpn', {
    logger: (m) => console.log(m)
  })
  return result.data.text
}