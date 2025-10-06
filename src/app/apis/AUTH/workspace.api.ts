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
  status: 'active' | 'inactive' | 'suspended'
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
  status: 'active' | 'inactive'
}

// Update workspace request interface
export interface UpdateWorkspaceRequest {
  name: string
  company_code: string
  company_name: string
  status: 'active' | 'inactive' | 'suspended'
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
  search?: string
  status?: 'active' | 'inactive' | 'suspended' | 'all'
  package_id?: string
}

// Workspace statistics interface
export interface WorkspaceStats {
  total_workspaces: number
  active_workspaces: number
  inactive_workspaces: number
  suspended_workspaces: number
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
  private static readonly BASE_URL = '/workspace'

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

    const response = await fetcher.get(`${this.BASE_URL}?${queryParams.toString()}`)
    return response.data
  }

  /**
   * Get workspace by ID
   * GET /workspace/:id
   */
  static async getWorkspaceById(id: string): Promise<WorkspaceDetailResponse> {
    const response = await fetcher.get(`${this.BASE_URL}/${id}`)
    return response.data
  }

  /**
   * Create new workspace
   * POST /workspace/create
   */
  static async createWorkspace(workspaceData: CreateWorkspaceRequest): Promise<ApiResponse> {
    const response = await fetcher.post(`${this.BASE_URL}/create`, workspaceData)
    return response.data
  }

  /**
   * Update workspace
   * PUT /workspace/:id
   */
  static async updateWorkspace(id: string, workspaceData: UpdateWorkspaceRequest): Promise<ApiResponse> {
    const response = await fetcher.put(`${this.BASE_URL}/${id}`, workspaceData)
    return response.data
  }

  /**
   * Delete workspace
   * DELETE /workspace/delete/:id
   */
  static async deleteWorkspace(id: string): Promise<ApiResponse> {
    const response = await fetcher.delete(`${this.BASE_URL}/delete/${id}`)
    return response.data
  }

  /**
   * Activate workspace
   * PATCH /workspace/:id/activate
   */
  static async activateWorkspace(id: string): Promise<ApiResponse> {
    const response = await fetcher.patch(`${this.BASE_URL}/${id}/activate`)
    return response.data
  }

  /**
   * Deactivate workspace
   * PATCH /workspace/:id/deactivate
   */
  static async deactivateWorkspace(id: string): Promise<ApiResponse> {
    const response = await fetcher.patch(`${this.BASE_URL}/${id}/deactivate`)
    return response.data
  }

  /**
   * Suspend workspace
   * PATCH /workspace/:id/suspend
   */
  static async suspendWorkspace(id: string): Promise<ApiResponse> {
    const response = await fetcher.patch(`${this.BASE_URL}/${id}/suspend`)
    return response.data
  }

  /**
   * Get workspace statistics
   * GET /workspace/stats
   */
  static async getWorkspaceStats(): Promise<{
    success: boolean
    message: string
    data: WorkspaceStats
  }> {
    const response = await fetcher.get(`${this.BASE_URL}/stats`)
    return response.data
  }

  /**
   * Get workspace users
   * GET /workspace/:id/users
   */
  static async getWorkspaceUsers(id: string, params: {
    page?: number
    limit?: number
    role?: string
  } = {}): Promise<{
    success: boolean
    message: string
    data: {
      items: Array<{
        id: string
        name: string
        email: string
        role: {
          id: number
          role: string
        }
        status: string
        created_at: string
      }>
      total: number
      page: number
      limit: number
    }
  }> {
    const { page = 1, limit = 10, role } = params
    
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    if (role) {
      queryParams.append('role', role)
    }

    const response = await fetcher.get(`${this.BASE_URL}/${id}/users?${queryParams.toString()}`)
    return response.data
  }

  /**
   * Get available packages for workspace creation
   * GET /workspace/packages
   */
  static async getAvailablePackages(): Promise<{
    success: boolean
    message: string
    data: {
      packages: Package[]
    }
  }> {
    const response = await fetcher.get(`${this.BASE_URL}/packages`)
    return response.data
  }

  /**
   * Update workspace package
   * PUT /workspace/:id/package
   */
  static async updateWorkspacePackage(id: string, package_id: string): Promise<ApiResponse> {
    const response = await fetcher.put(`${this.BASE_URL}/${id}/package`, { package_id })
    return response.data
  }

  /**
   * Extend workspace subscription
   * POST /workspace/:id/extend
   */
  static async extendWorkspace(id: string, extension_days: number): Promise<ApiResponse> {
    const response = await fetcher.post(`${this.BASE_URL}/${id}/extend`, { extension_days })
    return response.data
  }

  /**
   * Get workspace activity logs
   * GET /workspace/:id/activity
   */
  static async getWorkspaceActivity(id: string, params: {
    page?: number
    limit?: number
    date_from?: string
    date_to?: string
  } = {}): Promise<{
    success: boolean
    message: string
    data: {
      items: Array<{
        id: string
        action: string
        user_name: string
        description: string
        created_at: string
      }>
      total: number
      page: number
      limit: number
    }
  }> {
    const { page = 1, limit = 10, date_from, date_to } = params
    
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    if (date_from) {
      queryParams.append('date_from', date_from)
    }

    if (date_to) {
      queryParams.append('date_to', date_to)
    }

    const response = await fetcher.get(`${this.BASE_URL}/${id}/activity?${queryParams.toString()}`)
    return response.data
  }

  /**
   * Bulk update workspaces
   * PATCH /workspace/bulk-update
   */
  static async bulkUpdateWorkspaces(updates: Array<{
    id: string
    data: Partial<UpdateWorkspaceRequest>
  }>): Promise<ApiResponse> {
    const response = await fetcher.patch(`${this.BASE_URL}/bulk-update`, { updates })
    return response.data
  }

  /**
   * Export workspaces data
   * GET /workspace/export
   */
  static async exportWorkspaces(format: 'csv' | 'xlsx' = 'csv', filters: WorkspacePaginationParams = {}): Promise<Blob> {
    const queryParams = new URLSearchParams({ format })
    
    if (filters.status && filters.status !== 'all') {
      queryParams.append('status', filters.status)
    }
    if (filters.package_id) {
      queryParams.append('package_id', filters.package_id)
    }
    if (filters.search) {
      queryParams.append('search', filters.search)
    }

    const response = await fetcher.get(`${this.BASE_URL}/export?${queryParams.toString()}`, {
      responseType: 'blob'
    })
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
  deactivateWorkspace,
  suspendWorkspace,
  getWorkspaceStats,
  getWorkspaceUsers,
  getAvailablePackages,
  updateWorkspacePackage,
  extendWorkspace,
  getWorkspaceActivity,
  bulkUpdateWorkspaces,
  exportWorkspaces
} = WorkspaceAPI

// Default export
export default WorkspaceAPI
