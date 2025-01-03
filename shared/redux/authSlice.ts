import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { login, register } from 'shared/api/mockAuth'
import type { AuthState, User } from 'shared/api/types'

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
}

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string }
>(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const user = await login({ email, password })
      window.localStorage?.setItem('user', JSON.stringify(user))
      return user
    } catch {
      return Promise.reject('error')
    }
  }
)

export const registerUser = createAsyncThunk<User, Omit<User, 'id'>>(
  'auth/registerUser',
  async (dto) => {
    const user = await register(dto)
    localStorage.setItem('user', JSON.stringify(user))
    return user
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      localStorage.removeItem('user')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Unknown error'
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Unknown error'
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
