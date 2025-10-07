export interface AdminWsResponse {
  success: boolean
  message: string
  data: EmployeesData
}

export interface EmployeesData {
  items: Employee[]
  total: number
  page: number
  limit: number
}

export interface Employee {
  id: string
  name: string
  email: string
  avatar_url: string
  department_id: number
  role_id: number
  workspace_id: string
  status: string
  role: EmployeeRole
  department: EmployeeDepartment
  projectUsers?: { project?: { id: string; name: string; status?: string } }[]
}

export interface EmployeeRole {
  id: number
  role: string
}

export interface EmployeeDepartment {
  id: number
  name: string
}

export interface CreateEmployeePayload {
  name: string
  email: string
  role_id: number
  department_id?: number
}

export interface UpdateEmployeePayload {
  name: string
  email: string
  // avatar_url: string
  department_id: number
  role_id: number
}

export interface CreateEmployeeData {
  name: string
  email: string
  role: string
  jobTitle: string
  department: string
  project: string
}

export interface CreateEmployeeResponse {
  success: boolean
  message: string
  data?: Employee
}

export interface UpdateEmployeeResponse {
  success: boolean
  message: string
  data?: EmployeeUpdateData
}

export interface EmployeeUpdateData {
  id: string
  name: string
  email: string
  avatar_url: any
  department_id: any
  role_id: number
  workspace_id: string
  status: string
}

export interface DeleteEmployeeResponse {
  success: boolean
  message: string
}
