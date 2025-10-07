import { authApi } from '@/app/apis/AUTH/Auth.api'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import type { FirstLoginResponse } from '../models/FirstLoginFormInterface'
import { useNavigate } from 'react-router-dom'
import { PATH } from '@/app/routes/path'

export const useFirstLogin = (email: string) => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (variables: { newPassword: string, confirmPassword: string }) => {
      const { newPassword, confirmPassword } = variables
      return authApi.changePassword(email, newPassword, confirmPassword) as Promise<FirstLoginResponse>
    },
    onSuccess: (data: FirstLoginResponse) => {
      if (data.success) {
        toast.success('Password changed successfully!')
        navigate(PATH.LOGIN)
      } else {
        toast.error('Failed to change password!')
      }
    },
    onError: (error: { response?: { data?: FirstLoginResponse }; message?: string }) => {
      let message = 'Failed to change password!'
      const apiMessage = error?.response?.data?.message
      if (typeof apiMessage === 'string') {
        message = apiMessage
      } else if (typeof apiMessage === 'object' && apiMessage?.message) {
        message = apiMessage.message
      } else if (error?.message) {
        message = error.message
      }
      toast.error(message)
    }
  })
}
