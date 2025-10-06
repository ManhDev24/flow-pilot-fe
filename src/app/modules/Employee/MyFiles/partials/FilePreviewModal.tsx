import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { Download, X } from 'lucide-react'

interface FilePreviewModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  fileName: string
  fileType: string
  fileSize: string
  onDownload: () => void
}

export function FilePreviewModal({
  open,
  onOpenChange,
  fileName,
  fileType,
  fileSize,
  onDownload
}: FilePreviewModalProps) {
  const getPreviewContent = () => {
    switch (fileType) {
      case 'pdf':
        return (
          <div className='flex items-center justify-center h-64 bg-red-50 rounded-lg'>
            <div className='text-center'>
              <div className='text-red-600 text-4xl mb-2'>📄</div>
              <p className='text-sm text-muted-foreground'>PDF Preview</p>
              <p className='text-xs text-muted-foreground mt-1'>Click download to view the full document</p>
            </div>
          </div>
        )
      case 'jpg':
      case 'png':
        return (
          <div className='flex items-center justify-center h-64 bg-blue-50 rounded-lg'>
            <div className='text-center'>
              <div className='text-blue-600 text-4xl mb-2'>🖼️</div>
              <p className='text-sm text-muted-foreground'>Image Preview</p>
              <p className='text-xs text-muted-foreground mt-1'>Click download to view the full image</p>
            </div>
          </div>
        )
      case 'docx':
        return (
          <div className='flex items-center justify-center h-64 bg-blue-50 rounded-lg'>
            <div className='text-center'>
              <div className='text-blue-600 text-4xl mb-2'>📝</div>
              <p className='text-sm text-muted-foreground'>Document Preview</p>
              <p className='text-xs text-muted-foreground mt-1'>Click download to view the full document</p>
            </div>
          </div>
        )
      case 'xlsx':
        return (
          <div className='flex items-center justify-center h-64 bg-green-50 rounded-lg'>
            <div className='text-center'>
              <div className='text-green-600 text-4xl mb-2'>📊</div>
              <p className='text-sm text-muted-foreground'>Spreadsheet Preview</p>
              <p className='text-xs text-muted-foreground mt-1'>Click download to view the full spreadsheet</p>
            </div>
          </div>
        )
      case 'zip':
        return (
          <div className='flex items-center justify-center h-64 bg-purple-50 rounded-lg'>
            <div className='text-center'>
              <div className='text-purple-600 text-4xl mb-2'>🗜️</div>
              <p className='text-sm text-muted-foreground'>Archive Preview</p>
              <p className='text-xs text-muted-foreground mt-1'>Click download to access the archive contents</p>
            </div>
          </div>
        )
      default:
        return (
          <div className='flex items-center justify-center h-64 bg-gray-50 rounded-lg'>
            <div className='text-center'>
              <div className='text-gray-600 text-4xl mb-2'>📄</div>
              <p className='text-sm text-muted-foreground'>File Preview</p>
              <p className='text-xs text-muted-foreground mt-1'>Click download to view the file</p>
            </div>
          </div>
        )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <div className='flex items-center justify-between'>
            <DialogTitle className='text-lg font-semibold truncate pr-4'>{fileName}</DialogTitle>
            <Button variant='ghost' size='sm' onClick={() => onOpenChange(false)} className='p-2'>
              <X className='h-4 w-4' />
            </Button>
          </div>
        </DialogHeader>

        <div className='space-y-4'>
          {/* File Info */}
          <div className='flex items-center justify-between p-4 bg-muted rounded-lg'>
            <div>
              <p className='text-sm font-medium text-foreground'>{fileName}</p>
              <p className='text-xs text-muted-foreground'>Size: {fileSize}</p>
            </div>
            <Button onClick={onDownload} className='flex items-center space-x-2'>
              <Download className='h-4 w-4' />
              <span>Download</span>
            </Button>
          </div>

          {/* Preview Content */}
          {getPreviewContent()}
        </div>
      </DialogContent>
    </Dialog>
  )
}
