import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger
} from '@/app/components/ui/sidebar'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Briefcase, Settings, FileText, Bell, LogOut, User } from 'lucide-react'
import logoFlowpilot from '@/app/assets/LogoFlowPilot.png'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/app/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import { ChevronDown } from 'lucide-react'

import type { ReactNode } from 'react'
import { PATH } from '@/app/routes/path'

// Header Component
function EmployeeHeader() {
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

// Sidebar Component
function EmployeeSidebar() {
  const location = useLocation()
  const navigationItems = [
    { icon: LayoutDashboard, label: 'My Tasks', to: `${PATH.EMPLOYEE_MY_TASKS}` },
    { icon: Users, label: 'Kanban', to: `${PATH.EMPLOYEE_KANBAN}` },
    { icon: Briefcase, label: 'My Team', to: `${PATH.EMPLOYEE_MY_TEAM}` },
    { icon: Settings, label: 'My performance', to: `${PATH.EMPLOYEE_MY_PERFORMANCE}` },
    { icon: FileText, label: 'My Files', to: `${PATH.EMPLOYEE_MY_FILES}` }
  ]

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='bg-white'>
        <div className='flex items-center gap-2 px-3 py-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-3'>
          <img src={logoFlowpilot} alt='FlowPilot Logo' className='h-10 w-auto' />
          <span className='truncate font-bold text-gray-900 text-lg group-data-[collapsible=icon]:hidden'>
            FlowPilot
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className='custom-scrollbar overflow-y-auto bg-white'>
        <SidebarMenu className='space-y-1 p-2'>
          {navigationItems.map((item) => {
            const isActive = location.pathname.startsWith(item.to)
            return (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className='group relative hover:text-white h-12 rounded-xl transition-all duration-200 hover:bg-gradient-to-r hover:bg-purple-500 hover:shadow-sm  data-[active=true]:bg-purple-600 data-[active=true]:text-white data-[active=true]:shadow-lg group-data-[collapsible=icon]:justify-center'
                  tooltip={item.label}
                >
                  <Link
                    to={item.to}
                    className='flex items-center gap-3 px-3 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center'
                  >
                    <div className='relative flex items-center justify-center'>
                      <item.icon className='h-5 w-5 transition-transform' />
                    </div>
                    <span className='font-medium group-data-[collapsible=icon]:hidden'>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className='border-t border-gray-200 bg-white p-2'>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size='lg'
                  className='group h-14 rounded-xl bg-white shadow-sm border border-gray-200 hover:bg-gradient-to-r hover:bg-gray-50 hover:shadow-md transition-all duration-200 data-[state=open]:bg-gradient-to-r data-[state=open]:bg-gray-100 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center'
                >
                  <Avatar className='h-9 w-9 rounded-xl border-2 border-gray-300 transition-all duration-300'>
                    <AvatarImage src='https://i.pravatar.cc/40?img=5' alt='User' />
                    <AvatarFallback className='rounded-xl bg-blue-500 text-white font-semibold text-sm'>
                      U
                    </AvatarFallback>
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden'>
                    <span className='truncate font-semibold text-gray-900'>Employee Name</span>
                    <span className='truncate text-xs text-gray-600'>employee@company.com</span>
                  </div>
                  <ChevronDown className='ml-auto size-4 text-gray-500 group-data-[collapsible=icon]:hidden' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl border-gray-200 shadow-lg'
                side='bottom'
                align='end'
                sideOffset={4}
              >
                <div className='flex items-center justify-start gap-2 p-3 bg-gradient-to-r from-gray-50 to-gray-100'>
                  <Avatar className='h-8 w-8 rounded-lg'>
                    <AvatarImage src='https://i.pravatar.cc/40?img=5' alt='User' />
                    <AvatarFallback className='rounded-xl bg-blue-500 text-white font-semibold text-sm'>
                      U
                    </AvatarFallback>
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-semibold text-gray-900'>Employee Name</span>
                    <span className='truncate text-xs text-gray-600'>employee@company.com</span>
                  </div>
                </div>
                <DropdownMenuSeparator className='bg-gray-200' />
                <DropdownMenuItem className='rounded-lg mx-1 my-1 hover:bg-gray-50'>
                  <User className='mr-3 h-4 w-4 text-gray-500' />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className='bg-gray-200' />
                <DropdownMenuItem className='rounded-lg mx-1 cursor-pointer my-1 hover:bg-red-50 hover:text-red-600'>
                  <LogOut className='mr-3 h-4 w-4 text-red-500' />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function EmployeeLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <EmployeeSidebar />
      <SidebarInset>
        <EmployeeHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default EmployeeLayout
