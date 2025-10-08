import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { formatDistanceToNow } from 'date-fns'
import { Bell, Check, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useMarkAllAsRead, useMarkAsRead, useNotifications } from '../hooks/useNotification'
import type { INotification } from '../models'

// interface NotificationPageProps {
//   onBack: () => void
// }

export function NotificationPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const { data: notificationsData, isLoading } = useNotifications()
  const markAsReadMutation = useMarkAsRead()
  const markAllAsReadMutation = useMarkAllAsRead()

  const notifications = notificationsData?.data || []

  // Filter notifications
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.content.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterType === 'all' ||
      (filterType === 'unread' && !notification.is_read) ||
      (filterType === 'read' && notification.is_read) ||
      notification.type === filterType

    return matchesSearch && matchesFilter
  })

  const unreadNotifications = notifications.filter((n) => !n.is_read)

  const handleNotificationClick = (notification: INotification) => {
    if (!notification.is_read) {
      markAsReadMutation.mutate(notification.id)
    }
  }

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate()
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <div className='w-10 h-10 bg-red-100 rounded-full flex items-center justify-center'>🔴</div>
      case 'warning':
        return <div className='w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center'>🟡</div>
      case 'success':
        return <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center'>🟢</div>
      default:
        return <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>🔵</div>
    }
  }

  const handleMarkAsRead = (e: React.MouseEvent, notificationId: number) => {
    e.stopPropagation()
    markAsReadMutation.mutate(notificationId)
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-gray-500'>Loading notifications...</div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 '>
      <div className='container  mx-auto'>
        <div className='bg-white border-b border-gray-200 px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <Bell className='w-8 h-8 text-blue-600' />
              <div>
                <h1 className='text-2xl font-bold text-gray-900'>Notifications</h1>
                <p className='text-sm text-gray-600'>Manage your notifications and stay updated</p>
              </div>
            </div>

            {unreadNotifications.length > 0 && (
              <Button
                variant='outline'
                onClick={handleMarkAllAsRead}
                disabled={markAllAsReadMutation.isPending}
                className='text-blue-600 border-blue-600 hover:bg-blue-50'
              >
                {markAllAsReadMutation.isPending ? 'Marking...' : `Mark all read`}
              </Button>
            )}
          </div>
        </div>

        <div className='bg-white px-6 py-4 border-b border-gray-200'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
              <Input
                placeholder='Search notifications...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10'
              />
            </div>

            <div className='flex gap-2'>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className='px-3 py-2 border border-gray-300 rounded-md text-sm bg-white'
              >
                <option value='all'>All Types</option>
                <option value='info'>Info</option>
                <option value='success'>Success</option>
                <option value='warning'>Warning</option>
                <option value='error'>Error</option>
              </select>

              <select
                value={filterType === 'read' ? 'read' : filterType === 'unread' ? 'unread' : 'all'}
                onChange={(e) => setFilterType(e.target.value)}
                className='px-3 py-2 border border-gray-300 rounded-md text-sm bg-white'
              >
                <option value='all'>All Status</option>
                <option value='unread'>Unread</option>
                <option value='read'>Read</option>
              </select>
            </div>
          </div>
        </div>

        <div className=' py-6'>
          {filteredNotifications.length === 0 ? (
            <div className='text-center py-12'>
              <div className='text-gray-400 text-lg mb-2'>📭</div>
              <p className='text-gray-500'>
                {searchTerm || filterType !== 'all' ? 'No notifications match your filters' : 'No notifications yet'}
              </p>
            </div>
          ) : (
            <div className='space-y-4'>
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer group ${
                    !notification.is_read ? 'border-l-4 border-l-blue-500' : 'border-gray-200'
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className='flex items-start space-x-4'>
                    {getNotificationIcon(notification.type)}

                    <div className='flex-1 min-w-0'>
                      <div className='flex items-start justify-between'>
                        <div className='flex-1'>
                          <h3
                            className={`text-base font-medium text-gray-900 ${
                              !notification.is_read ? 'font-semibold' : ''
                            }`}
                          >
                            {notification.title}
                          </h3>
                          <p className='text-gray-600 mt-1 text-sm'>{notification.content}</p>
                        </div>

                        {/* Action buttons */}
                        <div className='flex items-center space-x-2 ml-4'>
                          {!notification.is_read && (
                            <button
                              onClick={(e) => handleMarkAsRead(e, notification.id)}
                              className='p-1.5 text-gray-400 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100'
                              title='Mark as read'
                            >
                              <Check className='w-4 h-4' />
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              // Handle delete notification if needed
                            }}
                            className='p-1.5 text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100'
                            title='Delete notification'
                          >
                            <Trash2 className='w-4 h-4' />
                          </button>
                        </div>
                      </div>

                      <div className='flex items-center justify-between mt-3'>
                        <p className='text-xs text-gray-500'>
                          {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            notification.type === 'error'
                              ? 'bg-red-100 text-red-700'
                              : notification.type === 'warning'
                                ? 'bg-yellow-100 text-yellow-700'
                                : notification.type === 'success'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {notification.type.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
