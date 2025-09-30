export interface AdminWsResponse {
  success: boolean
  message: string
  data: AdminWsData
}

export interface AdminWsData {
  items: AdminWsItem[]
  total: number
  page: number
  limit: number
}

export interface AdminWsItem {
  id: string
  name: string
  email: string
  avatar_url: string
  department_id?: number
  role_id: number
  workspace_id: string
  status: string
}
