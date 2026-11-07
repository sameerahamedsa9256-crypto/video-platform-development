export type Channel = {
  id: string
  name: string
  subscribers?: number
  avatarColor: string
}

export type Comment = {
  id: string
  author: string
  text: string
  likes: number
  postedAt: string
}

export type Video = {
  id: string
  youtubeId: string
  title: string
  description: string
  thumbnail: string
  src: string
  duration: string
  views: number
  postedAt: string
  likes: number
  channelId: string
  channelInfo: Channel
  category: string
  comments: Comment[]
}

export type Short = Pick<
  Video,
  'id' | 'youtubeId' | 'title' | 'thumbnail' | 'src' | 'views' | 'likes' | 'channelId' | 'channelInfo'
>

export const categories = [
  { slug: 'music', label: 'Music' },
  { slug: 'gaming', label: 'Gaming' },
  { slug: 'news', label: 'News' },
  { slug: 'sports', label: 'Sports' },
  { slug: 'learning', label: 'Learning' },
  { slug: 'travel', label: 'Travel' },
  { slug: 'cooking', label: 'Cooking' },
  { slug: 'tech', label: 'Tech' },
  { slug: 'autos', label: 'Autos' },
] as const

const categoryById: Record<string, string> = {
  '2': 'autos',
  '10': 'music',
  '17': 'sports',
  '19': 'travel',
  '20': 'gaming',
  '25': 'news',
  '26': 'cooking',
  '27': 'learning',
  '28': 'tech',
}

export function getCategorySlug(categoryId?: string) {
  return categoryId ? categoryById[categoryId] ?? '' : ''
}

export function getYouTubeCategoryId(slug?: string) {
  const entry = Object.entries(categoryById).find(([, category]) => category === slug)
  return entry?.[0]
}

export function getVideoChannel(video: Pick<Video, 'channelId' | 'channelInfo'> | Pick<Short, 'channelId' | 'channelInfo'>) {
  return video.channelInfo
}

export function formatCount(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1).replace(/\.0$/, '')}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1).replace(/\.0$/, '')}K`
  return String(n)
}
