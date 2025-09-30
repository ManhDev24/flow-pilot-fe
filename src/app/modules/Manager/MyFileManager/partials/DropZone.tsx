import { useState, useCallback } from 'react'
import { Card, CardContent } from '@/app/components/ui/card'
import { Upload, FileText } from 'lucide-react'

interface DropZoneProps {
  onFilesUploaded: (files: File[]) => void
}

export function DropZone({ onFilesUploaded }: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(false)

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        onFilesUploaded(files)
      }
    },
    [onFilesUploaded]
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files) {
        onFilesUploaded(Array.from(files))
      }
    },
    [onFilesUploaded]
  )

  return (
    <Card
      className={`mb-6 border-2 border-dashed transition-colors ${
        isDragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <CardContent className='p-8 text-center'>
        <div className='flex flex-col items-center space-y-4'>
          <div className={`p-4 rounded-full ${isDragOver ? 'bg-primary/10' : 'bg-muted'}`}>
            <Upload className={`h-8 w-8 ${isDragOver ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>

          <div className='space-y-2'>
            <h3 className='text-lg font-semibold text-foreground'>
              {isDragOver ? 'Drop files here' : 'Upload your files'}
            </h3>
            <p className='text-sm text-muted-foreground'>Drag and drop files here, or click to browse</p>
          </div>

          <label className='cursor-pointer'>
            <input
              type='file'
              multiple
              onChange={handleFileInput}
              className='hidden'
              accept='.pdf,.doc,.docx,.ppt,.pptx,.txt,.zip,.rar,.xlsx,.xls,.jpg,.jpeg,.png'
            />
            <div className='inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors'>
              <FileText className='h-4 w-4' />
              <span>Browse Files</span>
            </div>
          </label>

          <p className='text-xs text-muted-foreground'>Supported formats: PDF, DOC, PPT, TXT, ZIP, XLS, JPG, PNG</p>
        </div>
      </CardContent>
    </Card>
  )
}
