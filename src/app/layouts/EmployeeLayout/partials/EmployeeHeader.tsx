import { SidebarTrigger } from '@/app/components/ui/sidebar'
import { Bell } from 'lucide-react'

export function EmployeeHeader() {
  return (
    <header className='flex h-16 shrink-0 items-center gap-2 bg-white border-b border-gray-200'>
      <div className='flex items-center gap-4 px-6'>
        <SidebarTrigger className='h-8 w-8 rounded-lg hover:bg-gray-100 transition-colors' />
        <div className='h-6 w-px bg-gray-200' />
      </div>
      <div className='ml-auto flex items-center gap-3 px-6'>
        <button className='p-2 text-gray-400 hover:text-gray-600 transition-colors'>
          <Bell className='w-5 h-5' />
        </button>
        <img src='https://i.pravatar.cc/40?img=5' alt='User Avatar' className='w-9 h-9 rounded-full' />
      </div>
    </header>
  )
}
