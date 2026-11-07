export type Channel = {
  id: string
  name: string
  handle: string
  subscribers: number
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
  title: string
  description: string
  thumbnail: string
  src: string
  duration: string
  views: number
  postedAt: string
  likes: number
  channelId: string
  category: string
  comments: Comment[]
}

export type Short = {
  id: string
  title: string
  thumbnail: string
  src: string
  views: number
  likes: number
  channelId: string
}

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

const SAMPLE = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample'

export const channels: Channel[] = [
  { id: 'nomad', name: 'Nomad Lens', handle: '@nomadlens', subscribers: 1_840_000, avatarColor: 'bg-sky-600' },
  { id: 'devloop', name: 'DevLoop', handle: '@devloop', subscribers: 912_000, avatarColor: 'bg-indigo-600' },
  { id: 'umami', name: 'Umami Kitchen', handle: '@umamikitchen', subscribers: 3_200_000, avatarColor: 'bg-orange-600' },
  { id: 'pixel', name: 'Pixel Rush', handle: '@pixelrush', subscribers: 5_600_000, avatarColor: 'bg-fuchsia-600' },
  { id: 'amplify', name: 'Amplify Live', handle: '@amplifylive', subscribers: 2_100_000, avatarColor: 'bg-rose-600' },
  { id: 'courtside', name: 'Courtside Daily', handle: '@courtside', subscribers: 760_000, avatarColor: 'bg-amber-600' },
  { id: 'cosmos', name: 'Cosmos Explained', handle: '@cosmosexplained', subscribers: 4_300_000, avatarColor: 'bg-violet-600' },
  { id: 'torque', name: 'Torque Review', handle: '@torquereview', subscribers: 1_250_000, avatarColor: 'bg-emerald-600' },
]

const seedComments = (prefix: string): Comment[] => [
  { id: `${prefix}-c1`, author: '@mayaruns', text: 'This is exactly what I needed today. The editing is incredible!', likes: 1240, postedAt: '2 days ago' },
  { id: `${prefix}-c2`, author: '@jkwon', text: 'Been following since 10k subs and the quality keeps going up.', likes: 532, postedAt: '1 day ago' },
  { id: `${prefix}-c3`, author: '@sofia.dev', text: 'Can you do a follow-up on this? Would love a deeper dive.', likes: 87, postedAt: '9 hours ago' },
]

