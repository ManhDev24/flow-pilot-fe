import { SidebarInset, SidebarProvider } from '@/app/components/ui/sidebar'
import { EmployeeHeader } from '@/app/layouts/EmployeeLayout/partials/EmployeeHeader'
import { EmployeeSidebar } from '@/app/layouts/EmployeeLayout/partials/EmployeeSidebar'
import type { ReactNode } from 'react'

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
