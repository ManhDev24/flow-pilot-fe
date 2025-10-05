import { fetcher } from '@/app/apis/fetcher'
import type { MyFileResponse } from '@/app/modules/Employee/MyFiles/models/myFile.type'
import type { AxiosError, AxiosResponse } from 'axios'

export const MyTaskApi = {
  getMyFile: async () => {
    try {
      const response: AxiosResponse<MyFileResponse> = await fetcher.get('/file/user-files')
      return response.data as MyFileResponse
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  uploadFile: async (file: File) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response: AxiosResponse<MyFileResponse> = await fetcher.post('/file/upload/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data as MyFileResponse
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  deleteFile: async (fileId: number) => {
    try {
      const response: AxiosResponse<MyFileResponse> = await fetcher.delete(`/file/${fileId}`)
      return response.data as MyFileResponse
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  }
}
