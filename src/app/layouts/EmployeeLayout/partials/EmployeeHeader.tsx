import { NotificationDropdown } from '@/app/components/Notification'
import { SidebarTrigger } from '@/app/components/ui/sidebar'
import { PATH } from '@/app/routes/path'
import { useNavigate } from 'react-router-dom'

export function EmployeeHeader() {
  const navigate = useNavigate()
  return (
    <header className='flex h-16 shrink-0 items-center gap-2 bg-white border-b border-gray-200'>
      <div className='flex items-center gap-4 px-6'>
        <SidebarTrigger className='h-8 w-8 rounded-lg hover:bg-gray-100 transition-colors' />
        <div className='h-6 w-px bg-gray-200' />
      </div>
      <div className='ml-auto flex items-center gap-3 px-6'>
        <div className='ml-auto flex items-center gap-3 px-6'>
          <NotificationDropdown onViewAll={() => navigate(PATH.EMPLOYEE_NOTIFICATIONS)} />
        </div>
      </div>
    </header>
  )
}
