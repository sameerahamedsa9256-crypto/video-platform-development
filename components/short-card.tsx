'use client'

import Link from 'next/link'
import { MessageSquare, Share2 } from 'lucide-react'
import { formatCount, getVideoChannel, type Short } from '@/lib/data'
import { ChannelAvatar } from '@/components/channel-avatar'
import { LikeButtons } from '@/components/like-buttons'
import { SubscribeButton } from '@/components/subscribe-button'

export function ShortCard({ short }: { short: Short }) {
  const channel = getVideoChannel(short)

  return (
    <section className="flex h-full snap-start items-center justify-center gap-4 py-4" aria-label={short.title}>
      <div className="relative h-full max-h-[820px] w-auto aspect-[9/16] overflow-hidden rounded-xl bg-black">
        <iframe
          src={short.src}
          title={`${short.title} by ${channel.name}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="size-full border-0"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-16 text-white">
          <div className="pointer-events-auto flex items-center gap-2">
            <ChannelAvatar channel={channel} className="size-8 text-xs" />
            <span className="min-w-0 truncate text-sm font-semibold">{channel.name}</span>
            <SubscribeButton channel={channel} className="h-8 px-3 text-xs" />
          </div>
          <p className="mt-2 line-clamp-2 text-sm">{short.title}</p>
          <p className="mt-1 text-xs text-white/70">{formatCount(short.views)} views</p>
          <Link href={`/watch/${short.id}`} className="pointer-events-auto mt-2 inline-block text-xs font-medium underline">
            Open video
          </Link>
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
