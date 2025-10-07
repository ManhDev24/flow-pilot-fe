import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Loader2, Bell, Check } from 'lucide-react'
import { useNotifications, useMarkAsRead, useMarkAllAsRead } from '@/app/components/Notification/hooks/useNotification'
import { useSocket } from '@/app/components/Notification/hooks/useSocket'
import type { INotification } from '@/app/components/Notification/models'

const getNotificationIcon = (type: string, isRead: boolean) => {
  const baseClasses = `w-2 h-2 rounded-full mt-2`

  if (isRead) {
    return `${baseClasses} bg-gray-400`
  }

  switch (type) {
    case 'success':
      return `${baseClasses} bg-green-500`
    case 'warning':
      return `${baseClasses} bg-yellow-500`
    case 'error':
      return `${baseClasses} bg-red-500`
    case 'info':
    default:
      return `${baseClasses} bg-blue-500`
  }
}

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  }

  return date.toLocaleDateString()
}

export function PersonalNotifications() {
  const { data: notificationsData, isLoading, error, refetch } = useNotifications()
  const markAsReadMutation = useMarkAsRead()
  const markAllAsReadMutation = useMarkAllAsRead()
  const { isConnected, unreadCount } = useSocket()

  const notifications = notificationsData?.data || []
  const unreadNotifications = notifications.filter((n) => !n.is_read)

  const handleMarkAsRead = (notificationId: number) => {
    markAsReadMutation.mutate(notificationId)
  }

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate()
  }

  if (isLoading) {
    return (
      <Card className='mt-6'>
        <CardHeader>
          <CardTitle className='text-lg flex items-center gap-2'>
            <Bell className='w-5 h-5' />
            Personal Notifications
          </CardTitle>
          <p className='text-sm text-gray-500'>Your latest updates and alerts.</p>
        </CardHeader>
        <CardContent className='flex items-center justify-center py-8'>
          <Loader2 className='w-6 h-6 animate-spin text-blue-600' />
          <span className='ml-2 text-sm text-gray-600'>Loading notifications...</span>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className='mt-6'>
        <CardHeader>
          <CardTitle className='text-lg flex items-center gap-2'>
            <Bell className='w-5 h-5' />
            Personal Notifications
          </CardTitle>
          <p className='text-sm text-gray-500'>Your latest updates and alerts.</p>
        </CardHeader>
        <CardContent className='text-center py-8'>
          <p className='text-sm text-red-600 mb-4'>Failed to load notifications</p>
          <Button variant='outline' size='sm' onClick={() => refetch()}>
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className='mt-6'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='text-lg flex items-center gap-2'>
              <Bell className='w-5 h-5' />
              Personal Notifications
              {unreadCount > 0 && (
                <span className='bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[1.25rem] text-center'>
                  {unreadCount}
                </span>
              )}
            </CardTitle>
            <p className='text-sm text-gray-500 flex items-center gap-2'>
              Your latest updates and alerts.
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span className='text-xs'>{isConnected ? 'Connected' : 'Disconnected'}</span>
            </p>
          </div>
          {unreadNotifications.length > 0 && (
            <Button
              variant='outline'
              size='sm'
              onClick={handleMarkAllAsRead}
              disabled={markAllAsReadMutation.isPending}
              className='flex items-center gap-2'
            >
              <Check className='w-4 h-4' />
              Mark All Read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className='space-y-4 max-h-96 overflow-y-auto'>
        {notifications.length === 0 ? (
          <div className='text-center py-8'>
            <Bell className='w-12 h-12 text-gray-400 mx-auto mb-4' />
            <p className='text-sm text-gray-500'>No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification: INotification) => (
            <div
              key={notification.id}
              className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                !notification.is_read ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
              }`}
            >
              <div className={getNotificationIcon(notification.type, notification.is_read)}></div>
              <div className='flex-1 min-w-0'>
                <div className='flex items-start justify-between gap-2'>
                  <div className='flex-1'>
                    <p className={`text-sm font-medium ${notification.is_read ? 'text-gray-600' : 'text-gray-900'}`}>
                      {notification.title}
                    </p>
                    <p className={`text-sm ${notification.is_read ? 'text-gray-500' : 'text-gray-700'}`}>
                      {notification.content}
                    </p>
                    <p className='text-xs text-gray-500 mt-1'>{formatTimeAgo(notification.created_at)}</p>
                  </div>
                  {!notification.is_read && (
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleMarkAsRead(notification.id)}
                      disabled={markAsReadMutation.isPending}
                      className='flex-shrink-0 h-8 w-8 p-0'
                    >
                      <Check className='w-4 h-4' />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
