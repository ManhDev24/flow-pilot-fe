import type { AxiosError, AxiosResponse } from 'axios'
import { fetcher } from '../fetcher'
import type {
  CreateProjectPayload,
  SingleProjectResponse,
  UpdateProjectPayload
} from '@/app/modules/AdminWs/MyProjects/models/ProjectInterface'

export interface IUser {
  id: string
  name: string
  email: string
  avatar_url: string | null
  role: {
    role: string
  }
  department: {
    id: number
    name: string
  }
}

export interface IProjectMember {
  id: number
  role: string
  user: IUser
}

export interface IProject {
  id: string
  workspace_id: string
  name: string
  description: string | null
  start_date: string
  end_date: string
  process: number
  team_size: number | null
  created_at: string
  updated_at: string
  manager_id: string
  status: string
  members: IProjectMember[]
}

export interface ProjectResponse {
  success: boolean
  message: string
  data: IProject
}

export interface MemberDetailResponse {
  success: boolean
  message: string
  data: IProjectMember
}

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
  // Get project by ID

  // Get member detail by member ID (from project members)
  getMemberDetail: async (projectId: string, memberId: number): Promise<MemberDetailResponse> => {
    // Since we don't have a direct API, we'll get the project and find the member
    const projectResponse = await fetcher.get(`/project/${projectId}`)
    const project = projectResponse.data.data
    const member = project.members.find((m: IProjectMember) => m.id === memberId)

    if (!member) {
      throw new Error('Member not found')
    }

    return {
      success: true,
      message: 'Get member detail successfully',
      data: member
    }
  },

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
  },
  assignUsersToProject: async (projectId: string, users: Array<{ user_id: string; role: string }>) => {
    try {
      const response = await fetcher.post(`/project/${projectId}/assign-users`, { users })
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  }
}
