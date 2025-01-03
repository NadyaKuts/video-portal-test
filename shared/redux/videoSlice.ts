import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiGetVideos } from 'shared/api/apiGetVideos'
import { type Video } from 'shared/api/types'

export enum Sort {
  Date = 'date',
  Views = 'views',
}

export enum Order {
  Asc = 'asc',
  Desc = 'desc',
}

type VideoState = {
  videos: Video[]
  loading: boolean
  error: string | null
  currentPage: number
  itemsPerPage: number
  sortBy: Sort
  sortOrder: Order
  filter: string
}

const initialState: VideoState = {
  videos: [],
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 12,
  sortBy: Sort.Date,
  sortOrder: Order.Desc,
  filter: '',
}

export const fetchVideos = createAsyncThunk<Video[]>(
  'videos/fetchVideos',
  async () => {
    const response = await apiGetVideos()
    const data = response

    return data.items.map((item: any) => ({
      kind: item.kind,
      etag: item.etag,
      id: item.id,
      snippet: {
        publishedAt: item.snippet.publishedAt,
        channelId: item.snippet.channelId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnails: item.snippet.thumbnails,
        channelTitle: item.snippet.channelTitle,
        tags: item.snippet.tags || [],
        categoryId: item.snippet.categoryId,
        liveBroadcastContent: item.snippet.liveBroadcastContent,
        localized: item.snippet.localized,
        defaultLanguage: item.snippet.defaultLanguage,
      },
      statistics: {
        viewCount: item.statistics.viewCount,
        likeCount: item.statistics.likeCount,
        dislikeCount: item.statistics.dislikeCount,
        favoriteCount: item.statistics.favoriteCount,
        commentCount: item.statistics.commentCount,
      },
    }))
  }
)

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload
      state.currentPage = 1
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false
        state.videos = action.payload
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Unknown error'
      })
  },
})

export const {
  setCurrentPage,
  setItemsPerPage,
  setSortBy,
  setSortOrder,
  setFilter,
} = videoSlice.actions
export default videoSlice.reducer
