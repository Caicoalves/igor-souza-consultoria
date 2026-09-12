import { Image, Play } from 'lucide-react'

type Props = {
  label: string
  meta: string
  ratio?: 'portrait' | 'landscape'
  video?: boolean
}

export function MediaPlaceholder({ label, meta, ratio = 'portrait', video = false }: Props) {
  return (
    <div className={`media-placeholder ${ratio}`}>
      <div className="placeholder-grid" />
      <div className="placeholder-icon">{video ? <Play size={18} /> : <Image size={18} />}</div>
      <div className="placeholder-caption">
        <span>{label}</span>
        <small>{meta} · mídia a inserir</small>
      </div>
    </div>
  )
}
