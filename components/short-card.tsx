'use client'

import { useRef, useState } from 'react'
import { MessageSquare, Pause, Play, Share2 } from 'lucide-react'
import { formatCount, getChannel, type Short } from '@/lib/data'
import { ChannelAvatar } from '@/components/channel-avatar'
import { LikeButtons } from '@/components/like-buttons'
import { SubscribeButton } from '@/components/subscribe-button'

export function ShortCard({ short }: { short: Short }) {
  const channel = getChannel(short.channelId)
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  function toggle() {
    const v = ref.current
    if (!v) return
    if (v.paused) v.play()
    else v.pause()
  }

  return (
    <section className="flex h-full snap-start items-center justify-center gap-4 py-4" aria-label={short.title}>
      <div className="relative h-full max-h-[820px] w-auto aspect-[9/16] overflow-hidden rounded-xl bg-black">
        <video
          ref={ref}
          src={short.src}
          poster={short.thumbnail}
          loop
          playsInline
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="size-full object-cover"
        />
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause' : 'Play'}
          className="absolute inset-0 flex items-center justify-center"
        >
          {!playing && (
            <span className="flex size-16 items-center justify-center rounded-full bg-black/50 text-white">
              <Play className="size-7 fill-current" aria-hidden="true" />
            </span>
          )}
          {playing && <Pause className="sr-only" aria-hidden="true" />}
        </button>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-16 text-white">
          <div className="pointer-events-auto flex items-center gap-2">
            <ChannelAvatar channel={channel} className="size-8 text-xs" />
            <span className="text-sm font-semibold">{channel.handle}</span>
            <SubscribeButton channel={channel} className="h-8 px-3 text-xs" />
          </div>
          <p className="mt-2 line-clamp-2 text-sm">{short.title}</p>
          <p className="mt-1 text-xs text-white/70">{formatCount(short.views)} views</p>
        </div>
      </div>
      <div className="hidden flex-col items-center gap-4 self-end pb-4 sm:flex">
        <LikeButtons id={short.id} likes={short.likes} vertical />
        <button type="button" className="flex flex-col items-center gap-1 text-xs font-medium" aria-label="Comments">
          <span className="flex size-12 items-center justify-center rounded-full bg-secondary">
            <MessageSquare className="size-5" aria-hidden="true" />
          </span>
          Comments
        </button>
        <button type="button" className="flex flex-col items-center gap-1 text-xs font-medium" aria-label="Share">
          <span className="flex size-12 items-center justify-center rounded-full bg-secondary">
            <Share2 className="size-5" aria-hidden="true" />
          </span>
          Share
        </button>
      </div>
    </section>
  )
}
