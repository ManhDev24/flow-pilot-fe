import type { LoginResponse } from '@/app/modules/Auth/Login/models/LoginFormInterface'
import type { AxiosError, AxiosResponse } from 'axios'
import { fetcher } from '../fetcher'
import { getLocalStorage, removeLocalStorage } from '@/app/utils'
import type { IUserStatePayload } from '@/app/models'

export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response: AxiosResponse<LoginResponse> = await fetcher.post('/auth/login', {
        email,
        password
      })
      return response.data as LoginResponse
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },

  logout: async (): Promise<void> => {
    try {
      const userLocalStorage: IUserStatePayload = getLocalStorage('user')

      if (userLocalStorage) {
        const refreshToken = userLocalStorage.refreshToken

        await fetcher.post('/auth/logout', {
          refreshToken
        })
      }

      removeLocalStorage('user')
      removeLocalStorage('profile')
      removeLocalStorage('role')

      return
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },

  sendOtpForgotPassword: async (email: string) => {
    try {
      const body = {
        email,
        type: 'forgot_password'
      }

      const response: AxiosResponse<LoginResponse> = await fetcher.post('/auth/send-otp', body)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError.response
    }
  },

  forgotPassword: async (email: string, newPassword: string, confirmNewPassword: string, code: string) => {
    try {
      const body = {
        email,
        newPassword,
        confirmNewPassword,
        code
      }

      const response = await fetcher.post('/auth/forgot-password', body)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError.response
    }
  },

  changePassword: async (email: string, newPassword: string, confirmNewPassword: string) => {
    try {
      const body = {
        email,
        newPassword,
        confirmNewPassword
      }

      const response = await fetcher.put('/auth/change-password', body)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError.response
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await fetcher.get('/user/me')
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  }
}
