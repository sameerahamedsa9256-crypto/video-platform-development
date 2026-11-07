import { Suspense } from 'react'
import { Header } from '@/components/header'
import { MobileBottomNav, Sidebar } from '@/components/sidebar'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="h-14" />}>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="min-w-0 flex-1 pb-16 md:pb-0">{children}</main>
      </div>
      <MobileBottomNav />
    </Suspense>
  )
}
