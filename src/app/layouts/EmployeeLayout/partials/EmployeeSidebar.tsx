import logoFlowpilot from '@/app/assets/LogoFlowPilot.png'
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/app/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/app/components/ui/sidebar'
import { Briefcase, ChartPie, ChevronDown, FileText, LayoutDashboard, LogOut, Users } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

import { authApi } from '@/app/apis/AUTH/Auth.api'
import { PATH } from '@/app/routes/path'
import { useSelector } from 'react-redux'
import type { IProfileState } from '@/app/models'

export function EmployeeSidebar() {
  const location = useLocation()
  const userProfile = useSelector((state: { profile: IProfileState }) => state.profile.currentProfile)

  const handleLogout = async () => {
    try {
      await authApi.logout()
      // Redirect to login page or handle post-logout logic
      window.location.href = PATH.LOGIN
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const navigationItems = [
    { icon: LayoutDashboard, label: 'My Tasks', to: `${PATH.EMPLOYEE_MY_TASKS}` },
    { icon: Briefcase, label: 'Kanban', to: `${PATH.EMPLOYEE_KANBAN}` },
    { icon: Users, label: 'My Team', to: `${PATH.EMPLOYEE_MY_TEAM}` },
    { icon: ChartPie, label: 'My performance', to: `${PATH.EMPLOYEE_MY_PERFORMANCE}` },
    { icon: FileText, label: 'My Files', to: `${PATH.EMPLOYEE_MY_FILES}` }
  ]

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='bg-white'>
        <div className='flex items-center gap-2 px-3 py-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-3'>
          <img src={logoFlowpilot} alt='FlowPilot Logo' className='h-10 w-auto' />
          <span className='truncate font-bold text-gray-900 text-lg group-data-[collapsible=icon]:hidden'>
            FLOWPILOT
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
                    {userProfile?.avatar_url ? (
                      <img
                        src={userProfile.avatar_url}
                        alt={userProfile.name || 'Avatar'}
                        className='h-9 w-9 rounded-xl object-cover'
                      />
                    ) : (
                      <AvatarFallback className='rounded-xl bg-red-500 text-white font-semibold text-sm'>
                        {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'EM'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden'>
                    <span className='truncate font-semibold text-gray-900'>{userProfile?.name || 'Employee'}</span>
                    <span className='truncate text-xs text-gray-600'>
                      {userProfile?.email || 'employee@flowpilot.io.vn'}
                    </span>
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
                    {userProfile?.avatar_url ? (
                      <img
                        src={userProfile.avatar_url}
                        alt={userProfile.name || 'Avatar'}
                        className='h-9 w-9 rounded-xl object-cover'
                      />
                    ) : (
                      <AvatarFallback className='rounded-xl bg-red-500 text-white font-semibold text-sm'>
                        {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'EM'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-semibold text-gray-900'>{userProfile?.name || 'Employee'}</span>
                    <span className='truncate text-xs text-gray-600'>
                      {userProfile?.email || 'employee@flowpilot.io.vn'}
                    </span>
                  </div>
                </div>
                <DropdownMenuSeparator className='bg-gray-200' />
                <DropdownMenuItem
                  className='rounded-lg mx-1 cursor-pointer my-1 hover:bg-red-50 hover:text-red-600'
                  onClick={handleLogout}
                >
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
