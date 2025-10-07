import { MyTaskApi } from '@/app/apis/AUTH/file.api'
import { Button } from '@/app/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog'
import { Progress } from '@/app/components/ui/progress'
import { CheckCircle, File, FileArchive, FileImage, FileSpreadsheet, FileText, Upload, X } from 'lucide-react'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

interface UploadFile {
  id: string
  file: File
  name: string
  size: string
  progress: number
  status: 'selected' | 'uploading' | 'completed' | 'error'
  type: string
}

interface UploadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onFilesUploaded: () => void
}

export function UploadModal({ open, onOpenChange, onFilesUploaded }: UploadModalProps) {
  const [selectedFiles, setSelectedFiles] = useState<UploadFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B'

    if (bytes < 1024) {
      return bytes + ' B'
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(2) + ' KB'
    } else if (bytes < 1024 * 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
    } else {
      return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
    }
  }

  const getFileIcon = (type: string) => {
    const extension = type.toLowerCase()
    if (extension.includes('image')) return <FileImage className='h-5 w-5 text-blue-500' />
    if (extension.includes('pdf')) return <FileText className='h-5 w-5 text-red-500' />
    if (extension.includes('zip') || extension.includes('rar'))
      return <FileArchive className='h-5 w-5 text-purple-500' />
    if (extension.includes('sheet') || extension.includes('excel'))
      return <FileSpreadsheet className='h-5 w-5 text-green-500' />
    return <File className='h-5 w-5 text-gray-500' />
  }

  const addFiles = useCallback((files: File[]) => {
    const newFiles: UploadFile[] = files.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      name: file.name,
      size: formatFileSize(file.size),
      progress: 0,
      status: 'selected' as const,
      type: file.type
    }))
    setSelectedFiles((prev) => [...prev, ...newFiles])
  }, [])

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
        addFiles(files)
      }
    },
    [addFiles]
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files) {
        addFiles(Array.from(files))
      }
      // Reset input value to allow selecting the same file again
      e.target.value = ''
    },
    [addFiles]
  )

  const removeFile = (id: string) => {
    setSelectedFiles((prev) => prev.filter((file) => file.id !== id))
  }

  const simulateUpload = async (file: UploadFile) => {
    try {
      // Set status to uploading
      setSelectedFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, status: 'uploading' } : f)))

      // Simulate progress updates
      for (let progress = 0; progress <= 90; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100))
        setSelectedFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, progress } : f)))
      }

      // Upload file using API
      await MyTaskApi.uploadFile(file.file)

      // Mark as completed
      setSelectedFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, progress: 100, status: 'completed' } : f)))
    } catch (error) {
      console.error('Upload failed:', error)
      // Mark as error
      setSelectedFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, status: 'error' } : f)))
      throw error
    }
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return

    setIsUploading(true)

    try {
      const uploadPromises = selectedFiles
        .filter((file) => file.status === 'selected')
        .map((file) => simulateUpload(file))

      await Promise.all(uploadPromises)

      toast.success(`${selectedFiles.length} file(s) uploaded successfully!`)

      onFilesUploaded()

      setTimeout(() => {
        onOpenChange(false)
        setSelectedFiles([])
      }, 1000)
    } catch (error) {
      console.error('Upload failed:', error)
      toast.error('Some files failed to upload')
    } finally {
      setIsUploading(false)
    }
  }

  const handleCancel = () => {
    setSelectedFiles([])
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <div className='flex items-center justify-between'>
            <DialogTitle className='text-xl font-semibold text-foreground'>Upload Files</DialogTitle>
          </div>
          <p className='text-sm text-muted-foreground mt-2'>Drag & drop files here, or click to select them.</p>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
              isDragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            <input
              id='fileInput'
              type='file'
              multiple
              onChange={handleFileInput}
              className='hidden'
              accept='.pdf,.doc,.docx,.ppt,.pptx,.txt,.zip,.rar,.xlsx,.xls'
            />

            <div className='flex flex-col items-center space-y-4'>
              <div className='p-4 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl'>
                <Upload className='h-8 w-8 text-orange-600' />
              </div>

              <div className='space-y-2'>
                <div className='flex items-center justify-center space-x-2 text-primary hover:text-primary/80 transition-colors'>
                  <FileText className='h-5 w-5' />
                  <span className='font-medium'>Click or Drag files here to upload</span>
                </div>
                <p className='text-xs text-muted-foreground'>Max file size: 50MB</p>
              </div>
            </div>
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className='space-y-4'>
              <h3 className='font-semibold text-foreground'>Selected Files ({selectedFiles.length}):</h3>

              <div className='space-y-3 max-h-64 overflow-y-auto'>
                {selectedFiles.map((file) => (
                  <div key={file.id} className='flex items-center space-x-3 p-3 bg-muted/50 rounded-lg'>
                    <div className='flex-shrink-0'>{getFileIcon(file.type)}</div>

                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-medium text-foreground truncate'>{file.name}</p>
                      <p className='text-xs text-muted-foreground'>({file.size})</p>

                      {file.status === 'uploading' && (
                        <div className='mt-2'>
                          <Progress value={file.progress} className='h-1' />
                        </div>
                      )}
                    </div>

                    <div className='flex items-center space-x-2'>
                      {file.status === 'completed' && <CheckCircle className='h-4 w-4 text-green-500' />}
                      {file.status === 'error' && (
                        <button
                          onClick={() => removeFile(file.id)}
                          className='p-1 hover:bg-muted rounded-full transition-colors'
                        >
                          <X className='h-4 w-4 text-muted-foreground' />
                        </button>
                      )}
                      {file.status === 'uploading' && (
                        <div className='w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin' />
                      )}
                      {file.status === 'selected' && (
                        <button
                          onClick={() => removeFile(file.id)}
                          className='p-1 hover:bg-muted rounded-full transition-colors'
                        >
                          <X className='h-4 w-4 text-muted-foreground' />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className='flex justify-between pt-4'>
            <Button variant='outline' onClick={handleCancel} disabled={isUploading}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={selectedFiles.length === 0 || isUploading} className='px-8'>
              {isUploading ? 'Uploading...' : 'Upload Files'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
