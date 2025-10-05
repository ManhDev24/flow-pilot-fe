import { fetcher } from '@/app/apis/fetcher'
import type { PerformanceResponse } from '@/app/modules/Employee/MyPerformance/models/perfomance.type'
import type { AxiosError, AxiosResponse } from 'axios'

export const MyTaskApi = {
  getMyPerformance: async (userId: string, date: string) => {
    try {
      const response: AxiosResponse<PerformanceResponse> = await fetcher.get(
        `/performance/dashboard-summary/${userId}`,
        {
          params: { date }
        }
      )
      return response.data as PerformanceResponse
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  postFocusTime: async (focused_minutes: number) => {
    try {
      const response: AxiosResponse = await fetcher.post(`/focus-log`, {
        focused_minutes
      })
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  }
}
