import { SidebarInset, SidebarProvider } from '@/app/components/ui/sidebar'

import ManagerHeader from '@/app/layouts/ManagerLayout/partials/ManagerHeader'
import ManagerSidebar from '@/app/layouts/ManagerLayout/partials/ManagerSidebar'
import type { ReactNode } from 'react'

function ManagerLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <ManagerSidebar />
      <SidebarInset className='flex flex-1 flex-col bg-white'>
        <ManagerHeader />
        <div className='container mx-auto max-w-7xl min-h-screen p-6'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default ManagerLayout
