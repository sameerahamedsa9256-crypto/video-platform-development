'use client'

import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Bell, Menu, Mic, Search, Video } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { useApp } from '@/components/app-provider'

export function Header() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { toggleSidebarExpanded, setDrawerOpen } = useApp()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [mobileSearch, setMobileSearch] = useState(false)

  function onMenu() {
    if (!pathname.startsWith('/watch') && window.matchMedia('(min-width: 1024px)').matches) toggleSidebarExpanded()
    else setDrawerOpen(true)
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    setMobileSearch(false)
    router.push(q ? `/?q=${encodeURIComponent(q)}` : '/')
  }

  const searchForm = (
    <form onSubmit={onSubmit} role="search" className="flex w-full max-w-xl items-center">
      <label htmlFor="search" className="sr-only">
        Search videos
      </label>
      <input
        id="search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        autoFocus={mobileSearch}
        className="h-10 w-full min-w-0 rounded-l-full border border-border bg-background px-4 text-sm outline-none focus:border-brand"
      />
      <button
        type="submit"
        aria-label="Search"
        className="flex h-10 w-16 shrink-0 items-center justify-center rounded-r-full border border-l-0 border-border bg-secondary hover:bg-accent"
      >
        <Search className="size-5" aria-hidden="true" />
      </button>
    </form>
  )

  if (mobileSearch) {
    return (
      <header className="sticky top-0 z-40 flex h-14 items-center gap-2 bg-background px-2 md:hidden">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setMobileSearch(false)} aria-label="Close search">
          <ArrowLeft className="size-5" aria-hidden="true" />
        </Button>
        {searchForm}
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 bg-background px-2 sm:px-4">
      <div className="flex shrink-0 items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={onMenu} aria-label="Toggle navigation menu">
          <Menu className="size-5" aria-hidden="true" />
        </Button>
        <Logo />
      </div>

      <div className="hidden flex-1 items-center justify-center gap-2 md:flex">
        {searchForm}
        <Button variant="secondary" size="icon" className="size-10 rounded-full" aria-label="Search with your voice">
          <Mic className="size-5" aria-hidden="true" />
        </Button>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <Button variant="ghost" size="icon" className="rounded-full md:hidden" onClick={() => setMobileSearch(true)} aria-label="Open search">
          <Search className="size-5" aria-hidden="true" />
        </Button>
        <Button variant="ghost" size="icon" className="hidden rounded-full sm:inline-flex" aria-label="Create">
          <Video className="size-5" aria-hidden="true" />
        </Button>
        <Button variant="ghost" size="icon" className="hidden rounded-full sm:inline-flex" aria-label="Notifications">
          <Bell className="size-5" aria-hidden="true" />
        </Button>
        <ThemeToggle />
        <span className="ml-1 flex size-8 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white" aria-label="Your account">
          Y
        </span>
      </div>
    </header>
  )
}
