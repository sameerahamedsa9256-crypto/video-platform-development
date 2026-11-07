import Link from 'next/link'
import { SearchX } from 'lucide-react'
import { categories, type Video } from '@/lib/data'
import { searchYouTubeVideos, YouTubeApiError } from '@/lib/youtube'
import { CategoryChips } from '@/components/category-chips'
import { VideoGrid } from '@/components/video-grid'
import { YouTubeError } from '@/components/youtube-error'

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>
}) {
  const { q, category } = await searchParams
  const categoryLabel = categories.find((c) => c.slug === category)?.label
  let results: Video[] = []
  let errorMessage: string | undefined

  try {
    results = await searchYouTubeVideos({ q, category })
  } catch (error) {
    errorMessage = error instanceof YouTubeApiError
      ? error.message
      : 'YouTube could not load videos right now. Please try again later.'
  }

  return (
    <div className="px-4 pb-8">
      <CategoryChips active={category} />
      <h1 className="sr-only">{q ? `Search results for ${q}` : categoryLabel ?? 'Home'}</h1>
      {errorMessage ? (
        <YouTubeError message={errorMessage} />
      ) : (
        <>
          {q && (
            <p className="mb-4 text-sm text-muted-foreground">
              {results.length} {results.length === 1 ? 'result' : 'results'} for{' '}
              <span className="font-medium text-foreground">{`"${q}"`}</span>
            </p>
          )}
          {results.length > 0 ? (
            <div className="pt-2">
              <VideoGrid videos={results} />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-24 text-center">
              <SearchX className="size-12 text-muted-foreground" aria-hidden="true" />
              <p className="text-lg font-semibold">No videos found</p>
              <p className="text-sm text-muted-foreground">Try different keywords or browse another category.</p>
              <Link href="/" className="mt-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium hover:bg-accent">
                Back to Home
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  )
}
