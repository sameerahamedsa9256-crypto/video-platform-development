import Image from 'next/image'
import Link from 'next/link'
import { formatCount, getChannel, type Video } from '@/lib/data'
import { ChannelAvatar } from '@/components/channel-avatar'
import { cn } from '@/lib/utils'

export function VideoCard({ video, compact = false }: { video: Video; compact?: boolean }) {
  const channel = getChannel(video.channelId)
  return (
    <article className={cn('group relative', compact ? 'flex gap-2' : 'flex flex-col gap-3')}>
      <div
        className={cn(
          'relative aspect-video shrink-0 overflow-hidden bg-muted',
          compact ? 'w-40 rounded-lg sm:w-44' : 'w-full rounded-xl',
        )}
      >
        <Image
          src={video.thumbnail}
          alt=""
          fill
          sizes={compact ? '176px' : '(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw'}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1 py-0.5 text-xs font-medium text-white">
          {video.duration}
        </span>
      </div>
      <div className="flex min-w-0 gap-3">
        {!compact && <ChannelAvatar channel={channel} />}
        <div className="min-w-0">
          <h3 className={cn('line-clamp-2 font-semibold leading-snug', compact ? 'text-sm' : 'text-base')}>
            <Link href={`/watch/${video.id}`} className="after:absolute after:inset-0">
              {video.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{channel.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatCount(video.views)} views · {video.postedAt}
          </p>
        </div>
      </div>
    </article>
  )
}
