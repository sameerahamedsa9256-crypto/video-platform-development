import Link from 'next/link'
import { Play } from 'lucide-react'

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-1.5 rounded-md px-1 py-1" aria-label="StreamTube home">
      <span className="flex h-6 w-8 items-center justify-center rounded-md bg-brand text-white">
        <Play className="size-3.5 fill-current" aria-hidden="true" />
      </span>
      <span className="text-lg font-semibold tracking-tight">StreamTube</span>
    </Link>
  )
}
