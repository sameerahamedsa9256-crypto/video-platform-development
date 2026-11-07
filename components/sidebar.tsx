'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  Car,
  ChefHat,
  Clapperboard,
  Gamepad2,
  GraduationCap,
  Home,
  Laptop,
  Music2,
  Newspaper,
  Plane,
  Trophy,
  X,
  SquarePlay,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { categories } from '@/lib/data'
import { useApp } from '@/components/app-provider'
import { ChannelAvatar } from '@/components/channel-avatar'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'

const mainLinks: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/shorts', label: 'Shorts', icon: Clapperboard },
  { href: '/subscriptions', label: 'Subscriptions', icon: SquarePlay },
]

const categoryIcons: Record<string, LucideIcon> = {
  music: Music2,
  gaming: Gamepad2,
  news: Newspaper,
  sports: Trophy,
  learning: GraduationCap,
  travel: Plane,
  cooking: ChefHat,
  tech: Laptop,
  autos: Car,
}

function useActive() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  return {
    isLinkActive: (href: string) => (href === '/' ? pathname === '/' && !category : pathname.startsWith(href)),
    isCategoryActive: (slug: string) => pathname === '/' && category === slug,
  }
}

function NavItem({
  href,
  label,
  icon: Icon,
  active,
  onNavigate,
}: {
  href: string
  label: string
  icon: LucideIcon
  active: boolean
  onNavigate?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex h-10 items-center gap-5 rounded-lg px-3 text-sm hover:bg-accent',
        active && 'bg-accent font-semibold',
      )}
    >
      <Icon className="size-5 shrink-0" aria-hidden="true" />
      <span className="truncate">{label}</span>
    </Link>
  )
}

function FullNav({ onNavigate }: { onNavigate?: () => void }) {
  const { isLinkActive, isCategoryActive } = useActive()
  const { subscriptions } = useApp()

  return (
    <nav aria-label="Main" className="flex flex-col gap-1 p-3">
      {mainLinks.map((l) => (
        <NavItem key={l.href} {...l} active={isLinkActive(l.href)} onNavigate={onNavigate} />
      ))}

      <hr className="my-3 border-border" />
      <h2 className="px-3 pb-1 text-base font-semibold">Subscriptions</h2>
      {subscriptions.length === 0 && <p className="px-3 py-2 text-sm text-muted-foreground">No subscriptions yet</p>}
      {subscriptions.map((channel) => (
        <Link
          key={channel.id}
          href="/subscriptions"
          onClick={onNavigate}
          className="flex h-10 items-center gap-4 rounded-lg px-3 text-sm hover:bg-accent"
        >
          <ChannelAvatar channel={channel} className="size-6 text-[10px]" />
          <span className="truncate">{channel.name}</span>
        </Link>
      ))}

      <hr className="my-3 border-border" />
      <h2 className="px-3 pb-1 text-base font-semibold">Explore</h2>
      {categories.map((c) => (
        <NavItem
          key={c.slug}
          href={`/?category=${c.slug}`}
          label={c.label}
          icon={categoryIcons[c.slug]}
          active={isCategoryActive(c.slug)}
          onNavigate={onNavigate}
        />
      ))}

    </nav>
  )
}

function MiniNav() {
  const { isLinkActive } = useActive()
  return (
    <nav aria-label="Main" className="flex flex-col gap-1 px-1 py-2">
      {mainLinks.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          aria-current={isLinkActive(href) ? 'page' : undefined}
          className={cn(
            'flex flex-col items-center gap-1.5 rounded-lg py-4 text-[10px] hover:bg-accent',
            isLinkActive(href) && 'font-semibold',
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
          {label}
        </Link>
      ))}
    </nav>
  )
}

export function Sidebar() {
  const { sidebarExpanded, drawerOpen, setDrawerOpen } = useApp()
  const pathname = usePathname()
  const isWatch = pathname.startsWith('/watch')

  return (
    <>
      {!isWatch && (
        <aside
          className={cn(
            'sticky top-14 hidden h-[calc(100dvh-3.5rem)] shrink-0 overflow-y-auto md:block',
            sidebarExpanded ? 'w-[72px] lg:w-60' : 'w-[72px]',
          )}
        >
          <div className={cn(sidebarExpanded ? 'lg:hidden' : '')}>
            <MiniNav />
          </div>
          {sidebarExpanded && (
            <div className="hidden lg:block">
              <FullNav />
            </div>
          )}
        </aside>
      )}

      {drawerOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-64 overflow-y-auto bg-background shadow-xl animate-in slide-in-from-left">
            <div className="flex h-14 items-center gap-2 px-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
              >
                <X className="size-5" aria-hidden="true" />
              </Button>
              <Logo />
            </div>
            <FullNav onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}

export function MobileBottomNav() {
  const { isLinkActive } = useActive()
  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      {mainLinks.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          aria-current={isLinkActive(href) ? 'page' : undefined}
          className={cn(
            'flex flex-col items-center gap-1 py-2 text-[10px]',
            isLinkActive(href) ? 'font-semibold text-foreground' : 'text-muted-foreground',
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
          {label}
        </Link>
      ))}
    </nav>
  )
}
