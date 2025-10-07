import { useState } from 'react'

import { QuickActions } from '@/app/modules/Employee/MyFiles/partials/QuickActions'
import { RecentUploadsList } from '@/app/modules/Employee/MyFiles/partials/RecentUploadsList'
import { StorageUsage } from '@/app/modules/Employee/MyFiles/partials/StorageUsage'

export function FileManagerDashboard() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleFilesUploaded = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  const triggerRefresh = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div className='p-4 sm:p-6 space-y-6 bg-background min-h-screen'>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        <div className='lg:col-span-3 space-y-6'>
          {/* <DropZone onFilesUploaded={handleFilesUploaded} /> */}
          <RecentUploadsList key={refreshTrigger} onRefresh={triggerRefresh} />
        </div>

        <div className='lg:col-span-1 space-y-6'>
          <StorageUsage key={refreshTrigger} />
          <QuickActions onFilesUploaded={handleFilesUploaded} />
        </div>
      </div>
    </div>
  )
}
