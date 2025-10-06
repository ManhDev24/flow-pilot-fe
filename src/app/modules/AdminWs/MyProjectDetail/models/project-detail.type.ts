export interface ProjectDetailData {
  id: string
  name: string
  description: string | null
  start_date: string
  end_date: string
  process: number
  team_size: number | null
  status: string
}

export interface ProjectOverviewResponse {
  project: ProjectDetailData
  totalTasks: number
  completedTasks: number
  overdueTasks: number
  inProgressTasks: number
  completionRate: number
}

export interface ProjectKPIResponse {
  projectId: string
  process: number
  completionRate: number
  completedTasks: number
  inProgressTasks: number
  kpiValue: number
}

export interface ProjectAIAnalysisResponse {
  summary: string
  totalCompleted: number
  totalDelay: number
  avgBurnout: number
  avgQuality: number
}

export interface TaskStats {
  completed: number
  incomplete: number
  overdue: number
  total: number
}

export interface TeamKPI {
  percentage: number
  value: string
  amount: string
}

export interface ProjectProgress {
  completed: number
  inProgress: number
  total: number
}

export interface ProjectMember {
  id: string
  name: string
  avatar_url: string | null
  job_title: string
  status: string
  assignedTasks: number
  completedTasks: number
  overdueTasks: number
  avgQuality: number
}

export interface AIAnalysis {
  title: string
  period: string
  summary: string
  evaluation: string
  startDate: string
  endDate: string
  teamSize: number
}
