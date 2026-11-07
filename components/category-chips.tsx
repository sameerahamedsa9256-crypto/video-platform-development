import Link from 'next/link'
import { categories } from '@/lib/data'
import { cn } from '@/lib/utils'

export function CategoryChips({ active }: { active?: string }) {
  const chips = [{ slug: '', label: 'All' }, ...categories]
  return (
    <nav aria-label="Categories" className="sticky top-14 z-30 -mx-4 bg-background px-4 py-3">
      <ul className="flex gap-3 overflow-x-auto [scrollbar-width:none]">
        {chips.map((c) => {
          const isActive = (active ?? '') === c.slug
          return (
            <li key={c.slug || 'all'} className="shrink-0">
              <Link
                href={c.slug ? `/?category=${c.slug}` : '/'}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'inline-flex h-8 items-center rounded-lg px-3 text-sm font-medium transition-colors',
                  isActive ? 'bg-foreground text-background' : 'bg-secondary hover:bg-accent',
                )}
              >
                {c.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
