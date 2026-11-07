'use client'

import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { useApp } from '@/components/app-provider'
import { formatCount } from '@/lib/data'
import { cn } from '@/lib/utils'

export function LikeButtons({ id, likes, vertical = false }: { id: string; likes: number; vertical?: boolean }) {
  const { reactionFor, setReaction } = useApp()
  const reaction = reactionFor(id)
  const count = likes + (reaction === 'like' ? 1 : 0)

  if (vertical) {
    return (
      <div className="flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={() => setReaction(id, reaction === 'like' ? null : 'like')}
          aria-pressed={reaction === 'like'}
          aria-label="Like"
          className="flex flex-col items-center gap-1 text-xs font-medium"
        >
          <span className={cn('flex size-12 items-center justify-center rounded-full bg-secondary', reaction === 'like' && 'bg-foreground text-background')}>
            <ThumbsUp className={cn('size-5', reaction === 'like' && 'fill-current')} aria-hidden="true" />
          </span>
          {formatCount(count)}
        </button>
        <button
          type="button"
          onClick={() => setReaction(id, reaction === 'dislike' ? null : 'dislike')}
          aria-pressed={reaction === 'dislike'}
          aria-label="Dislike"
          className="flex flex-col items-center gap-1 text-xs font-medium"
        >
          <span className={cn('flex size-12 items-center justify-center rounded-full bg-secondary', reaction === 'dislike' && 'bg-foreground text-background')}>
            <ThumbsDown className={cn('size-5', reaction === 'dislike' && 'fill-current')} aria-hidden="true" />
          </span>
          Dislike
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-9 shrink-0 items-center rounded-full bg-secondary">
      <button
        type="button"
        onClick={() => setReaction(id, reaction === 'like' ? null : 'like')}
        aria-pressed={reaction === 'like'}
        aria-label={`Like this video, ${formatCount(count)} likes`}
        className="flex h-full items-center gap-2 rounded-l-full pl-4 pr-3 text-sm font-medium hover:bg-accent"
      >
        <ThumbsUp className={cn('size-5', reaction === 'like' && 'fill-current')} aria-hidden="true" />
        {formatCount(count)}
      </button>
      <span className="h-6 w-px bg-border" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setReaction(id, reaction === 'dislike' ? null : 'dislike')}
        aria-pressed={reaction === 'dislike'}
        aria-label="Dislike this video"
        className="flex h-full items-center rounded-r-full pl-3 pr-4 hover:bg-accent"
      >
        <ThumbsDown className={cn('size-5', reaction === 'dislike' && 'fill-current')} aria-hidden="true" />
      </button>
    </div>
  )
}
