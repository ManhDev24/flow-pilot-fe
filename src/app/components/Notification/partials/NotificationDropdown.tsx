import { useState, useEffect, useRef } from 'react'
import { Bell, Check, Trash2 } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { useNotifications, useMarkAsRead, useMarkAllAsRead } from '../hooks/useNotification'
import { useSocket } from '../hooks/useSocket'
import { formatDistanceToNow } from 'date-fns'
import type { INotification } from '../models'

interface NotificationDropdownProps {
  onViewAll: () => void
}

export function NotificationDropdown({ onViewAll }: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { data: notificationsData, isLoading } = useNotifications()
  const markAsReadMutation = useMarkAsRead()
  const markAllAsReadMutation = useMarkAllAsRead()
  const { unreadCount } = useSocket()

  const notifications = notificationsData?.data || []
  const unreadNotifications = notifications.filter((n) => !n.is_read)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

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
        return <div className='w-8 h-8 bg-red-100 rounded-full flex items-center justify-center'>🔴</div>
      case 'warning':
        return <div className='w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center'>🟡</div>
      case 'success':
        return <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>🟢</div>
      default:
        return <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>🔵</div>
    }
  }

  const handleMarkAsRead = (e: React.MouseEvent, notificationId: number) => {
    e.stopPropagation()
    markAsReadMutation.mutate(notificationId)
  }

  return (
    <div className='relative' ref={dropdownRef}>
      {/* Bell Button */}
      <button
        className='p-2 text-gray-400 hover:text-gray-600 transition-colors relative'
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className='w-5 h-5' />
        {(unreadCount > 0 || unreadNotifications.length > 0) && (
          <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
            {unreadCount || unreadNotifications.length}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className='absolute right-0 top-full mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-hidden'>
          {/* Header */}
          <div className='p-4 border-b border-gray-100 flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <h3 className='font-semibold text-gray-900'>Notifications</h3>
              {unreadNotifications.length > 0 && (
                <span className='bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full'>
                  {unreadNotifications.length} unread
                </span>
              )}
            </div>
            {unreadNotifications.length > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                disabled={markAllAsReadMutation.isPending}
                className='text-blue-600 hover:text-blue-800 text-sm font-medium'
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className='max-h-64 overflow-y-auto'>
            {isLoading ? (
              <div className='p-4 text-center text-gray-500'>Loading...</div>
            ) : notifications.length === 0 ? (
              <div className='p-4 text-center text-gray-500'>No notifications</div>
            ) : (
              <>
                {notifications.slice(0, 4).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors relative group ${
                      !notification.is_read ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className='flex items-start space-x-3'>
                      {getNotificationIcon(notification.type)}

                      <div className='flex-1 min-w-0'>
                        <div className='flex items-start justify-between'>
                          <div className='flex-1'>
                            <p
                              className={`text-sm font-medium text-gray-900 ${!notification.is_read ? 'font-semibold' : ''}`}
                            >
                              {notification.title}
                            </p>
                            <p className='text-sm text-gray-600 mt-1 line-clamp-2'>{notification.content}</p>
                          </div>

                          {/* Action buttons */}
                          <div className='flex items-center space-x-2 ml-2'>
                            {!notification.is_read && (
                              <button
                                onClick={(e) => handleMarkAsRead(e, notification.id)}
                                className='p-1 text-gray-400 hover:text-blue-600 transition-colors'
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
                              className='p-1 text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100'
                              title='Delete notification'
                            >
                              <Trash2 className='w-4 h-4' />
                            </button>
                          </div>
                        </div>

                        <div className='flex items-center justify-between mt-2'>
                          <p className='text-xs text-gray-400'>
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

                      {!notification.is_read && <div className='w-2 h-2 bg-blue-500 rounded-full'></div>}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer */}
          <div className='p-3 border-t border-gray-100'>
            <Button
              variant='ghost'
              className='w-full text-blue-600 hover:text-blue-800 hover:bg-blue-50'
              onClick={() => {
                onViewAll()
                setIsOpen(false)
              }}
            >
              View all notifications
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
