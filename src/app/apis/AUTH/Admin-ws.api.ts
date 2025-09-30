import { fetcher } from '@/app/apis/fetcher'
import type { AdminWsResponse } from '@/app/modules/AdminWs/MyEmployees/models/AdminwsInterface'
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
  }
}
