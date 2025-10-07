import { SidebarInset, SidebarProvider } from '@/app/components/ui/sidebar'
import AdminWsHeader from '@/app/layouts/AdminWsLayout/partials/AdminWsHeader'
import AdminWsSidebar from '@/app/layouts/AdminWsLayout/partials/AdminWsSidebar'

import type { ReactNode } from 'react'

function AdminWsLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AdminWsSidebar />
      <SidebarInset className='flex flex-1 flex-col bg-white'>
        <AdminWsHeader />
        <div className='container mx-auto max-w-7xl min-h-screen p-6'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AdminWsLayout
