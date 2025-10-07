import { fetcher } from '@/app/apis/fetcher'
import type {
  CreateProjectPayload,
  ProjectResponse,
  SingleProjectResponse,
  UpdateProjectPayload
} from '@/app/modules/AdminWs/MyProjects/models/ProjectInterface'
import type { AxiosError, AxiosResponse } from 'axios'

// Helper function to get workspace_id from localStorage
const getWorkspaceId = (): string => {
  const user = localStorage.getItem('user')
  if (user) {
    const userData = JSON.parse(user)
    return userData.wsid || ''
  }
  return ''
}

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
  createProject: async (projectData: Omit<CreateProjectPayload, 'workspace_id'>) => {
    try {
      const workspaceId = getWorkspaceId()
      const payload = {
        ...projectData,
        workspace_id: workspaceId
      }
      const response = await fetcher.post('/project/create', payload) // Fixed endpoint to /project
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  updateProject: async (id: string, projectData: UpdateProjectPayload) => {
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
