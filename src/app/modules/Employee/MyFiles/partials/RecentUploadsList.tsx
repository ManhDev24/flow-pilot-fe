import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Skeleton } from '@/app/components/ui/skeleton'
import { MyTaskApi } from '@/app/apis/AUTH/file.api'
import { toast } from 'react-toastify'
import type { FileItem as ApiFileItem } from '@/app/modules/Employee/MyFiles/models/myFile.type'
import { FileText, Download, FileImage, FileArchive, FileSpreadsheet, File, Trash2, Share } from 'lucide-react'
import { ConfirmDeleteFileDialog } from './ConfirmDeleteFileDialog'

interface FileItem {
  id: string
  name: string
  size: string
  date: string
  type: 'pdf' | 'pptx' | 'docx' | 'txt' | 'zip' | 'xlsx' | 'jpg' | 'png' | 'default'
  file_url?: string
  file_size?: number
  api_id?: number
}

function getFileIcon(type: string) {
  switch (type) {
    case 'pdf':
    case 'docx':
    case 'txt':
      return <FileText className='h-4 w-4' />
    case 'jpg':
    case 'png':
      return <FileImage className='h-4 w-4' />
    case 'zip':
      return <FileArchive className='h-4 w-4' />
    case 'xlsx':
      return <FileSpreadsheet className='h-4 w-4' />
    default:
      return <File className='h-4 w-4' />
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

export function RecentUploadsList({ onRefresh }: { onRefresh?: () => void }) {
  const [files, setFiles] = useState<FileItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [fileToDelete, setFileToDelete] = useState<FileItem | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Fetch files from API
  const fetchFiles = useCallback(async () => {
    try {
      setLoading(true)
      const response = await MyTaskApi.getMyFile()

      if (response?.data?.items) {
        const formattedFiles: FileItem[] = response.data.items.map((file: ApiFileItem) => ({
          id: file.id.toString(),
          name: file.file_name,
          size: formatFileSize(file.file_size),
          date: file.uploaded_at.split('T')[0],
          type: getFileType(file.file_name),
          file_url: file.file_url,
          file_size: file.file_size,
          api_id: file.id
        }))
        setFiles(formattedFiles)
      }
    } catch (error) {
      console.error('Error fetching files:', error)
      toast.error('Failed to load files')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchFiles()
  }, [fetchFiles])

  // Refresh files when onRefresh is called
  useEffect(() => {
    if (onRefresh) {
      fetchFiles()
    }
  }, [onRefresh, fetchFiles])

  const handleDownload = async (file: FileItem) => {
    try {
      if (file.file_url) {
        const link = document.createElement('a')
        link.href = file.file_url
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast.success(`Downloading ${file.name}`)
      }
    } catch (error) {
      console.error('Download failed:', error)
      toast.error('Failed to download file')
    }
  }

  const handleShare = async (file: FileItem) => {
    try {
      if (file.file_url) {
        await navigator.clipboard.writeText(file.file_url)
        toast.success('File link copied to clipboard!')
      }
    } catch (error) {
      console.error('Share failed:', error)
      toast.error('Failed to copy link')
    }
  }

  const handleDelete = async (file: FileItem) => {
    setFileToDelete(file)
    setShowDeleteDialog(true)
  }

  const confirmDelete = async () => {
    if (!fileToDelete) return

    try {
      setIsDeleting(true)
      if (fileToDelete.api_id) {
        await MyTaskApi.deleteFile(fileToDelete.api_id)
        setFiles((prevFiles) => prevFiles.filter((f) => f.id !== fileToDelete.id))
        toast.success('File deleted successfully')
      }
    } catch (error) {
      console.error('Delete failed:', error)
      toast.error('Failed to delete file')
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
      setFileToDelete(null)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const getFileType = (filename: string): FileItem['type'] => {
    const extension = filename.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'pdf':
        return 'pdf'
      case 'pptx':
      case 'ppt':
        return 'pptx'
      case 'docx':
      case 'doc':
        return 'docx'
      case 'txt':
        return 'txt'
      case 'zip':
      case 'rar':
        return 'zip'
      case 'xlsx':
      case 'xls':
        return 'xlsx'
      case 'jpg':
      case 'jpeg':
        return 'jpg'
      case 'png':
        return 'png'
      default:
        return 'default'
    }
  }

  return (
    <Card className='bg-card border-border'>
      <CardHeader className='pb-4'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg font-semibold text-foreground'>Recent Uploads</CardTitle>
        </div>
      </CardHeader>
      <CardContent className='p-0'>
        {loading ? (
          <div className='space-y-3 p-6'>
            {[...Array(5)].map((_, i) => (
              <div key={i} className='flex items-center space-x-3'>
                <Skeleton className='h-4 w-4' />
                <Skeleton className='h-4 w-48' />
                <Skeleton className='h-4 w-16' />
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-24' />
              </div>
            ))}
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-border'>
                  <th className='text-left py-3 px-6 text-sm font-medium text-muted-foreground'>File Name</th>
                  <th className='text-left py-3 px-4 text-sm font-medium text-muted-foreground'>Size</th>
                  <th className='text-left py-3 px-4 text-sm font-medium text-muted-foreground'>Date</th>
                  <th className='text-left py-3 px-4 text-sm font-medium text-muted-foreground'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.length === 0 ? (
                  <tr>
                    <td colSpan={4} className='py-8 text-center text-muted-foreground'>
                      No files uploaded yet
                    </td>
                  </tr>
                ) : (
                  files.map((file) => (
                    <tr key={file.id} className='border-b border-border hover:bg-muted/50 transition-colors'>
                      <td className='py-4 px-6'>
                        <div className='flex items-center space-x-3'>
                          <div className='text-muted-foreground'>{getFileIcon(file.type)}</div>
                          <span className='text-sm font-medium text-foreground truncate max-w-[200px]'>
                            {file.name}
                          </span>
                        </div>
                      </td>
                      <td className='py-4 px-4 text-sm text-muted-foreground'>{file.size}</td>
                      <td className='py-4 px-4 text-sm text-muted-foreground'>{formatDate(file.date)}</td>

                      <td className='py-4 px-4'>
                        <div className='flex items-center space-x-2'>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => handleShare(file)}
                            className='p-2 h-8 w-8'
                            title='Share link'
                          >
                            <Share className='h-4 w-4' />
                          </Button>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => handleDownload(file)}
                            className='p-2 h-8 w-8'
                            title='Download file'
                          >
                            <Download className='h-4 w-4' />
                          </Button>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => handleDelete(file)}
                            className='p-2 h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50'
                            title='Delete file'
                          >
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>

      <ConfirmDeleteFileDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false)
          setFileToDelete(null)
        }}
        onConfirm={confirmDelete}
        fileName={fileToDelete?.name || ''}
        isLoading={isDeleting}
      />
    </Card>
  )
}
