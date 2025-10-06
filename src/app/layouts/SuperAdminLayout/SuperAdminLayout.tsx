import { SidebarInset, SidebarProvider } from '@/app/components/ui/sidebar'
import type { ReactNode } from 'react'
import SuperAdminHeader from './partials/SuperAdminHeader'
import SuperAdminSidebar from './partials/SuperAdminSidebar'

function SuperAdminLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <SuperAdminSidebar />
      <SidebarInset className='flex flex-1 flex-col bg-gray-50'>
        <SuperAdminHeader />
        <div className='container mx-auto max-w-7xl min-h-screen p-6'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default SuperAdminLayout
