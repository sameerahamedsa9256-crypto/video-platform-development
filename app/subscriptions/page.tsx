import type { Metadata } from 'next'
import { SubscriptionsFeed } from '@/components/subscriptions-feed'
import { YouTubeError } from '@/components/youtube-error'
import { searchYouTubeVideos, YouTubeApiError } from '@/lib/youtube'
import type { Video } from '@/lib/data'

export const metadata: Metadata = { title: 'Subscriptions — StreamTube' }

export default async function SubscriptionsPage() {
  let videos: Video[] = []
  let errorMessage: string | undefined

  try {
    videos = await searchYouTubeVideos({ maxResults: 24 })
  } catch (error) {
    errorMessage = error instanceof YouTubeApiError
      ? error.message
      : 'YouTube could not load videos right now. Please try again later.'
  }

  return (
    <div className="px-4 py-4">
      <h1 className="mb-4 text-xl font-bold">Subscriptions</h1>
      {errorMessage ? <YouTubeError message={errorMessage} /> : <SubscriptionsFeed videos={videos} />}
    </div>
  )
}
