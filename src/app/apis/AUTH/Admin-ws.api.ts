import { fetcher } from '@/app/apis/fetcher'
import type { AdminWsResponse, CreateEmployeePayload } from '@/app/modules/AdminWs/MyEmployees/models/AdminwsInterface'
import type { AxiosError, AxiosResponse } from 'axios'

export const AdminWsApi = {
  getAllUsers: async () => {
    try {
      const response: AxiosResponse<AdminWsResponse> = await fetcher.get('user/admin')
      return response.data as AdminWsResponse
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },

  // Delete user by id
  deleteUser: async (id: string) => {
    try {
      const response = await fetcher.post(`/admin/delete/:${id}`)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },

  // Create new user
  createUser: async (userData: CreateEmployeePayload) => {
    try {
      const response = await fetcher.post('/user/admin/create', userData)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },

  // Update user
  updateUser: async (id: string, userData: Record<string, any>) => {
    try {
      const response = await fetcher.put(`/admin/update/${id}`, userData)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  }
}
