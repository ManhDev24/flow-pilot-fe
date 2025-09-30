import { useState } from 'react'

import { DropZone } from './DropZone'
import { RecentUploadsList } from '@/app/modules/Manager/MyFileManager/partials/RecentUploadsList'
import { StorageUsage } from '@/app/modules/Manager/MyFileManager/partials/StorageUsage'
import { QuickActions } from '@/app/modules/Manager/MyFileManager/partials/QuickActions'

export function FileManagerDashboard() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleFilesUploaded = (files: File[]) => {
    console.log(
      'Files uploaded:',
      files.map((f) => f.name)
    )
    // Trigger a refresh of the file list
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div className='p-4 sm:p-6 space-y-6 bg-background min-h-screen'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl sm:text-3xl font-bold text-foreground'>My File Manager</h1>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        <div className='lg:col-span-3 space-y-6'>
          <DropZone onFilesUploaded={handleFilesUploaded} />
          <RecentUploadsList key={refreshTrigger} />
        </div>

        <div className='lg:col-span-1 space-y-6'>
          <StorageUsage />
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
