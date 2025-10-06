import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider
} from '@/app/components/ui/sidebar'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Briefcase, Settings, Package, SquareFunctionIcon } from 'lucide-react'
import logoFlowpilot from '@/app/assets/LogoFlowPilot.png'

import type { ReactNode } from 'react'
import { PATH } from '@/app/routes/path'

function SuperAdminLayout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigationItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: `${PATH.SUPER_ADMIN_DASHBOARD}` },
    { icon: Users, label: 'Users', to: `${PATH.SUPER_ADMIN_USERS}` },
    { icon: Briefcase, label: 'Workspaces', to: `${PATH.SUPER_ADMIN_WORKSPACES}` },
    { icon: Package, label: 'Packages', to: `${PATH.SUPER_ADMIN_PACKAGES}` },
    { icon: SquareFunctionIcon, label: 'Features', to: `${PATH.SUPER_ADMIN_FEATURES}` },
    { icon: Settings, label: 'Settings', to: `${PATH.ADMIN_SETTINGS}` }
  ]
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className='p-3 border-b border-gray-200'>
          <div className='Navbar-logo w-full flex justify-center items-center group cursor-pointer mb-2 sm:mb-0 '>
            <div className='flex items-center'>
              <img
                className='max-w-[160px] sm:max-w-[200px] max-h-[90px] sm:max-h-[140px] lg:max-w-[320px] transition duration-200 group-hover:brightness-90'
                src={logoFlowpilot}
                alt='flow-pillot-logo'
              />
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className='p-4'>
          <SidebarMenu>
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Link to={item.to} className='w-full block' tabIndex={-1}>
                  <SidebarMenuButton
                    isActive={location.pathname.startsWith(item.to)}
                    className='w-full justify-start text-base py-3'
                  >
                    <item.icon className='w-7 h-7 mr-2' />
                    <span className='text-base font-normal'>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}

export default SuperAdminLayout
