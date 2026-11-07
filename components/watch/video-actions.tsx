'use client'

import { useState } from 'react'
import { Check, Download, Share2 } from 'lucide-react'
import { formatCount, type Channel, type Video } from '@/lib/data'
import { ChannelAvatar } from '@/components/channel-avatar'
import { LikeButtons } from '@/components/like-buttons'
import { SubscribeButton } from '@/components/subscribe-button'

export function VideoActions({ video, channel }: { video: Video; channel: Channel }) {
  const [copied, setCopied] = useState(false)

  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <ChannelAvatar channel={channel} className="size-10" />
        <div className="min-w-0">
          <p className="truncate font-semibold">{channel.name}</p>
          <p className="text-xs text-muted-foreground">{formatCount(channel.subscribers)} subscribers</p>
        </div>
        <SubscribeButton channel={channel} className="ml-2" />
      </div>
      <div className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
        <LikeButtons id={video.id} likes={video.likes} />
        <button
          type="button"
          onClick={share}
          className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full bg-secondary px-4 text-sm font-medium hover:bg-accent"
        >
          {copied ? <Check className="size-5" aria-hidden="true" /> : <Share2 className="size-5" aria-hidden="true" />}
          <span aria-live="polite">{copied ? 'Copied' : 'Share'}</span>
        </button>
        <a
          href={video.src}
          download
          className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full bg-secondary px-4 text-sm font-medium hover:bg-accent"
        >
          <Download className="size-5" aria-hidden="true" />
          Download
        </a>
      </div>
    </div>
  )
}
