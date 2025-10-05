import { fetcher } from '@/app/apis/fetcher'
import type { MyTaskResponse } from '@/app/modules/Employee/MyTasks/models/myTask.type'

import type { AxiosError, AxiosResponse } from 'axios'

export const MyTaskApi = {
  getMyTask: async () => {
    try {
      const response: AxiosResponse<MyTaskResponse> = await fetcher.get('/task/my-tasks')
      return response.data as MyTaskResponse
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  createTaskContent: async (task_id: string, user_id: string, content: string, type: string, status: string) => {
    try {
      const response: AxiosResponse<MyTaskResponse> = await fetcher.post(`/task/content/create`, {
        task_id,
        user_id,
        content,
        type,
        status
      })
      return response.data as MyTaskResponse
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  updateTaskContent: async (
    contentId: number,
    task_id: string,
    user_id: string,
    content: string,
    type: string,
    status: string
  ) => {
    try {
      const response: AxiosResponse<MyTaskResponse> = await fetcher.put(`/task/content/update/${contentId}`, {
        task_id,
        user_id,
        content,
        type,
        status
      })
      return response.data as MyTaskResponse
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  deleteTaskContent: async (contentId: number) => {
    try {
      const response: AxiosResponse<MyTaskResponse> = await fetcher.put(`/task/content/update/${contentId}`, {
        status: 'inactive'
      })
      return response.data as MyTaskResponse
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  createChecklistItem: async (task_id: string, title: string, status: string, is_completed: boolean) => {
    try {
      const response: AxiosResponse<MyTaskResponse> = await fetcher.post(`/task/checklist/create`, {
        task_id,
        title,
        status,
        is_completed
      })
      return response.data as MyTaskResponse
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  updateChecklistItem: async (
    checklistId: string,
    task_id: string,
    title: string,
    status: string,
    is_completed: boolean
  ) => {
    try {
      const response: AxiosResponse<MyTaskResponse> = await fetcher.put(`/task/checklist/update/${checklistId}`, {
        task_id,
        title,
        status,
        is_completed
      })
      return response.data as MyTaskResponse
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  updateTaskStatus: async (taskId: string, status: string) => {
    try {
      const response: AxiosResponse<MyTaskResponse> = await fetcher.put(`/task/update/${taskId}`, {
        status
      })
      return response.data as MyTaskResponse
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  }
}
