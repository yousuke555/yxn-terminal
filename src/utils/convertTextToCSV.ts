export const convertTextToCSV = (text: string): string => {
  const rows = text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.includes(','))
  return rows.join('\n')
}