'use client'

import { formatCount, getVideoChannel, type Video } from '@/lib/data'
import { useApp } from '@/components/app-provider'
import { ChannelAvatar } from '@/components/channel-avatar'
import { SubscribeButton } from '@/components/subscribe-button'
import { VideoGrid } from '@/components/video-grid'

export function SubscriptionsFeed({ videos }: { videos: Video[] }) {
  const { subscriptions } = useApp()
  const channels = [...new Map(videos.map((video) => {
    const channel = getVideoChannel(video)
    return [channel.id, channel] as const
  })).values()]
  const feed = videos.filter((video) => subscriptions.some((channel) => channel.id === video.channelId))

  return (
    <div className="flex flex-col gap-8">
      <section aria-labelledby="channels-heading">
        <h2 id="channels-heading" className="mb-3 text-base font-semibold">Discover channels</h2>
        <ul className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none]">
          {channels.map((channel) => (
            <li key={channel.id} className="flex w-36 shrink-0 flex-col items-center gap-2 rounded-xl bg-secondary p-4 text-center">
              <ChannelAvatar channel={channel} className="size-14 text-lg" />
              <p className="w-full truncate text-sm font-semibold">{channel.name}</p>
              <p className="text-xs text-muted-foreground">{channel.subscribers ? `${formatCount(channel.subscribers)} subscribers` : 'YouTube channel'}</p>
              <SubscribeButton channel={channel} className="h-8 px-3 text-xs" />
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="latest-heading">
        <h2 id="latest-heading" className="mb-3 text-base font-semibold">Latest from subscriptions</h2>
        {feed.length > 0 ? (
          <VideoGrid videos={feed} />
        ) : (
          <p className="py-16 text-center text-sm text-muted-foreground">
            {subscriptions.length > 0
              ? 'No videos from your subscribed channels are in this feed yet.'
              : 'Subscribe to a channel above or from a video to build your feed.'}
          </p>
        )}
      </section>
    </div>
  )
}
