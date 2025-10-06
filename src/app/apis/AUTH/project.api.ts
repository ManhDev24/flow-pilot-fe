import { fetcher } from '../fetcher'

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

export const projectApi = {
  // Get project by ID
  getProjectById: async (projectId: string): Promise<ProjectResponse> => {
    const response = await fetcher.get(`/project/${projectId}`)
    return response.data
  },

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
  }
}
