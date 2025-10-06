import axios from 'axios'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../utils'
import type { IUserStatePayload } from '../models'
import type { LoginResponseData } from '../modules/Auth/Login/models/LoginFormInterface'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const fetcher = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

fetcher.interceptors.request.use((config) => {
  const userLocalStorage: IUserStatePayload = getLocalStorage('user')

  if (userLocalStorage) {
    config.headers.Authorization = `Bearer ${userLocalStorage.accessToken}`
  }
  return config
})

fetcher.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      error.response?.data?.code == 'INVALID_EXPIRED_ACCESS_TOKEN' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      const userLocalStorage: IUserStatePayload = getLocalStorage('user')
      const oldAccessToken = userLocalStorage?.accessToken
      const oldRefreshToken = userLocalStorage?.refreshToken

      if (oldAccessToken && oldRefreshToken) {
        try {
          const refreshResponse = await axios.post(`${BASE_URL}/auth/refresh-token`, {
            refreshToken: oldRefreshToken
          })

          const { accessToken, refreshToken, role, wsid } = refreshResponse.data?.data as LoginResponseData
          setLocalStorage('role', role)
          const userStatePayload: IUserStatePayload = { accessToken, refreshToken, role, wsid }
          setLocalStorage('user', userStatePayload)
          originalRequest.headers.Authorization = `Bearer ${accessToken}`

          return fetcher(originalRequest)
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError)
          // Only clear storage and redirect if we're sure tokens are invalid
          // Check if the error is actually related to invalid refresh token
          if (
            axios.isAxiosError(refreshError) &&
            (refreshError.response?.status === 401 || refreshError.response?.status === 403)
          ) {
            removeLocalStorage('user')
            removeLocalStorage('role')

            // Avoid redirect loop - only redirect if not already on auth pages
            if (!window.location.pathname.startsWith('/auth')) {
              window.location.href = '/auth/login'
            }
          }
          return Promise.reject(refreshError)
        }
      } else {
        // If no tokens available and we're not on auth page, redirect to login
        if (!window.location.pathname.startsWith('/auth')) {
          removeLocalStorage('user')
          removeLocalStorage('role')
          window.location.href = '/auth/login'
        }
      }
    }
    return Promise.reject(error)
  }
)
