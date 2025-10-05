import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider
} from '@/app/components/ui/sidebar'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, Settings, FileText } from 'lucide-react'
import logoFlowpilot from '@/app/assets/LogoFlowPilot.png'
import { NotificationDropdown } from '@/app/components/Notification/partials/NotificationDropdown'

import type { ReactNode } from 'react'
import { PATH } from '@/app/routes/path'

function ManagerLayout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const navigationItems = [
    { icon: LayoutDashboard, label: 'Project reports', to: `${PATH.EMPLOYEE_MANAGE_PROJECTS}` },
    { icon: Users, label: 'Kanban', to: `${PATH.EMPLOYEE_MANAGE_KANBAN}` },
    { icon: Settings, label: 'My team', to: `${PATH.EMPLOYEE_MANAGE_MY_TEAM}` },
    { icon: FileText, label: 'My Files', to: `${PATH.EMPLOYEE_MANAGE_MY_FILES}` }
  ]

  return (
    <SidebarProvider>
      <div className='flex h-screen w-full'>
        <Sidebar className='w-64 border-r border-gray-200'>
          <SidebarContent className='p-4 mt-12'>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <Link to={item.to} className='w-full block' tabIndex={-1}>
                    <SidebarMenuButton
                      isActive={location.pathname.startsWith(item.to)}
                      className='w-full justify-start text-base py-3'
                    >
                      <item.icon className='w-6 h-6 mr-2' />
                      <span className='text-base font-medium'>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        {/* Main content area */}
        <div className='flex-1 flex flex-col w-full'>
          {/* Header full width */}
          <header className='fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex justify-between items-center px-6 z-50'>
            <div className='flex items-center'>
              <img src={logoFlowpilot} alt='FlowPilot Logo' className='h-16 w-auto' />
            </div>

            <div className='flex items-center space-x-4'>
              <NotificationDropdown onViewAll={() => navigate(PATH.EMPLOYEE_MANAGE_NOTIFICATIONS)} />
              <img src='https://i.pravatar.cc/40?img=5' alt='User Avatar' className='w-9 h-9 rounded-full' />
            </div>
          </header>

          <main className='flex-1 overflow-auto pt-14'>
            <SidebarInset className='p-0'>{children}</SidebarInset>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default ManagerLayout
