// Workspace Package interface
export interface WorkspacePackage {
  id: string
  name: string
  duration_in_months: number
  price: number
  description: string
  created_at: string
  updated_at: string
  status: 'active' | 'inactive'
}

// User interface for workspace users
export interface WorkspaceUser {
  id: string
  name: string
  email: string
  password: string
  avatar_url: string | null
  phone: string | null
  address: string | null
  bio: string | null
  nickname: string | null
  role_id: number
  workspace_id: string
  department_id: number
  is_first_login: boolean
  password_changed_at: string | null
  created_at: string
  updated_at: string
  status: 'active' | 'inactive'
}

// Department interface
export interface WorkspaceDepartment {
  id: number
  name: string
  description: string | null
  workspace_id: string
  created_at: string
  updated_at: string
  status: 'active' | 'inactive'
}

// Project interface
export interface WorkspaceProject {
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
  status: 'active' | 'inactive' | 'completed'
}

// Base workspace interface for API responses
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
  package?: WorkspacePackage
  users?: WorkspaceUser[]
  departments?: WorkspaceDepartment[]
  projects?: WorkspaceProject[]
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
  package_id?: string
  start_date?: string
  expire_date?: string
  status: 'active' | 'inactive'
}

// Generic API response interface
export interface ApiResponse {
  success: boolean
  message: string
  data?: any
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

// Dialog props interfaces
export interface WorkspaceDialogProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export interface EditWorkspaceDialogProps extends WorkspaceDialogProps {
  workspace: Workspace | null
}

export interface DeleteWorkspaceDialogProps extends WorkspaceDialogProps {
  workspace: Workspace | null
  loading?: boolean
  onConfirm: () => void
}

export interface ViewWorkspaceDialogProps {
  open: boolean
  onClose: () => void
  workspace: Workspace | null
}

// Form data interfaces
export interface WorkspaceFormData {
  name: string
  company_code: string
  company_name: string
  package_id: string
  start_date: string
  expire_date: string
  status: 'active' | 'inactive'
}

// Filter interfaces
export interface WorkspaceFilters {
  search: string
  status: string
  packageId: string
}

// Table column definition
export interface WorkspaceTableColumn {
  key: string
  label: string
  sortable?: boolean
  width?: string
}

export const WORKSPACE_STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
] as const

export const WORKSPACE_TABLE_COLUMNS: WorkspaceTableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'company_code', label: 'Company Code' },
  { key: 'company_name', label: 'Company Name', sortable: true },
  { key: 'package', label: 'Package' },
  { key: 'start_date', label: 'Start Date', sortable: true },
  { key: 'expire_date', label: 'Expire Date', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions', width: '150px' }
]