import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { categories, type Video } from '@/lib/data'
import { getYouTubeVideo, searchYouTubeVideos, YouTubeApiError } from '@/lib/youtube'
import { VideoCard } from '@/components/video-card'
import { VideoActions } from '@/components/watch/video-actions'
import { VideoDescription } from '@/components/watch/video-description'
import { Comments } from '@/components/watch/comments'
import { YouTubeError } from '@/components/youtube-error'

async function findVideo(id: string) {
  try {
    return await getYouTubeVideo(id)
  } catch {
    return undefined
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const video = await findVideo(id)
  return { title: video ? `${video.title} — StreamTube` : 'Watch on StreamTube' }
}

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let video
  let loadError = false

  try {
    video = await getYouTubeVideo(id)
  } catch {
    loadError = true
  }

  if (loadError) {
    return (
      <div className="px-4">
        <YouTubeError message="YouTube could not load this video. Check the API key, API access, and quota, then try again." />
      </div>
    )
  }
  if (!video) notFound()

  const categoryLabel = categories.find((category) => category.slug === video.category)?.label
  let related: Video[] = []
  try {
    related = await searchYouTubeVideos({ q: categoryLabel ?? video.channelInfo.name, category: video.category || undefined })
  } catch (error) {
    if (!(error instanceof YouTubeApiError)) related = []
  }
  related = related.filter((candidate) => candidate.id !== video.id)

  return (
    <div className="mx-auto flex max-w-[1700px] flex-col gap-6 px-0 pb-8 sm:px-4 sm:pt-4 lg:flex-row lg:px-6">
      <div className="min-w-0 flex-1">
        <div className="aspect-video w-full overflow-hidden bg-black sm:rounded-xl">
          <iframe
            key={video.youtubeId}
            src={video.src}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="size-full border-0"
          />
        </div>
        <div className="px-4 sm:px-0">
          <h1 className="mt-3 text-lg font-bold leading-snug sm:text-xl">{video.title}</h1>
          <VideoActions video={video} channel={video.channelInfo} />
          <VideoDescription video={video} />
          <Comments video={video} />
        </div>
      </div>

      <aside className="w-full shrink-0 px-4 sm:px-0 lg:w-[400px]" aria-label="Related videos">
        <h2 className="mb-3 text-base font-semibold">Up next</h2>
        {related.length > 0 ? (
          <div className="flex flex-col gap-3">
            {related.map((item) => <VideoCard key={item.id} video={item} compact />)}
          </div>
        ) : (
          <Link href="/" className="text-sm text-muted-foreground hover:underline">Browse more videos</Link>
        )}
      </aside>
    </div>
  )
}
