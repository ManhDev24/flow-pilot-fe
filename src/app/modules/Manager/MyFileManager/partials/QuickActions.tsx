import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { UploadModal } from './UploadModal'
import { FolderPlus, Upload, Share2, Trash2 } from 'lucide-react'

export function QuickActions() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false)

  const handleFilesUploaded = (files: File[]) => {
    console.log(
      'Files uploaded:',
      files.map((f) => f.name)
    )
    // Here you would handle the file upload to your server
  }

  const actions = [
    {
      icon: <FolderPlus className='h-5 w-5' />,
      label: 'New Folder',
      onClick: () => console.log('Create new folder')
    },
    {
      icon: <Upload className='h-5 w-5' />,
      label: 'Upload Files',
      onClick: () => setUploadModalOpen(true)
    },
    {
      icon: <Share2 className='h-5 w-5' />,
      label: 'Share Link',
      onClick: () => console.log('Share link')
    },
    {
      icon: <Trash2 className='h-5 w-5' />,
      label: 'Deleted Items',
      onClick: () => console.log('View deleted items')
    }
  ]

  return (
    <Card className='bg-card border-border'>
      <CardHeader className='pb-4'>
        <CardTitle className='text-lg font-semibold text-foreground'>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        {actions.map((action, index) => (
          <Button
            key={index}
            variant='ghost'
            className='w-full justify-start h-auto p-3 hover:bg-muted'
            onClick={action.onClick}
          >
            <div className='flex items-center space-x-3'>
              <div className='text-primary'>{action.icon}</div>
              <span className='text-sm font-medium text-foreground'>{action.label}</span>
            </div>
          </Button>
        ))}
      </CardContent>

      {/* Upload Modal */}
      <UploadModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} onFilesUploaded={handleFilesUploaded} />
    </Card>
  )
}
