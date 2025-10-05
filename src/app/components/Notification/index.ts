// Hooks
export { useNotifications, useMarkAsRead, useMarkAllAsRead, NOTIFICATION_QUERY_KEYS } from './hooks/useNotification'
export { useSocket } from './hooks/useSocket'
export { SocketProvider, useSocketContext } from './hooks/SocketProvider'

// Components
export { NotificationDropdown } from './partials/NotificationDropdown'
export { NotificationPage } from './partials/NotificationPage'
export { Notification, default } from './Notification'
export { NotificationManagement } from './NotificationManagement'

// Models
export type {
  INotification,
  NotificationListResponse,
  NotificationResponse,
  SocketNotificationData,
  SocketUnreadCountData
} from './models'

// API
export { notificationApi } from '@/app/apis/AUTH/notification.api'
