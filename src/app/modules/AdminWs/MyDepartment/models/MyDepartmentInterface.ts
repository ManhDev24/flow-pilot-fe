export interface Department {
  id: number
  name: string
  description: string | null
  status: 'active' | 'inactive'
  created_at: Date
  updated_at: Date
  workspace_id: string
  workspace: {
    id: string
    name: string
    company_name?: string // Only in getById response
  }
  _count: {
    users: number
  }
}
export interface UpdateDepartmentRequest {
  name?: string // Optional, min 1 char, max 255 chars
  description?: string | null // Optional
  status?: DepartmentStatus
}
export interface CreateDepartmentRequest {
  name: string // Required, min 1 char, max 255 chars
  description?: string | null // Optional
}
export interface DepartmentListResponse {
  items: Department[]
  total: number
  page: number
  limit: number
}

type DepartmentStatus = 'active' | 'inactive'

export interface CreateDepartmentResponse {
  success: boolean
  message: string
  data: DepartmentData
}
export interface UpdateDepartmentResponse {
  success: boolean
  message: string
  data: DepartmentData
}
export interface DeleteDepartmentResponse {
  success: boolean
  message: string
}
export interface DepartmentData {
  id: number
  name: string
  description: string
  workspace_id: string
  created_at: string
  updated_at: string
  status: string
  workspace: Workspace
}

export interface Workspace {
  id: string
  name: string
}
