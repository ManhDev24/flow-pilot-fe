import type { LoginResponse } from '@/app/modules/Auth/Login/models/LoginFormInterface'
import type { AxiosError, AxiosResponse } from 'axios'
import { fetcher } from '../fetcher'

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
  }
}
