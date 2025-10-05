import { fetcher } from '../fetcher'
import type { NotificationListResponse, NotificationResponse } from '@/app/components/Notification/models'

export const notificationApi = {
  // Get notifications for current user
  getNotifications: async (): Promise<NotificationListResponse> => {
    const response = await fetcher.get('/notification/me')
    return response.data
  },

  // Mark specific notification as read
  markAsRead: async (notificationId: number): Promise<NotificationResponse> => {
    const response = await fetcher.patch(`/notification/mark-as-read/${notificationId}`)
    return response.data
  },

  // Mark all notifications as read
  markAllAsRead: async (): Promise<NotificationResponse> => {
    const response = await fetcher.patch('/notification/mark-all-as-read')
    return response.data
  }
}
