import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { notificationApi } from '@/app/apis/AUTH/notification.api'
import { toast } from 'react-toastify'
import type { NotificationResponse } from '../models'

export const NOTIFICATION_QUERY_KEYS = {
  notifications: ['notifications'] as const,
  unreadCount: ['notifications', 'unread-count'] as const
}

// Hook to get notifications
export const useNotifications = () => {
  return useQuery({
    queryKey: NOTIFICATION_QUERY_KEYS.notifications,
    queryFn: notificationApi.getNotifications,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true
  })
}

// Hook to mark notification as read
export const useMarkAsRead = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (notificationId: number) => notificationApi.markAsRead(notificationId),
    onSuccess: (data: NotificationResponse) => {
      if (data.success) {
        // Invalidate and refetch notifications
        queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.notifications })
        toast.success('Notification marked as read')
      }
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to mark notification as read'
      toast.error(message)
    }
  })
}

// Hook to mark all notifications as read
export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => notificationApi.markAllAsRead(),
    onSuccess: (data: NotificationResponse) => {
      if (data.success) {
        // Invalidate and refetch notifications
        queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.notifications })
        toast.success('All notifications marked as read')
      }
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to mark all notifications as read'
      toast.error(message)
    }
  })
}
