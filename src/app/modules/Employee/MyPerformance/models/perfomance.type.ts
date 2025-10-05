export interface PerformanceResponse {
  success: boolean
  message: string
  data: Performance
}

export interface Performance {
  todayTasks: number
  completionRate: number
  overdueTasks: number
  focusHours: number
}
