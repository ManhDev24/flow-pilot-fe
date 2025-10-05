import { authApi } from '@/app/apis/AUTH/Auth.api'
import { PATH } from '@/app/routes/path'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import type { LoginResponse } from '../../Login/models/LoginFormInterface'

export const useResetPassword = (email: string) => {
  const navigate = useNavigate()

  return useMutation<LoginResponse, { data?: LoginResponse; message?: string }, { newPassword: string; confirmPassword: string; code: string }>({
    mutationFn: async (variables: { newPassword: string; confirmPassword: string; code: string }) => {
      const { newPassword, confirmPassword, code } = variables
      return authApi.forgotPassword(email, newPassword, confirmPassword, code) as Promise<LoginResponse>
    },
    onSuccess: (data) => {
      if (data && data.success) {
        toast.success('Password reset successfully!')
        navigate(PATH.LOGIN)
      } else {
        const errorMessage = typeof data.message === 'string' ? data.message : data.message?.message || 'Failed to reset password!'
        toast.error(errorMessage)
      }
    },
    onError: (error: { data?: LoginResponse; message?: string }) => {
      let message = 'Failed to reset password!'
      if (error?.data?.message) {
        message = typeof error.data.message === 'string' ? error.data.message : error.data.message.message
      } else if (error?.message) {
        message = error.message
      }
      toast.error(message)
    }
  })
}

export const useResendOtp = (email: string) => {
  return useMutation<LoginResponse, { data?: LoginResponse; message?: string }, void>({
    mutationFn: async () => {
      return authApi.sendOtpForgotPassword(email) as Promise<LoginResponse>
    },
    onSuccess: (data) => {
      if (data && data.success) {
        toast.success('OTP resent successfully!')
      } else {
        const errorMessage = typeof data.message === 'string' ? data.message : data.message?.message || 'Failed to resend OTP!'
        toast.error(errorMessage)
      }
    },
    onError: (error: { data?: LoginResponse; message?: string }) => {
      let message = 'Failed to resend OTP!'
      if (error?.data?.message) {
        message = typeof error.data.message === 'string' ? error.data.message : error.data.message.message
      } else if (error?.message) {
        message = error.message
      }
      toast.error(message)
    }
  })
}
