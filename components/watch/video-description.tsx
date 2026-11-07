'use client'

import { useState } from 'react'
import { formatCount, type Video } from '@/lib/data'

export function VideoDescription({ video }: { video: Video }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="mt-4 rounded-xl bg-secondary p-3 text-sm">
      <p className="font-semibold">
        {video.views.toLocaleString('en-US')} views · {video.postedAt}
      </p>
      <p className={expanded ? 'mt-1 whitespace-pre-line' : 'mt-1 line-clamp-2'}>{video.description}</p>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="mt-1 font-semibold hover:underline"
      >
        {expanded ? 'Show less' : '...more'}
      </button>
      <span className="sr-only">{formatCount(video.likes)} likes</span>
    </div>
  )
}
