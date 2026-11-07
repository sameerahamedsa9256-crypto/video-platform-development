'use client'

import { useState } from 'react'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { useApp } from '@/components/app-provider'
import { formatCount, type Comment, type Video } from '@/lib/data'
import { cn } from '@/lib/utils'

function CommentItem({ comment }: { comment: Comment }) {
  const { reactionFor, setReaction } = useApp()
  const reaction = reactionFor(`comment-${comment.id}`)
  const likes = comment.likes + (reaction === 'like' ? 1 : 0)
  const key = `comment-${comment.id}`
  return (
    <li className="flex gap-3">
      <span
        aria-hidden="true"
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold uppercase"
      >
        {comment.author.replace('@', '').slice(0, 1)}
      </span>
      <div className="min-w-0">
        <p className="text-xs">
          <span className="font-semibold">{comment.author}</span>{' '}
          <span className="text-muted-foreground">{comment.postedAt}</span>
        </p>
        <p className="mt-1 text-sm leading-relaxed">{comment.text}</p>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <button
            type="button"
            onClick={() => setReaction(key, reaction === 'like' ? null : 'like')}
            aria-pressed={reaction === 'like'}
            aria-label="Like comment"
            className="flex size-8 items-center justify-center rounded-full hover:bg-accent"
          >
            <ThumbsUp className={cn('size-4', reaction === 'like' && 'fill-current text-foreground')} aria-hidden="true" />
          </button>
          {likes > 0 && <span>{formatCount(likes)}</span>}
          <button
            type="button"
            onClick={() => setReaction(key, reaction === 'dislike' ? null : 'dislike')}
            aria-pressed={reaction === 'dislike'}
            aria-label="Dislike comment"
            className="flex size-8 items-center justify-center rounded-full hover:bg-accent"
          >
            <ThumbsDown className={cn('size-4', reaction === 'dislike' && 'fill-current text-foreground')} aria-hidden="true" />
          </button>
        </div>
      </div>
    </li>
  )
}

export function Comments({ video }: { video: Video }) {
  const { userComments, addComment } = useApp()
  const [text, setText] = useState('')
  const [focused, setFocused] = useState(false)
  const all = [...userComments(video.id), ...video.comments]

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const value = text.trim()
    if (!value) return
    addComment(video.id, value)
    setText('')
    setFocused(false)
  }

  return (
    <section className="mt-6" aria-labelledby="comments-heading">
      <h2 id="comments-heading" className="text-lg font-bold">
        {all.length} Comments
      </h2>
      <form onSubmit={submit} className="mt-4 flex gap-3">
        <span
          aria-hidden="true"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white"
        >
          Y
        </span>
        <div className="flex-1">
          <label htmlFor="comment" className="sr-only">
            Add a comment
          </label>
          <input
            id="comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder="Add a comment..."
            className="w-full border-b border-border bg-transparent py-1.5 text-sm outline-none focus:border-foreground"
          />
          {focused && (
            <div className="mt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setText('')
                  setFocused(false)
                }}
                className="h-9 rounded-full px-4 text-sm font-medium hover:bg-accent"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!text.trim()}
                className="h-9 rounded-full bg-brand px-4 text-sm font-medium text-white disabled:bg-secondary disabled:text-muted-foreground"
              >
                Comment
              </button>
            </div>
          )}
        </div>
      </form>
      <ul className="mt-6 flex flex-col gap-5">
        {all.map((c) => (
          <CommentItem key={c.id} comment={c} />
        ))}
      </ul>
    </section>
  )
}
