import logoFlowpilot from '@/app/assets/LogoFlowPilot.png'
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
import { PATH } from '@/app/routes/path'
import { ClipboardPlus, Folder, Hotel, LayoutDashboard, User } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
function AdminWsLayout({ children }: { children: ReactNode }) {
  const location = useLocation()

  const navigationItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: `${PATH.ADMIN_DASHBOARD}` },
    { icon: ClipboardPlus, label: 'Report', to: `${PATH.ADMIN_MY_REPORT}` },
    { icon: Hotel, label: 'Department', to: `${PATH.ADMIN_DEPARTMENTS}` },
    { icon: User, label: 'Employees', to: `${PATH.ADMIN_MY_EMPLOYEES}` },
    { icon: Folder, label: 'Project', to: `${PATH.ADMIN_MY_PROJECTS}` }
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

      <SidebarInset>
        <div className='max-w-7xl mx-auto'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AdminWsLayout
