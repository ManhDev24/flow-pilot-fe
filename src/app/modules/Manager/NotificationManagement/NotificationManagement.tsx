import { NotificationPage } from '@/app/components/Notification/partials/NotificationPage'
import { useNavigate } from 'react-router-dom'

function NotificationManagement() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1) // Go back to previous page
  }

  return <NotificationPage onBack={handleBack} />
}

export default NotificationManagement
