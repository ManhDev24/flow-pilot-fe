export interface ProjectResponse {
  success: boolean
  message: string
  data: ProjectsData
}

export interface ProjectsData {
  data: ProjectData[]
  total: number
  page: number
  limit: number
}

export interface ProjectData {
  id: string
  workspace_id: string
  name: string
  description: any
  start_date: string
  end_date: string
  process?: number
  team_size: any
  created_at: string
  updated_at: string
  manager_id: string
  status: string
  manager: Manager
}

export interface Manager {
  id: string
  name: string
  email: string
  avatar_url: any
}


// id


export interface SingleProjectResponse {
  success: boolean
  message: string
  data: SingleProjectData
}

export interface SingleProjectData {
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
  members: Member[]
}

export interface Member {
  id: number
  role: string
  user: User
}

export interface User {
  id: string
  name: string
  email: string
  avatar_url: any
  role: Role
  department: Department
}

export interface Role {
  role: string
}

export interface Department {
  id: number
  name: string
}


// create

export interface CreateProjectPayload {
  workspace_id: string
  name: string
  description: string
  start_date: string
  end_date: string
  team_size: number
  manager_id: string
  status: string
}
export interface CreateProjectResponse {
  success: boolean
  message: string
  data: CreateProjectData
}

export interface CreateProjectData {
  id: string
  workspace_id: string
  name: string
  description: string
  start_date: string
  end_date: string
  process: number
  team_size: number
  created_at: string
  updated_at: string
  manager_id: string
  status: string
}

// update
export interface UpdateProjectPayload {
  name: string
  description: string
  start_date: string
  end_date: string
  team_size: number
  manager_id: string
  status: string
}

export interface UpdateProjectResponse {
  success: boolean
  message: string
  data: UpdateProjectData
}

export interface UpdateProjectData {
  id: string
  workspace_id: string
  name: string
  description: string
  start_date: string
  end_date: string
  process: number
  team_size: number
  created_at: string
  updated_at: string
  manager_id: string
  status: string
}
