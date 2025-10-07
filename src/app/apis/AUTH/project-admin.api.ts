import { fetcher } from '@/app/apis/fetcher'

import type { AxiosError } from 'axios'

export const ProjectAdminApi = {
  getAllProjects: async (page: number, pageSize: number) => {
    try {
      const response = await fetcher.get(`/project?page=${page}&pageSize=${pageSize}`)
      return response.data.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  getAllManagers: async () => {
    try {
      const response = await fetcher.get('/user/all-manager')
      return response.data.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  createProject: async (projectData: {
    name: string
    manager_id: string
    description: string
    start_date: string
    end_date: string
    process: number
    team_size: number
    status: 'active' | 'inactive'
  }) => {
    try {
      const response = await fetcher.post('/project/create', projectData)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  updateProject: async (
    projectData: {
      name: string
      manager_id: string
      description: string
      start_date: string
      end_date: string
      process: number
      team_size: number
      status: 'active' | 'inactive'
    },
    projectId: string
  ) => {
    try {
      const response = await fetcher.put(`/project/${projectId}`, projectData)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  deleteProject: async (projectId: string) => {
    try {
      const response = await fetcher.delete(`/project/${projectId}`)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  getProjectOverview: async (projectId: string) => {
    try {
      const response = await fetcher.get(`/performance/project-overview`, {
        params: { projectId }
      })
      return response.data.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  getProjectKpis: async (projectId: string) => {
    try {
      const response = await fetcher.get(`/performance/project-kpi`, {
        params: { projectId }
      })
      return response.data.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  getProjectAiAnalysis: async (projectId: string) => {
    try {
      const response = await fetcher.get(`/performance/project-ai-analysis`, {
        params: { projectId }
      })
      return response.data.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  getProjectMembers: async (projectId: string) => {
    try {
      const response = await fetcher.get(`/performance/project-members`, {
        params: { projectId }
      })
      return response.data.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  }
}
