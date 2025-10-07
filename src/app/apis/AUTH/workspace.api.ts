import { fetcher } from '../fetcher'

// Package interface
export interface Package {
  id: string
  name: string
  duration_in_months: number
  price: number
  description: string
  created_at: string
  updated_at: string
  status: 'active' | 'inactive'
}

// Workspace interfaces
export interface Workspace {
  id: string
  name: string
  company_code: string | null
  company_name: string
  package_id: string
  start_date: string
  expire_date: string
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
  package?: Package
}

// Workspace list response interface
export interface WorkspaceListResponse {
  success: boolean
  message: string
  data: {
    data: Workspace[]
    total: number
    page: number
    limit: number
  }
}

// Single workspace response interface
export interface WorkspaceDetailResponse {
  success: boolean
  message: string
  data: Workspace
}

// Create workspace request interface
export interface CreateWorkspaceRequest {
  name: string
  company_code: string
  company_name: string
  package_id: string
  start_date: string
  expire_date: string
  status: 'active' | 'inactive'
}

// Update workspace request interface
export interface UpdateWorkspaceRequest {
  name: string
  company_code: string
  company_name: string
  package_id: string
  start_date: string
  expire_date: string
  status: 'active' | 'inactive'
}
// Generic API response interface
export interface ApiResponse {
  success: boolean
  message: string
}

// Pagination parameters
export interface WorkspacePaginationParams {
  page?: number
  limit?: number
}

// Workspace statistics interface
export interface WorkspaceStats {
  total_workspaces: number
  active_workspaces: number
  inactive_workspaces: number
  total_users: number
  avg_users_per_workspace: number
}

// Package interface for workspace creation
export interface Package {
  id: string
  name: string
  price: number
  max_users: number
  features: string[]
  duration_days: number
}

// Workspace API Class
export class WorkspaceAPI {
  /**
   * Get all workspaces with pagination
   * GET /workspace
   */
  static async getAllWorkspaces(params: WorkspacePaginationParams = {}): Promise<WorkspaceListResponse> {
    const { page = 1, limit = 10 } = params

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    const response = await fetcher.get(`/workspace?${queryParams.toString()}`)
    return response.data
  }

  /**
   * Get workspace by ID
   * GET /workspace/:id
   */
  static async getWorkspaceById(id: string): Promise<WorkspaceDetailResponse> {
    const response = await fetcher.get(`/workspace/${id}`)
    return response.data
  }

  /**
   * Create new workspace
   * POST /workspace/create
   */
  static async createWorkspace(workspaceData: CreateWorkspaceRequest): Promise<ApiResponse> {
    const response = await fetcher.post(`/workspace/create`, workspaceData)
    return response.data
  }

  /**
   * Update workspace
   * PUT /workspace/:id
   */
  static async updateWorkspace(id: string, workspaceData: UpdateWorkspaceRequest): Promise<ApiResponse> {
    const response = await fetcher.put(`/workspace/${id}`, workspaceData)
    return response.data
  }

  /**
   * Delete workspace
   * DELETE /workspace/delete/:id
   */
  static async deleteWorkspace(id: string): Promise<ApiResponse> {
    const response = await fetcher.delete(`/workspace/delete/${id}`)
    return response.data
  }

  /**
   * Activate workspace
   * PATCH /workspace/:id/activate
   */
  static async activateWorkspace(id: string): Promise<ApiResponse> {
    const response = await fetcher.patch(`/workspace/activate/${id}`)
    return response.data
  }
}

// Export individual functions for easier imports
export const {
  getAllWorkspaces,
  getWorkspaceById,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
  activateWorkspace,
} = WorkspaceAPI

// Default export
export default WorkspaceAPI
