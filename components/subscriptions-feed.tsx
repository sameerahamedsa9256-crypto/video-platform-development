'use client'

import { channels, formatCount, videos } from '@/lib/data'
import { useApp } from '@/components/app-provider'
import { ChannelAvatar } from '@/components/channel-avatar'
import { SubscribeButton } from '@/components/subscribe-button'
import { VideoGrid } from '@/components/video-grid'

export function SubscriptionsFeed() {
  const { subscriptions } = useApp()
  const feed = videos.filter((v) => subscriptions.includes(v.channelId))

  return (
    <div className="flex flex-col gap-8">
      <section aria-labelledby="channels-heading">
        <h2 id="channels-heading" className="mb-3 text-base font-semibold">
          Channels
        </h2>
        <ul className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none]">
          {channels.map((c) => (
            <li key={c.id} className="flex w-36 shrink-0 flex-col items-center gap-2 rounded-xl bg-secondary p-4 text-center">
              <ChannelAvatar channel={c} className="size-14 text-lg" />
              <p className="w-full truncate text-sm font-semibold">{c.name}</p>
              <p className="text-xs text-muted-foreground">{formatCount(c.subscribers)} subscribers</p>
              <SubscribeButton channel={c} className="h-8 px-3 text-xs" />
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="latest-heading">
        <h2 id="latest-heading" className="mb-3 text-base font-semibold">
          Latest
        </h2>
        {feed.length > 0 ? (
          <VideoGrid videos={feed} />
        ) : (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Subscribe to channels to see their latest videos here.
          </p>
        )}
      </section>
    </div>
  )
}
