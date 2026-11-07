'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { Channel, Comment } from '@/lib/data'

type Reaction = 'like' | 'dislike' | null

type AppState = {
  sidebarExpanded: boolean
  toggleSidebarExpanded: () => void
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
  subscriptions: Channel[]
  isSubscribed: (channelId: string) => boolean
  toggleSubscription: (channel: Channel) => void
  reactionFor: (id: string) => Reaction
  setReaction: (id: string, reaction: Reaction) => void
  userComments: (videoId: string) => Comment[]
  addComment: (videoId: string, text: string) => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [subscriptions, setSubscriptions] = useState<Channel[]>([])
  const [reactions, setReactions] = useState<Record<string, Reaction>>({})
  const [comments, setComments] = useState<Record<string, Comment[]>>({})

  const toggleSubscription = useCallback((channel: Channel) => {
    setSubscriptions((prev) =>
      prev.some((item) => item.id === channel.id)
        ? prev.filter((item) => item.id !== channel.id)
        : [...prev, channel],
    )
  }, [])

  const addComment = useCallback((videoId: string, text: string) => {
    const comment: Comment = {
      id: `${videoId}-${Date.now()}`,
      author: '@you',
      text,
      likes: 0,
      postedAt: 'just now',
    }
    setComments((prev) => ({ ...prev, [videoId]: [comment, ...(prev[videoId] ?? [])] }))
  }, [])

  const value = useMemo<AppState>(
    () => ({
      sidebarExpanded,
      toggleSidebarExpanded: () => setSidebarExpanded((v) => !v),
      drawerOpen,
      setDrawerOpen,
      subscriptions,
      isSubscribed: (id) => subscriptions.some((channel) => channel.id === id),
      toggleSubscription,
      reactionFor: (id) => reactions[id] ?? null,
      setReaction: (id, reaction) => setReactions((prev) => ({ ...prev, [id]: reaction })),
      userComments: (videoId) => comments[videoId] ?? [],
      addComment,
    }),
    [sidebarExpanded, drawerOpen, subscriptions, reactions, comments, toggleSubscription, addComment],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
