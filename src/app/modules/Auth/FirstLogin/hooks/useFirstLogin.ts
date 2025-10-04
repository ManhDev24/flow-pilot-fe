import { authApi } from '@/app/apis/AUTH/Auth.api'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import type { FirstLoginResponse } from '../models/FirstLoginFormInterface'
import { setLocalStorage } from '@/app/utils'
import { useDispatch } from 'react-redux'
import { setRole } from '@/app/redux/slices/role.slice'
import { useNavigate } from 'react-router-dom'
import { PATH } from '@/app/routes/path'

export const useFirstLogin = (email: string) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (variables: { newPassword: string }) => {
      const { newPassword } = variables
      // Replace this with your actual API call
      // return authApi.firstLogin(email, newPassword) as Promise<FirstLoginResponse>
      
      // Temporary mock implementation - replace with actual API call
      return new Promise<FirstLoginResponse>((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: 'Password changed successfully',
            data: { success: true }
          })
        }, 1000)
      })
    },
    onSuccess: (data: FirstLoginResponse) => {
      if (data.success) {
        // Assuming the role is already in Redux from login
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          setLocalStorage('role', userData.role)
          dispatch(setRole(userData.role))
        }
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
