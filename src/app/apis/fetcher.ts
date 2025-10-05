import axios from 'axios'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../utils';
import type { IUserStatePayload } from '../models';
import type { LoginResponseData } from '../modules/Auth/Login/models/LoginFormInterface';

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const fetcher = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Ensure only one refresh request is in-flight. Other requests wait via subscribers.
let isRefreshing = false
let refreshSubscribers: Array<(token: string | null) => void> = []

const subscribeTokenRefresh = (cb: (token: string | null) => void) => {
  refreshSubscribers.push(cb)
}

const onRefreshed = (token: string | null) => {
  refreshSubscribers.forEach((cb) => cb(token))
  refreshSubscribers = []
}

fetcher.interceptors.request.use((config) => {
  const userLocalStorage: IUserStatePayload = getLocalStorage('user');

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
    const originalRequest: any = error.config

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
        // If a refresh is already in progress, queue this request until it's done
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            subscribeTokenRefresh((token) => {
              if (token) {
                originalRequest.headers = originalRequest.headers || {}
                originalRequest.headers.Authorization = `Bearer ${token}`
                resolve(fetcher(originalRequest))
              } else {
                reject(error)
              }
            })
          })
        }

        // No refresh in progress -> start one
        isRefreshing = true
        try {
          const refreshResponse = await axios.post(`${BASE_URL}/auth/refresh-token`, {
            refreshToken: oldRefreshToken
          })

          const { accessToken, refreshToken, role, wsid, projectId } = refreshResponse.data?.data as LoginResponseData
          setLocalStorage('role', role)
          const userStatePayload: IUserStatePayload = { accessToken, refreshToken, role, wsid, projectId }
          setLocalStorage('user', userStatePayload)

          // notify queued requests
          onRefreshed(accessToken)

          originalRequest.headers = originalRequest.headers || {}
          originalRequest.headers.Authorization = `Bearer ${accessToken}`

          isRefreshing = false
          return fetcher(originalRequest)
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError)
          isRefreshing = false
          onRefreshed(null)

          // Only clear storage and redirect if we're sure tokens are invalid
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
