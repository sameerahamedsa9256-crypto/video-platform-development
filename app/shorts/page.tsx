import type { Metadata } from 'next'
import { type Video } from '@/lib/data'
import { searchYouTubeVideos, YouTubeApiError } from '@/lib/youtube'
import { ShortCard } from '@/components/short-card'
import { YouTubeError } from '@/components/youtube-error'

export const metadata: Metadata = { title: 'Shorts — StreamTube' }

export default async function ShortsPage() {
  let videos: Video[] = []
  let errorMessage: string | undefined

  try {
    videos = await searchYouTubeVideos({ q: 'shorts', duration: 'short', maxResults: 12 })
  } catch (error) {
    errorMessage = error instanceof YouTubeApiError
      ? error.message
      : 'Short videos could not load right now. Please try again later.'
  }

  if (errorMessage) {
    return <YouTubeError message={errorMessage} />
  }

  return (
    <div className="h-[calc(100dvh-3.5rem-4rem)] snap-y snap-mandatory overflow-y-auto md:h-[calc(100dvh-3.5rem)]">
      <h1 className="sr-only">Shorts</h1>
      {videos.length > 0 ? (
        videos.map((video) => <ShortCard key={video.id} short={video} />)
      ) : (
        <p className="px-6 py-20 text-center text-sm text-muted-foreground">No short videos were found. Try the home feed.</p>
      )}
    </div>
  )
}
