export interface ProjectByAdminRes {
  success: boolean
  message: string
  data: ProjectByAdmin
}

export interface ProjectByAdmin {
  data: ProjectByAdminData[]
  total: number
  page: number
  limit: number
}

export interface ProjectByAdminData {
  id: string
  workspace_id: string
  name: string
  description: any
  start_date: string
  end_date: string
  process: number
  team_size: any
  created_at: string
  updated_at: string
  manager_id: string
  status: string
  manager?: {
    id: string
    name: string
    email: string
    avatar_url: string | null
    role_id: number
    created_at: string
    updated_at: string
  }
}
