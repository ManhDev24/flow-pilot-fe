import { useState } from 'react'
import { NotificationDropdown } from './partials/NotificationDropdown'
import { NotificationPage } from './partials/NotificationPage'
import { useSocket } from './hooks/useSocket'

interface NotificationProps {
  showFullPage?: boolean
  onToggleView?: () => void
}

export function Notification({ showFullPage = false, onToggleView }: NotificationProps) {
  const [isFullPageView, setIsFullPageView] = useState(showFullPage)

  // Initialize socket connection
  useSocket()

  const handleViewAll = () => {
    setIsFullPageView(true)
    onToggleView?.()
  }

  const handleBack = () => {
    setIsFullPageView(false)
    onToggleView?.()
  }

  if (isFullPageView) {
    return <NotificationPage onBack={handleBack} />
  }

  return <NotificationDropdown onViewAll={handleViewAll} />
}

export { NotificationDropdown, NotificationPage }
export default Notification
