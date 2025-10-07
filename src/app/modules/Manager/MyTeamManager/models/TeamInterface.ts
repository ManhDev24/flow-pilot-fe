export interface ITeamMember {
  id: number
  role: string
  user: {
    id: string
    name: string
    email: string
    avatar_url: string | null
    role: {
      role: string
    }
    department: {
      id: number
      name: string
    }
  }
}

export interface IProject {
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
  status: string
  members: ITeamMember[]
}