export const videos: Video[] = [
  {
    id: 'v1', title: 'I Spent 7 Days in the Norwegian Fjords — Drone Footage You Have to See',
    description: 'A week-long road trip through the most breathtaking fjords in Norway. Gear, routes, and tips for planning your own trip are all in this video.',
    thumbnail: '/thumbs/1.png', src: `${SAMPLE}/ForBiggerEscapes.mp4`, duration: '18:42', views: 2_400_000, postedAt: '3 days ago', likes: 98_000, channelId: 'nomad', category: 'travel', comments: seedComments('v1'),
  },
  {
    id: 'v2', title: 'Build a Full-Stack App in 1 Hour (Next.js, Postgres, Auth)',
    description: 'We build and deploy a production-ready full-stack app from scratch. Source code linked below.',
    thumbnail: '/thumbs/2.png', src: `${SAMPLE}/BigBuckBunny.mp4`, duration: '1:02:15', views: 486_000, postedAt: '1 week ago', likes: 31_000, channelId: 'devloop', category: 'tech', comments: seedComments('v2'),
  },
  {
    id: 'v3', title: 'The Perfect Tonkotsu Ramen at Home (18-Hour Broth)',
    description: 'Rich, creamy tonkotsu broth, chashu pork, and ajitama eggs. Step by step so you can nail it the first time.',
    thumbnail: '/thumbs/3.png', src: `${SAMPLE}/ForBiggerJoyrides.mp4`, duration: '22:08', views: 5_100_000, postedAt: '2 weeks ago', likes: 210_000, channelId: 'umami', category: 'cooking', comments: seedComments('v3'),
  },
  {
    id: 'v4', title: 'Ranked Grind to #1 — The Clutch Nobody Expected',
    description: 'Full ranked session with commentary. The final round is absolutely unreal.',
    thumbnail: '/thumbs/4.png', src: `${SAMPLE}/ForBiggerBlazes.mp4`, duration: '34:51', views: 1_900_000, postedAt: '5 hours ago', likes: 120_000, channelId: 'pixel', category: 'gaming', comments: seedComments('v4'),
  },
  {
    id: 'v5', title: 'Full Live Set — Summer Festival Main Stage 2026',
    description: 'The complete main stage performance, recorded live in 4K with multitrack audio.',
    thumbnail: '/thumbs/5.png', src: `${SAMPLE}/ElephantsDream.mp4`, duration: '1:24:30', views: 3_700_000, postedAt: '4 days ago', likes: 260_000, channelId: 'amplify', category: 'music', comments: seedComments('v5'),
  },
  {
    id: 'v6', title: 'Top 50 Dunks of the Season (Ranked)',
    description: 'From posterizers to between-the-legs slams, these are the best dunks of the season.',
    thumbnail: '/thumbs/6.png', src: `${SAMPLE}/ForBiggerFun.mp4`, duration: '15:12', views: 890_000, postedAt: '1 day ago', likes: 45_000, channelId: 'courtside', category: 'sports', comments: seedComments('v6'),
  },
  {
    id: 'v7', title: 'How Big Is the Universe, Really? A Journey to the Edge',
    description: 'From our solar system to the observable universe, we explore the true scale of everything.',
    thumbnail: '/thumbs/7.png', src: `${SAMPLE}/Sintel.mp4`, duration: '27:40', views: 12_000_000, postedAt: '1 month ago', likes: 640_000, channelId: 'cosmos', category: 'learning', comments: seedComments('v7'),
  },
  {
    id: 'v8', title: 'This EV Changes Everything — 1,000 Mile Road Test',
    description: 'We drove this electric sports car 1,000 miles along the coast. Range, charging, and handling, all tested.',
    thumbnail: '/thumbs/8.png', src: `${SAMPLE}/TearsOfSteel.mp4`, duration: '24:03', views: 1_300_000, postedAt: '6 days ago', likes: 72_000, channelId: 'torque', category: 'autos', comments: seedComments('v8'),
  },
  {
    id: 'v9', title: 'Breaking: The Biggest Science Stories of the Week',
    description: 'A weekly roundup of the most important discoveries in space and physics.',
    thumbnail: '/thumbs/7.png', src: `${SAMPLE}/ForBiggerMeltdowns.mp4`, duration: '11:26', views: 640_000, postedAt: '12 hours ago', likes: 28_000, channelId: 'cosmos', category: 'news', comments: seedComments('v9'),
  },
  {
    id: 'v10', title: 'TypeScript Tips I Wish I Knew Sooner',
    description: '12 practical TypeScript patterns that will make your code safer and cleaner.',
    thumbnail: '/thumbs/2.png', src: `${SAMPLE}/SubaruOutbackOnStreetAndDirt.mp4`, duration: '16:37', views: 312_000, postedAt: '3 weeks ago', likes: 19_000, channelId: 'devloop', category: 'learning', comments: seedComments('v10'),
  },
  {
    id: 'v11', title: 'Lo-fi Beats to Study & Relax To — 3 Hour Mix',
    description: 'Chill beats for focus, studying, and late-night coding sessions.',
    thumbnail: '/thumbs/5.png', src: `${SAMPLE}/WeAreGoingOnBullrun.mp4`, duration: '3:00:00', views: 22_000_000, postedAt: '8 months ago', likes: 900_000, channelId: 'amplify', category: 'music', comments: seedComments('v11'),
  },
  {
    id: 'v12', title: 'Hidden Lakes of Patagonia — Solo Backpacking',
    description: 'Ten days on the trail through some of the most remote lakes in Patagonia.',
    thumbnail: '/thumbs/1.png', src: `${SAMPLE}/VolkswagenGTIReview.mp4`, duration: '29:55', views: 1_050_000, postedAt: '2 months ago', likes: 61_000, channelId: 'nomad', category: 'travel', comments: seedComments('v12'),
  },
]

export const shorts: Short[] = [
  { id: 's1', title: 'Fjord sunrise in 15 seconds', thumbnail: '/thumbs/1.png', src: `${SAMPLE}/ForBiggerEscapes.mp4`, views: 4_200_000, likes: 310_000, channelId: 'nomad' },
  { id: 's2', title: 'The 1-minute ramen egg hack', thumbnail: '/thumbs/3.png', src: `${SAMPLE}/ForBiggerJoyrides.mp4`, views: 9_800_000, likes: 720_000, channelId: 'umami' },
  { id: 's3', title: 'Impossible clutch?!', thumbnail: '/thumbs/4.png', src: `${SAMPLE}/ForBiggerBlazes.mp4`, views: 2_600_000, likes: 190_000, channelId: 'pixel' },
  { id: 's4', title: 'Dunk of the year contender', thumbnail: '/thumbs/6.png', src: `${SAMPLE}/ForBiggerFun.mp4`, views: 1_100_000, likes: 88_000, channelId: 'courtside' },
  { id: 's5', title: 'Saturn is less dense than water', thumbnail: '/thumbs/7.png', src: `${SAMPLE}/ForBiggerMeltdowns.mp4`, views: 6_400_000, likes: 520_000, channelId: 'cosmos' },
]

export function getChannel(id: string) {
  return channels.find((c) => c.id === id)!
}

export function getVideo(id: string) {
  return videos.find((v) => v.id === id)
}

export function formatCount(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1).replace(/\.0$/, '')}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1).replace(/\.0$/, '')}K`
  return String(n)
}

export function searchVideos({ q, category }: { q?: string; category?: string }) {
  const query = q?.trim().toLowerCase()
  return videos.filter((v) => {
    if (category && v.category !== category) return false
    if (!query) return true
    const channel = getChannel(v.channelId)
    return (
      v.title.toLowerCase().includes(query) ||
      v.description.toLowerCase().includes(query) ||
      channel.name.toLowerCase().includes(query) ||
      v.category.includes(query)
    )
  })
}
