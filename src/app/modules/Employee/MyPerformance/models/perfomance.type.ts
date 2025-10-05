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

export interface FocusLogResponse {
  success: boolean
  message: string
  data: FocusLog[]
}

export interface FocusLog {
  date: string
  total_focused_minutes: number
  notes: string[]
  items: Item[]
}

export interface Item {
  id: number
  user_id: string
  focused_minutes: number
  note?: string
  created_at: string
  updated_at: string
}
