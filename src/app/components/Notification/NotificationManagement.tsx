import { NotificationPage } from './partials/NotificationPage'

export function NotificationManagement() {
  const handleBack = () => {
    // Navigate back or close
    window.history.back()
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <NotificationPage onBack={handleBack} />
    </div>
  )
}

export default NotificationManagement
