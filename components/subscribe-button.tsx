'use client'

import { Bell } from 'lucide-react'
import { useApp } from '@/components/app-provider'
import { cn } from '@/lib/utils'
import type { Channel } from '@/lib/data'

export function SubscribeButton({ channel, className }: { channel: Channel; className?: string }) {
  const { isSubscribed, toggleSubscription } = useApp()
  const subscribed = isSubscribed(channel.id)
  return (
    <button
      type="button"
      onClick={() => toggleSubscription(channel)}
      aria-pressed={subscribed}
      aria-label={subscribed ? `Unsubscribe from ${channel.name}` : `Subscribe to ${channel.name}`}
      className={cn(
        'inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors',
        subscribed ? 'bg-secondary hover:bg-accent' : 'bg-foreground text-background hover:opacity-90',
        className,
      )}
    >
      {subscribed && <Bell className="size-4" aria-hidden="true" />}
      {subscribed ? 'Subscribed' : 'Subscribe'}
    </button>
  )
}
