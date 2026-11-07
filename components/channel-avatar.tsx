import { cn } from '@/lib/utils'
import type { Channel } from '@/lib/data'

export function ChannelAvatar({ channel, className }: { channel: Channel; className?: string }) {
  const initials = channel.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white',
        channel.avatarColor,
        className,
      )}
    >
      {initials}
    </span>
  )
}
