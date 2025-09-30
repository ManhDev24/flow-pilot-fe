import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { FilePreviewModal } from './FilePreviewModal'
import { UploadModal } from './UploadModal'
import {
  FileText,
  Download,
  MoreHorizontal,
  Eye,
  FileImage,
  FileArchive,
  FileSpreadsheet,
  File,
  Trash2
} from 'lucide-react'

interface FileItem {
  id: string
  name: string
  size: string
  date: string
  status: 'Completed' | 'Processing'
  type: 'pdf' | 'pptx' | 'docx' | 'txt' | 'zip' | 'xlsx' | 'jpg' | 'png' | 'default'
}

const mockFiles: FileItem[] = [
  {
    id: '1',
    name: 'Annual Report 2023.pdf',
    size: '2.1 MB',
    date: '2024-07-24',
    status: 'Completed',
    type: 'pdf'
  },
  {
    id: '2',
    name: 'Q3 Marketing Plan.pptx',
    size: '8.1 MB',
    date: '2024-07-27',
    status: 'Completed',
    type: 'pptx'
  },
  {
    id: '3',
    name: 'Project Alpha Requirements.docx',
    size: '1.5 MB',
    date: '2024-07-28',
    status: 'Completed',
    type: 'docx'
  },
  {
    id: '4',
    name: 'Team Meeting Notes.txt',
    size: '0.8 MB',
    date: '2024-07-30',
    status: 'Completed',
    type: 'txt'
  },
  {
    id: '5',
    name: 'Product Launch Graphics.zip',
    size: '65.7 MB',
    date: '2024-07-31',
    status: 'Processing',
    type: 'zip'
  },
  {
    id: '6',
    name: 'Invoice_ClientA_Jul.pdf',
    size: '1.1 MB',
    date: '2024-07-25',
    status: 'Completed',
    type: 'pdf'
  },
  {
    id: '7',
    name: 'Design Assets.sketch',
    size: '23.1 MB',
    date: '2024-07-22',
    status: 'Completed',
    type: 'default'
  },
  {
    id: '8',
    name: 'Client Feedback.xlsx',
    size: '2.5 MB',
    date: '2024-07-21',
    status: 'Completed',
    type: 'xlsx'
  }
]

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

export function RecentUploadsList() {
  const [files, setFiles] = useState<FileItem[]>(mockFiles)
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)

  const handleDownload = (file: FileItem) => {
    // Create a mock download
    const link = document.createElement('a')
    link.href = `#` // In real app, this would be the actual file URL
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Show success message (you can implement toast notifications)
    console.log(`Downloading ${file.name}`)
  }

  const handlePreview = (file: FileItem) => {
    setPreviewFile(file)
    setIsPreviewOpen(true)
  }

  const handleDelete = (fileId: string) => {
    if (confirm('Are you sure you want to delete this file?')) {
      setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId))
      console.log(`File ${fileId} deleted`)
    }
  }

  const handleFilesUploaded = (uploadedFiles: File[]) => {
    const newFiles: FileItem[] = uploadedFiles.map((file, index) => ({
      id: `uploaded-${Date.now()}-${index}`,
      name: file.name,
      size: formatFileSize(file.size),
      date: new Date().toISOString().split('T')[0],
      status: 'Processing' as const,
      type: getFileType(file.name)
    }))

    setFiles((prevFiles) => [...newFiles, ...prevFiles])

    // Simulate processing completion after 2 seconds
    setTimeout(() => {
      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          newFiles.some((newFile) => newFile.id === file.id) ? { ...file, status: 'Completed' as const } : file
        )
      )
    }, 2000)
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
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setUploadModalOpen(true)}
              className='flex items-center space-x-2'
            >
              <Download className='h-4 w-4 rotate-180' />
              <span>Upload</span>
            </Button>
            <Button variant='ghost' size='sm' className='text-primary hover:text-primary/80'>
              View All →
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-border'>
                <th className='text-left py-3 px-6 text-sm font-medium text-muted-foreground'>File Name</th>
                <th className='text-left py-3 px-4 text-sm font-medium text-muted-foreground'>Size</th>
                <th className='text-left py-3 px-4 text-sm font-medium text-muted-foreground'>Date</th>
                <th className='text-left py-3 px-4 text-sm font-medium text-muted-foreground'>Status</th>
                <th className='text-left py-3 px-4 text-sm font-medium text-muted-foreground'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id} className='border-b border-border hover:bg-muted/50 transition-colors'>
                  <td className='py-4 px-6'>
                    <div className='flex items-center space-x-3'>
                      <div className='text-muted-foreground'>{getFileIcon(file.type)}</div>
                      <span className='text-sm font-medium text-foreground truncate max-w-[200px]'>{file.name}</span>
                    </div>
                  </td>
                  <td className='py-4 px-4 text-sm text-muted-foreground'>{file.size}</td>
                  <td className='py-4 px-4 text-sm text-muted-foreground'>{formatDate(file.date)}</td>
                  <td className='py-4 px-4'>
                    <Badge
                      variant={file.status === 'Completed' ? 'default' : 'secondary'}
                      className={
                        file.status === 'Completed'
                          ? 'bg-green-100 text-green-700 hover:bg-green-100'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                      }
                    >
                      {file.status}
                    </Badge>
                  </td>
                  <td className='py-4 px-4'>
                    <div className='flex items-center space-x-2'>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handlePreview(file)}
                        className='p-2 h-8 w-8'
                        title='Preview file'
                      >
                        <Eye className='h-4 w-4' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleDownload(file)}
                        className='p-2 h-8 w-8'
                        disabled={file.status === 'Processing'}
                        title='Download file'
                      >
                        <Download className='h-4 w-4' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleDelete(file.id)}
                        className='p-2 h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50'
                        title='Delete file'
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                      <Button variant='ghost' size='sm' className='p-2 h-8 w-8' title='More options'>
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>

      {/* File Preview Modal */}
      {previewFile && (
        <FilePreviewModal
          open={isPreviewOpen}
          onOpenChange={setIsPreviewOpen}
          fileName={previewFile.name}
          fileType={previewFile.type}
          fileSize={previewFile.size}
          onDownload={() => handleDownload(previewFile)}
        />
      )}

      {/* Upload Modal */}
      <UploadModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} onFilesUploaded={handleFilesUploaded} />
    </Card>
  )
}
