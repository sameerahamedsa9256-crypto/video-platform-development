import Link from 'next/link'
import { SearchX } from 'lucide-react'
import { categories, searchVideos } from '@/lib/data'
import { CategoryChips } from '@/components/category-chips'
import { VideoGrid } from '@/components/video-grid'

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>
}) {
  const { q, category } = await searchParams
  const results = searchVideos({ q, category })
  const categoryLabel = categories.find((c) => c.slug === category)?.label

  return (
    <div className="px-4 pb-8">
      <CategoryChips active={category} />
      <h1 className="sr-only">{q ? `Search results for ${q}` : categoryLabel ?? 'Home'}</h1>
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
    </div>
  )
}
