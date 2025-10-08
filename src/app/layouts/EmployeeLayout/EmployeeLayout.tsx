import { SidebarInset, SidebarProvider } from '@/app/components/ui/sidebar'
import { GlobalTimerWidget } from '@/app/components/GlobalTimerWidget'
import { EmployeeHeader } from '@/app/layouts/EmployeeLayout/partials/EmployeeHeader'
import { EmployeeSidebar } from '@/app/layouts/EmployeeLayout/partials/EmployeeSidebar'
import type { ReactNode } from 'react'

function EmployeeLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <EmployeeSidebar />
      <SidebarInset>
        <EmployeeHeader />
        <div className='container mx-auto max-w-7xl min-h-screen p-6'>{children}</div>
        {window.location.pathname !== '/emp/my-performance' && <GlobalTimerWidget />}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default EmployeeLayout
