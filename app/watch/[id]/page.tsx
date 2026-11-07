import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getChannel, getVideo, videos } from '@/lib/data'
import { VideoCard } from '@/components/video-card'
import { VideoActions } from '@/components/watch/video-actions'
import { VideoDescription } from '@/components/watch/video-description'
import { Comments } from '@/components/watch/comments'

export function generateStaticParams() {
  return videos.map((v) => ({ id: v.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const video = getVideo(id)
  return { title: video ? `${video.title} — StreamTube` : 'Video not found — StreamTube' }
}

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const video = getVideo(id)
  if (!video) notFound()
  const channel = getChannel(video.channelId)
  const related = videos.filter((v) => v.id !== video.id)

  return (
    <div className="mx-auto flex max-w-[1700px] flex-col gap-6 px-0 pb-8 sm:px-4 sm:pt-4 lg:flex-row lg:px-6">
      <div className="min-w-0 flex-1">
        <div className="aspect-video w-full overflow-hidden bg-black sm:rounded-xl">
          <video
            key={video.id}
            src={video.src}
            poster={video.thumbnail}
            controls
            playsInline
            preload="metadata"
            className="size-full"
            aria-label={video.title}
          />
        </div>
        <div className="px-4 sm:px-0">
          <h1 className="mt-3 text-lg font-bold leading-snug sm:text-xl">{video.title}</h1>
          <VideoActions video={video} channel={channel} />
          <VideoDescription video={video} />
          <Comments video={video} />
        </div>
      </div>

      <aside className="w-full shrink-0 px-4 sm:px-0 lg:w-[400px]" aria-label="Related videos">
        <h2 className="mb-3 text-base font-semibold">Up next</h2>
        <div className="flex flex-col gap-3">
          {related.map((v) => (
            <VideoCard key={v.id} video={v} compact />
          ))}
        </div>
      </aside>
    </div>
  )
}
