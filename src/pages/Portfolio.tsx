import UploadForm from '../components/UploadForm'

export default function Portfolio() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold">📁 ポートフォリオアップロード</h2>
      <p className="text-sm text-slate-300">CSVまたは画像で保有銘柄をアップロードしてください。</p>
      <UploadForm />
    </div>
  )
}