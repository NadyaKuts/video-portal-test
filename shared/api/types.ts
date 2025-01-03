export type VideoSnippet = {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: {
    default: { url: string; width: number; height: number }
    medium: { url: string; width: number; height: number }
    high: { url: string; width: number; height: number }
  }
  channelTitle: string
  tags?: string[]
  categoryId: string
  liveBroadcastContent: string
  localized: {
    title: string
    description: string
  }
  defaultLanguage?: string
}

export type VideoStatistics = {
  viewCount: string
  likeCount: string
  dislikeCount: string
  favoriteCount: string
  commentCount: string
}

export type Video = {
  kind: string
  etag: string
  id: string
  snippet: VideoSnippet
  statistics: VideoStatistics
}

export type User = {
  id: string
  name: string
  lastName: string
  email: string
  password: string
}

export type AuthState = {
  user: User | null
  loading: boolean
  error: string | null
}
