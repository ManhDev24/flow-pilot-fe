export const TaskStatus = {
  todo: 'todo',
  doing: 'doing',
  reviewing: 'reviewing',
  rejected: 'rejected',
  completed: 'completed',
  feedbacked: 'feedbacked',
  overdued: 'overdued'
} as const

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus]

export const TaskPriority = {
  low: 'low',
  medium: 'medium',
  high: 'high'
} as const

export type TaskPriority = (typeof TaskPriority)[keyof typeof TaskPriority]

export const ContentType = {
  comment: 'comment',
  note: 'note'
} as const

export type ContentType = (typeof ContentType)[keyof typeof ContentType]

export interface MyTaskResponse {
  success: boolean
  message: string
  data: MyTask[]
}

export interface MyTask {
  id: string
  project_id: string
  name: string
  description: any
  time_spent_in_minutes: any
  image_url: any
  start_at: string
  due_at: string
  completed_at: any
  created_at: string
  updated_at: string
  status: 'todo' | 'doing' | 'reviewing' | 'rejected' | 'completed' | 'feedbacked' | 'overdued'
  priority: 'low' | 'medium' | 'high'
  contents: Content[]
  checklists: Checklist[]
  files: any[]
  reviews: any[]
  assignees: Assignee[]
  _count: Count
}

export interface Content {
  id: number
  task_id: string
  user_id: string
  content: string
  created_at: string
  updated_at: string
  type: ContentType
  status: 'active' | 'inactive'
  user: User
}

export interface Checklist {
  id: number
  task_id: string
  title: string
  status: 'active' | 'inactive'
  is_completed: boolean
  completed_at: any
  created_at: string
  updated_at: string
}

export interface Assignee {
  id: number
  task_id: string
  user_id: string
  assigned_at: string
  user: User
}

export interface User {
  id: string
  name: string
  email: string
  avatar_url: any
}

export interface Count {
  files: number
  reviews: number
}

export interface FileByTaskRes {
  success: boolean
  message: string
  data: FileByTask[]
}

export interface FileByTask {
  id: number
  task_id: string
  file_name: string
  file_url: string
  file_size: number
  mime_type: string
  uploaded_at: string
  uploaded_by: string
  created_at: string
  updated_at: string
}
