import { useSocketContext } from './SocketProvider'
import type { INotification } from '../models'

export const useSocket = () => {
  const { socket, isConnected, unreadCount } = useSocketContext()

  const emitNewNotification = (userId: string, notification: INotification) => {
    if (socket?.connected) {
      socket.emit('notify:new', { userId, notification })
    }
  }

  const emitUnreadCount = (userId: string, count: number) => {
    if (socket?.connected) {
      socket.emit('notify:count', { userId, count })
    }
  }

  return {
    socket,
    isConnected,
    unreadCount,
    emitNewNotification,
    emitUnreadCount
  }
}
