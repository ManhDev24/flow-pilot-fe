import { fetcher } from '../fetcher'

// Role interfaces
export interface Role {
  id: number
  role: string
  created_at: string
  updated_at: string
}

// Role list response interface
export interface RoleListResponse {
  success: boolean
  message: string
  data: {
    data: Role[]
    meta: {
      page: number
      limit: number
      total: number
      totalPages: number
    }
  }
}

// Single role response interface
export interface RoleDetailResponse {
  success: boolean
  message: string
  data: Role
}

// Create role request interface
export interface CreateRoleRequest {
  name: string
  description?: string
  permissions?: string[]
}

// Update role request interface
export interface UpdateRoleRequest {
  name?: string
  description?: string
  permissions?: string[]
  status?: 'active' | 'inactive'
}

// Generic API response interface
export interface ApiResponse {
  success: boolean
  message: string
}

// Pagination parameters
export interface RolePaginationParams {
  page?: number
  pageSize?: number
  search?: string
  status?: 'active' | 'inactive' | 'all'
}

// Role API Class
export class RoleAPI {
  private static readonly BASE_URL = '/system-role'

  /**
   * Get all roles with pagination
   * GET /system-role?page=1&pageSize=10
   */
  static async getAllRoles(params: RolePaginationParams = {}): Promise<RoleListResponse> {
    const { page = 1, pageSize = 10 } = params
    
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: pageSize.toString()
    })

    const response = await fetcher.get(`${this.BASE_URL}?${queryParams.toString()}`)
    return response.data
  }

  /**
   * Get role by ID
   * GET /system-role/:id
   */
  static async getRoleById(id: number): Promise<RoleDetailResponse> {
    const response = await fetcher.get(`${this.BASE_URL}/${id}`)
    return response.data
  }

  /**
   * Create new role
   * POST /system-role
   */
  static async createRole(roleData: CreateRoleRequest): Promise<ApiResponse> {
    const response = await fetcher.post(this.BASE_URL, roleData)
    return response.data
  }

  /**
   * Update role
   * PUT /system-role/:id
   */
  static async updateRole(id: number, roleData: UpdateRoleRequest): Promise<ApiResponse> {
    const response = await fetcher.put(`${this.BASE_URL}/${id}`, roleData)
    return response.data
  }

  /**
   * Delete role
   * DELETE /system-role/:id
   */
  static async deleteRole(id: number): Promise<ApiResponse> {
    const response = await fetcher.delete(`${this.BASE_URL}/${id}`)
    return response.data
  }

  /**
   * Activate role
   * PATCH /system-role/:id/activate
   */
  static async activateRole(id: number): Promise<ApiResponse> {
    const response = await fetcher.patch(`${this.BASE_URL}/${id}/activate`)
    return response.data
  }

  /**
   * Deactivate role
   * PATCH /system-role/:id/deactivate
   */
  static async deactivateRole(id: number): Promise<ApiResponse> {
    const response = await fetcher.patch(`${this.BASE_URL}/${id}/deactivate`)
    return response.data
  }

  /**
   * Get role permissions
   * GET /system-role/:id/permissions
   */
  static async getRolePermissions(id: number): Promise<{
    success: boolean
    message: string
    data: { permissions: string[] }
  }> {
    const response = await fetcher.get(`${this.BASE_URL}/${id}/permissions`)
    return response.data
  }

  /**
   * Update role permissions
   * PUT /system-role/:id/permissions
   */
  static async updateRolePermissions(id: number, permissions: string[]): Promise<ApiResponse> {
    const response = await fetcher.put(`${this.BASE_URL}/${id}/permissions`, { permissions })
    return response.data
  }

  /**
   * Get all available permissions in the system
   * GET /system-role/available-permissions
   */
  static async getAvailablePermissions(): Promise<{
    success: boolean
    message: string
    data: {
      permissions: Array<{
        id: string
        name: string
        description?: string
        category: string
      }>
    }
  }> {
    const response = await fetcher.get(`${this.BASE_URL}/available-permissions`)
    return response.data
  }

  /**
   * Bulk update roles
   * PATCH /system-role/bulk-update
   */
  static async bulkUpdateRoles(updates: Array<{
    id: number
    data: UpdateRoleRequest
  }>): Promise<ApiResponse> {
    const response = await fetcher.patch(`${this.BASE_URL}/bulk-update`, { updates })
    return response.data
  }

  /**
   * Clone role
   * POST /system-role/:id/clone
   */
  static async cloneRole(id: number, newName: string): Promise<ApiResponse> {
    const response = await fetcher.post(`${this.BASE_URL}/${id}/clone`, { name: newName })
    return response.data
  }
}

// Export individual functions for easier imports
export const {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  activateRole,
  deactivateRole,
  getRolePermissions,
  updateRolePermissions,
  getAvailablePermissions,
  bulkUpdateRoles,
  cloneRole
} = RoleAPI

// Default export
export default RoleAPI
