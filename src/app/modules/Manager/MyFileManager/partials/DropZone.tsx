import { useState } from 'react'
import { Card, CardContent } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Upload, FileText } from 'lucide-react'
import { UploadModal } from './UploadModal'

interface DropZoneProps {
  onFilesUploaded: () => void
}

export function DropZone({ onFilesUploaded }: DropZoneProps) {
  const [uploadModalOpen, setUploadModalOpen] = useState(false)

  const handleOpenModal = () => {
    setUploadModalOpen(true)
  }

  const handleFilesUploaded = () => {
    onFilesUploaded()
    setUploadModalOpen(false)
  }

  return (
    <>
      <Card
        className='border-2 border-dashed transition-colors cursor-pointer border-muted-foreground/25 hover:border-primary/50'
        onClick={handleOpenModal}
      >
        <CardContent className='p-8 text-center'>
          <div className='flex flex-col items-center space-y-4'>
            <div className='p-4 rounded-full bg-muted'>
              <Upload className='h-8 w-8 text-muted-foreground' />
            </div>

            <div className='space-y-2'>
              <h3 className='text-lg font-semibold text-foreground'>Upload your files</h3>
              <p className='text-sm text-muted-foreground'>Drag and drop files here, or click to browse</p>
            </div>

            <Button variant='default' onClick={handleOpenModal}>
              <FileText className='h-4 w-4 mr-2' />
              Browse Files
            </Button>

            <p className='text-xs text-muted-foreground'>Supported formats: PDF, DOC, PPT, TXT, ZIP, XLS, JPG, PNG</p>
          </div>
        </CardContent>
      </Card>

      <UploadModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} onFilesUploaded={handleFilesUploaded} />
    </>
  )
}
