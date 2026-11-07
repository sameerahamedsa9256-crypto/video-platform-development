import Link from 'next/link'
import { ChannelAvatar } from '@/components/channel-avatar'
import { formatCount, getVideoChannel, type Video } from '@/lib/data'

export function FeaturedVideo({ video }: { video: Video }) {
  const channel = getVideoChannel(video)

  return (
    <section
      aria-labelledby="featured-video-title"
      className="mb-8 grid overflow-hidden rounded-2xl border bg-card shadow-sm lg:grid-cols-[minmax(0,1.6fr)_minmax(18rem,1fr)]"
    >
      <div className="relative aspect-video bg-black">
        <iframe
          src={video.src}
          title={`Featured video: ${video.title}`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-4 p-5 sm:p-7 lg:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Featured video</p>
        <h2 id="featured-video-title" className="text-xl font-semibold leading-tight sm:text-2xl">
          {video.title}
        </h2>
        <div className="flex items-center gap-3">
          <ChannelAvatar channel={channel} />
          <p className="min-w-0 truncate text-sm font-medium">{channel.name}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          {formatCount(video.views)} views · {video.postedAt} · {video.duration}
        </p>
        <Link
          href={`/watch/${video.id}`}
          className="inline-flex w-fit items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Open video
        </Link>
      </div>
    </section>
  )
}
