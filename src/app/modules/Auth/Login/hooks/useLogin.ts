import { authApi } from '@/app/apis/AUTH/Auth.api'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import type { LoginResponse } from '../models/LoginFormInterface'

export const useLogin = () => {
  return useMutation({
    mutationFn: async (variables: { email: string; password: string }) => {
      const { email, password } = variables
      return authApi.login(email, password) as Promise<LoginResponse>
    },
    onSuccess: (data: LoginResponse) => {
      if (data?.data?.accessToken) {
        localStorage.setItem('access_token', data.data.accessToken)
      }
      if (data?.data?.refreshToken) {
        localStorage.setItem('refresh_token', data.data.refreshToken)
      }
      if (data?.data?.role) {
        localStorage.setItem('role', data.data.role)
      }
      toast.success('Đăng nhập thành công!')
    },
    onError: (error: { response?: { data?: LoginResponse }; message?: string }) => {
      let message = 'Đăng nhập thất bại!';
      const apiMessage = error?.response?.data?.message;
      if (typeof apiMessage === 'string') {
        message = apiMessage;
      } else if (typeof apiMessage === 'object' && apiMessage?.message) {
        message = apiMessage.message;
      } else if (error?.message) {
        message = error.message;
      }
      toast.error(message);
    }
  })
}
