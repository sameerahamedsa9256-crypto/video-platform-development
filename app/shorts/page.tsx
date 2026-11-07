import type { Metadata } from 'next'
import { shorts } from '@/lib/data'
import { ShortCard } from '@/components/short-card'

export const metadata: Metadata = { title: 'Shorts — StreamTube' }

export default function ShortsPage() {
  return (
    <div className="h-[calc(100dvh-3.5rem-4rem)] snap-y snap-mandatory overflow-y-auto md:h-[calc(100dvh-3.5rem)]">
      <h1 className="sr-only">Shorts</h1>
      {shorts.map((s) => (
        <ShortCard key={s.id} short={s} />
      ))}
    </div>
  )
}
