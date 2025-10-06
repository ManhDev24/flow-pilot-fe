// User role interface
export interface UserRole {
  id: number
  role: string
}

// User workspace interface
export interface UserWorkspace {
  id: string
  name: string
}

// Base user interface for API responses
export interface User {
  id: string
  name: string
  email: string
  avatar_url: string | null
  phone?: string | null
  address?: string | null
  bio?: string | null
  nickname?: string | null
  role: UserRole
  workspace: UserWorkspace
  created_at: string
  status: string
}

// User list response interface
export interface UserListResponse {
  success: boolean
  message: string
  data: {
    items: User[]
    total: number
    page: number
    limit: number
  }
}

// Single user response interface
export interface UserDetailResponse {
  success: boolean
  message: string
  data: User
}

// Create user request interface
export interface CreateUserRequest {
  name: string
  email: string
  role_id: number
  workspace_id: string
}

// Update user request interface
export interface UpdateUserRequest {
  name: string
  email: string
  avatar_url?: string
  department_id?: number
  role_id: number
  workspace_id: string
}

// Generic API response interface
export interface ApiResponse {
  success: boolean
  message: string
}

// User metrics interface
export interface UserMetrics {
  totalUsers: number
  activeUsers: number
  adminUsers: number
  newUsersToday: number
  employeeUsers: number
  managerUsers: number
}

// Pagination parameters
export interface PaginationParams {
  page: number
  limit: number
  search?: string
}

// Filter options for users
export interface UserFilters {
  role?: string
  status?: string
  workspace?: string
}

// Form data interfaces
export interface UserFormData {
  name: string
  email: string
  role_id: number
  workspace_id: string
  avatar_url?: string
  department_id?: number
}

// Table column interface
export interface UserTableColumn {
  key: string
  label: string
  sortable?: boolean
}

// User table data interface (for display)
export interface UserTableData {
  id: string
  name: string
  email: string
  avatar_url: string | null
  role: string
  workspace: string
  status: string
  created_at: string
}

// Loading states
export interface LoadingStates {
  users: boolean
  metrics: boolean
  creating: boolean
  updating: boolean
  deleting: boolean
  activating: boolean
}

// Error states
export interface ErrorStates {
  users: string | null
  metrics: string | null
  crud: string | null
}

// Modal states
export interface ModalStates {
  add: boolean
  edit: boolean
  delete: boolean
  selectedUser: User | null
}

// Legacy interface for backward compatibility
export interface UserManagement {
  id: number
  name: string
  email: string
  avatar: string
  avatarColor: string
  role: string
  status: string
  lastLogin: string
  workspace: string
}
