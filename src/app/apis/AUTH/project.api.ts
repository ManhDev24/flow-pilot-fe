import { fetcher } from '@/app/apis/fetcher'
import type {
  CreateProjectPayload,
  ProjectResponse,
  SingleProjectResponse,
  UpdateProjectPayload
} from '@/app/modules/AdminWs/MyProjects/models/ProjectInterface'
import type { AxiosError, AxiosResponse } from 'axios'

export const projectApi = {
  getAllProjects: async (page: number, limit: number) => {
    try {
      const response: AxiosResponse<ProjectResponse> = await fetcher.get(`/project?page=${page}&limit=${limit}`)
      return response.data as ProjectResponse
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  getProjectById: async (id: string) => {
    try {
      const response: AxiosResponse<SingleProjectResponse> = await fetcher.get(`/project/${id}`)
      return response.data as SingleProjectResponse
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  createProject: async (projectData: CreateProjectPayload) => {
    try {
      const response = await fetcher.post('/projects', projectData)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  updateProject : async (id: string, projectData: UpdateProjectPayload) => {
    try {
      const response = await fetcher.put(`/project/${id}`, projectData)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  deleteProject: async (id: string) => {
    try {
      const response = await fetcher.delete(`/project/${id}`)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  }
}
