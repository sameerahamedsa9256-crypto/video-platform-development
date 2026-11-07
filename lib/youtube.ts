import 'server-only'

import {
  getCategorySlug,
  getYouTubeCategoryId,
  type Channel,
  type Video,
} from '@/lib/data'

const API_BASE = 'https://www.googleapis.com/youtube/v3'
const CACHE_SECONDS = 60 * 60
const CHANNEL_COLORS = [
  'bg-sky-600',
  'bg-indigo-600',
  'bg-orange-600',
  'bg-fuchsia-600',
  'bg-rose-600',
  'bg-amber-600',
  'bg-violet-600',
  'bg-emerald-600',
]

export class YouTubeApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'YouTubeApiError'
  }
}

type ApiVideo = {
  id: string
  snippet: {
    title: string
    description: string
    publishedAt: string
    channelId: string
    channelTitle: string
    categoryId?: string
    thumbnails?: Record<string, { url: string }>
    liveBroadcastContent?: 'live' | 'upcoming' | 'none'
  }
  contentDetails?: {
    duration?: string
    regionRestriction?: { allowed?: string[]; blocked?: string[] }
  }
  status?: { embeddable?: boolean }
  statistics?: { viewCount?: string; likeCount?: string }
}

type SearchResponse = {
  items?: Array<{ id?: { videoId?: string } }>
}

type VideoListResponse = {
  items?: ApiVideo[]
}

async function youtubeRequest<T>(resource: 'search' | 'videos', params: URLSearchParams): Promise<T> {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) {
    throw new YouTubeApiError('Video feed configuration is unavailable. Please try again later.')
  }

  const url = new URL(`${API_BASE}/${resource}`)
  url.search = params.toString()

  let response: Response
  try {
    response = await fetch(url, {
      headers: { 'x-goog-api-key': apiKey },
      next: { revalidate: CACHE_SECONDS },
    })
  } catch {
    throw new YouTubeApiError('The video service could not be reached. Check the connection and try again.')
  }

  if (!response.ok) {
    if (response.status === 403) {
      throw new YouTubeApiError('The video service denied this request. Check its access and quota, then try again.')
    }
    if (response.status === 404) {
      throw new YouTubeApiError('This video could not be found.')
    }
    throw new YouTubeApiError('Videos could not load right now. Please try again later.')
  }

  return response.json() as Promise<T>
}

function makeChannel(id: string, name: string): Channel {
  const hash = [...id].reduce((value, char) => value + char.charCodeAt(0), 0)
  return {
    id,
    name,
    avatarColor: CHANNEL_COLORS[hash % CHANNEL_COLORS.length],
  }
}

function formatDuration(isoDuration = '') {
  const [, hours = '0', minutes = '0', seconds = '0'] = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/) ?? []
  const h = Number(hours)
  const m = Number(minutes)
  const s = Number(seconds)
  if (h) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

function relativeDate(dateString: string) {
  const timestamp = Date.parse(dateString)
  if (!Number.isFinite(timestamp)) return 'recently'

  const days = Math.max(0, Math.floor((Date.now() - timestamp) / 86_400_000))
  if (days === 0) return 'today'
  if (days === 1) return '1 day ago'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  if (days < 365) return `${Math.floor(days / 30)} months ago`
  return `${Math.floor(days / 365)} years ago`
}

function isPlayableInUs(video: ApiVideo) {
  if (video.status?.embeddable !== true || video.snippet.liveBroadcastContent === 'upcoming') return false
  if (/marvel studios['’]?\s+avengers:\s*endgame/i.test(video.snippet.title)) return false
  if (/youtube movies/i.test(video.snippet.channelTitle)) return false
  const restriction = video.contentDetails?.regionRestriction
  if (restriction?.blocked?.includes('US')) return false
  if (restriction?.allowed && !restriction.allowed.includes('US')) return false
  return true
}

function mapVideo(video: ApiVideo): Video {
  const youtubeId = video.id
  const thumbnails = video.snippet.thumbnails ?? {}
  const channelInfo = makeChannel(video.snippet.channelId, video.snippet.channelTitle)
  return {
    id: youtubeId,
    youtubeId,
    title: video.snippet.title,
    description: video.snippet.description,
    thumbnail:
      thumbnails.maxres?.url ??
      thumbnails.standard?.url ??
      thumbnails.high?.url ??
      thumbnails.medium?.url ??
      thumbnails.default?.url ??
      '',
    src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}?rel=0&playsinline=1`,
    duration: formatDuration(video.contentDetails?.duration),
    views: Number(video.statistics?.viewCount ?? 0),
    postedAt: relativeDate(video.snippet.publishedAt),
    likes: Number(video.statistics?.likeCount ?? 0),
    channelId: video.snippet.channelId,
    channelInfo,
    category: getCategorySlug(video.snippet.categoryId),
    comments: [],
  }
}

export async function searchYouTubeVideos({
  q,
  category,
  duration,
  maxResults = 24,
}: {
  q?: string
  category?: string
  duration?: 'short'
  maxResults?: number
} = {}): Promise<Video[]> {
  const params = new URLSearchParams({
    part: 'snippet',
    type: 'video',
    maxResults: String(Math.min(Math.max(maxResults, 1), 24)),
    order: q?.trim() ? 'relevance' : 'viewCount',
    regionCode: 'US',
    safeSearch: 'moderate',
    videoEmbeddable: 'true',
    videoSyndicated: 'true',
  })
  const query = q?.trim().slice(0, 100)
  if (query) params.set('q', query)
  if (category) {
    const categoryId = getYouTubeCategoryId(category)
    if (categoryId) params.set('videoCategoryId', categoryId)
  }
  if (duration) params.set('videoDuration', duration)

  const search = await youtubeRequest<SearchResponse>('search', params)
  const ids = (search.items ?? [])
    .map((item) => item.id?.videoId)
    .filter((id): id is string => Boolean(id))
  if (ids.length === 0) return []

  return getYouTubeVideosByIds(ids)
}

export async function getYouTubeVideo(id: string): Promise<Video | undefined> {
  if (!/^[A-Za-z0-9_-]{6,20}$/.test(id)) return undefined
  const videos = await getYouTubeVideosByIds([id])
  return videos[0]
}

async function getYouTubeVideosByIds(ids: string[]): Promise<Video[]> {
  const params = new URLSearchParams({
    part: 'snippet,statistics,contentDetails,status',
    id: ids.slice(0, 24).join(','),
  })
  const response = await youtubeRequest<VideoListResponse>('videos', params)
  const byId = new Map(
    (response.items ?? [])
      .filter(isPlayableInUs)
      .map((video) => [video.id, mapVideo(video)]),
  )
  return ids.flatMap((id) => {
    const video = byId.get(id)
    return video ? [video] : []
  })
}
