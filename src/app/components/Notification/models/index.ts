export interface INotification {
  id: number
  user_id: string
  title: string
  content: string
  is_read: boolean
  created_at: string
  updated_at: string
  type: 'info' | 'warning' | 'error' | 'success'
  data: any
}

export interface NotificationListResponse {
  success: boolean
  message: string
  data: INotification[]
}

export interface NotificationResponse {
  success: boolean
  message: string
  data?: any
}

export interface SocketNotificationData {
  userId: string
  notification: INotification
}

export interface SocketUnreadCountData {
  userId: string
  count: number
}
