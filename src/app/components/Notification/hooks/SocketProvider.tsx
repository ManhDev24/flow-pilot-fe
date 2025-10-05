import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { io, type Socket } from 'socket.io-client'
import type { SocketNotificationData, SocketUnreadCountData } from '../models'
import { NOTIFICATION_QUERY_KEYS } from '../hooks/useNotification'
import { toast } from 'react-toastify'
import { getLocalStorage } from '@/app/utils'
import type { IUserStatePayload } from '@/app/models'

const SOCKET_URL = 'https://develop.flowpilot.io.vn'

interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
  unreadCount: number
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  unreadCount: 0
})

export const useSocketContext = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocketContext must be used within SocketProvider')
  }
  return context
}

interface SocketProviderProps {
  children: ReactNode
}

export function SocketProvider({ children }: SocketProviderProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const socketRef = useRef<Socket | null>(null)
  const queryClient = useQueryClient()
  const userLocalStorage: IUserStatePayload = getLocalStorage('user')
  useEffect(() => {
    // Initialize socket connection
    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: true,
      auth: {
        token: userLocalStorage?.accessToken || ''
      }
    })

    socketRef.current = socket

    // Connection event handlers
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id)
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected')
      setIsConnected(false)
    })

    socket.on('connect_error', (error: Error) => {
      console.error('Socket connection error:', error)
      setIsConnected(false)
    })

    // Notification event handlers
    socket.on('notify:new', (data: SocketNotificationData) => {
      console.log('New notification received:', data)

      // Update the notifications list in cache
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.notifications })

      if (data.notification) {
        toast.success(`${data.notification.title}: ${data.notification.content}`)
      }
    })

    socket.on('notify:count', (data: SocketUnreadCountData) => {
      console.log('Unread count updated:', data)
      setUnreadCount(data.count)
    })

    // Cleanup on unmount
    return () => {
      if (socket.connected) {
        socket.disconnect()
      }
    }
  }, [queryClient])

  const contextValue: SocketContextType = {
    socket: socketRef.current,
    isConnected,
    unreadCount
  }

  return <SocketContext.Provider value={contextValue}>{children}</SocketContext.Provider>
}
