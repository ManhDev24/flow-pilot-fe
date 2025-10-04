import { fetcher } from '@/app/apis/fetcher'
import type {
  AdminWsResponse,
  CreateEmployeePayload,
  UpdateEmployeePayload
} from '@/app/modules/AdminWs/MyEmployees/models/AdminwsInterface'
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
      const response = await fetcher.delete(`/user/admin/delete/${id}`)
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

  updateUser: async (id: string, userData: UpdateEmployeePayload) => {
    try {
      const response = await fetcher.put(`/user/admin/${id}`, userData)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  }
}
