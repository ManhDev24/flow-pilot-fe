import { fetcher } from '@/app/apis/fetcher'
import type {
  CreateDepartmentResponse,
  UpdateDepartmentResponse
} from '@/app/modules/AdminWs/MyDepartment/models/MydepartmentInterface'
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
  },
  getAllDepartments: async (page: number, pageSize: number) => {
    try {
      const response = await fetcher.get(`/department?page=${page}&pageSize=${pageSize}`)
      console.log('API Raw Response:', response.data) // Debug log
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      console.error('API Error:', axiosError) // Debug log
      throw axiosError
    }
  },
  createDepartment: async (name: string, description: string) => {
    try {
      const response = await fetcher.post('/department', { name, description })
      return response.data as CreateDepartmentResponse
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  updateDepartment: async (name: string, description: string, status: string, id: number) => {
    try {
      const response = await fetcher.put(`/department/${id}`, { name, description, status })
      return response.data as UpdateDepartmentResponse
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  deleteDepartment: async (id: number) => {
    try {
      const response = await fetcher.delete(`/department/${id}`)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  }
}
