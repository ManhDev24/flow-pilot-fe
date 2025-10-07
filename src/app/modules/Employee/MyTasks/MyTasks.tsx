'use client'

import { authApi } from '@/app/apis/AUTH/Auth.api'
import { MyTaskApi } from '@/app/apis/AUTH/task-emp.api'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Separator } from '@/app/components/ui/separator'
import {
  ArrowDownWideNarrow,
  Calendar,
  CircleDotDashed,
  ClipboardList,
  Download,
  ListFilter,
  Loader2,
  MessageSquare,
  Paperclip,
  Plus,
  Search,
  Star,
  Tag,
  Upload,
  User
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { FileByTask, MyTask } from './models/myTask.type'
import { AddChecklistItem } from './partials/AddChecklistItem'
import { ChecklistItem } from './partials/ChecklistItem'
import { CreateTaskContentForm } from './partials/CreateTaskContentForm'
import { TaskContentItem } from './partials/TaskContentItem'

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'todo':
      return {
        statusColor: 'bg-gray-500',
        statusBorder: 'border-gray-500',
        statusBg: 'bg-gray-50',
        displayText: 'To Do'
      }
    case 'doing':
      return {
        statusColor: 'bg-blue-600',
        statusBorder: 'border-blue-600',
        statusBg: 'bg-blue-50',
        displayText: 'In Progress'
      }
    case 'reviewing':
      return {
        statusColor: 'bg-purple-600',
        statusBorder: 'border-purple-600',
        statusBg: 'bg-purple-50',
        displayText: 'Reviewing'
      }
    case 'rejected':
      return {
        statusColor: 'bg-red-600',
        statusBorder: 'border-red-600',
        statusBg: 'bg-red-50',
        displayText: 'Rejected'
      }
    case 'completed':
      return {
        statusColor: 'bg-green-600',
        statusBorder: 'border-green-600',
        statusBg: 'bg-green-50',
        displayText: 'Completed'
      }
    case 'feedbacked':
      return {
        statusColor: 'bg-orange-600',
        statusBorder: 'border-orange-600',
        statusBg: 'bg-orange-50',
        displayText: 'Feedback'
      }
    case 'overdued':
      return {
        statusColor: 'bg-red-800',
        statusBorder: 'border-red-800',
        statusBg: 'bg-red-100',
        displayText: 'Overdue'
      }
    default:
      return {
        statusColor: 'bg-gray-500',
        statusBorder: 'border-gray-500',
        statusBg: 'bg-gray-50',
        displayText: 'Unknown'
      }
  }
}

const getPriorityStyles = (priority: string) => {
  switch (priority) {
    case 'low':
      return {
        priorityColor: 'bg-green-100 text-green-700 border border-green-600',
        displayText: 'Low'
      }
    case 'medium':
      return {
        priorityColor: 'bg-yellow-100 text-yellow-700 border border-yellow-600',
        displayText: 'Medium'
      }
    case 'high':
      return {
        priorityColor: 'bg-red-100 text-red-700 border border-red-600',
        displayText: 'High'
      }
    default:
      return {
        priorityColor: 'bg-gray-100 text-gray-700 border border-gray-600',
        displayText: 'Unknown'
      }
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-CA')
}

export default function MyTasksPage() {
  const [selectedTask, setSelectedTask] = useState<string>('')
  const [tasks, setTasks] = useState<MyTask[]>([])
  const [loading, setLoading] = useState(true)
  const [, setError] = useState<string | null>(null)
  const [taskFiles, setTaskFiles] = useState<FileByTask[]>([])
  const [filesLoading, setFilesLoading] = useState(false)
  const [uploadingFile, setUploadingFile] = useState(false)
  const [currentUserId, setCurrentUserId] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await authApi.getCurrentUser()
        if (response.success) {
          setCurrentUserId(response.data.id)
        }
      } catch (err) {
        console.error('Error fetching current user:', err)
      }
    }
    fetchCurrentUser()
  }, [])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true)
        const response = await MyTaskApi.getMyTask()
        if (response.success) {
          setTasks(response.data)
          if (response.data.length > 0) {
            setSelectedTask(response.data[0].id)
          }
        } else {
          setError(response.message)
        }
      } catch (err) {
        setError('Failed to fetch tasks')
        console.error('Error fetching tasks:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const refreshTasks = async () => {
    try {
      const response = await MyTaskApi.getMyTask()
      if (response.success) {
        setTasks(response.data)
      }
    } catch (err) {
      console.error('Error refreshing tasks:', err)
    }
  }

  const fetchTaskFiles = async (taskId: string) => {
    try {
      setFilesLoading(true)
      const response = await MyTaskApi.getFileByTaskId(taskId)
      if (response.success) {
        setTaskFiles(response.data)
      }
    } catch (err) {
      console.error('Error fetching task files:', err)
      setTaskFiles([])
    } finally {
      setFilesLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !selectedTask) return

    try {
      setUploadingFile(true)
      await MyTaskApi.uploadFileByTaskId(selectedTask, file)
      // Refresh files after upload
      await fetchTaskFiles(selectedTask)
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (err) {
      console.error('Error uploading file:', err)
      alert('Failed to upload file')
    } finally {
      setUploadingFile(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  const handleDownloadFile = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = fileName
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  useEffect(() => {
    if (selectedTask) {
      fetchTaskFiles(selectedTask)
    }
  }, [selectedTask])

  const selectedTaskData = tasks.find((task) => task.id === selectedTask)

  const activityLog = [
    { type: 'create', user: 'System', action: 'Task created', time: '2024-07-24 06:00 AM' },
    { type: 'status', user: 'Alice Johnson', action: 'Status changed to In Progress', time: '2024-07-24 06:36 AM' },
    { type: 'comment', user: 'Bob Miller', action: 'Added a comment', time: '2024-07-25 10:30 AM' }
  ]

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='flex items-center space-x-2'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
          <span className='text-sm text-gray-600'>Loading Tasks ...</span>
        </div>
      </div>
    )
  }

  return (
    <div className=' h-screen'>
      <div className='flex-1 flex'>
        <div className='w-[350px] bg-white border-r border-gray-200 flex flex-col'>
          <div className='p-4 border-b border-gray-200'>
            <h1 className='text-xl font-semibold text-gray-900 mb-4'>My Tasks</h1>
            <div className='flex space-x-2'>
              <div className='flex-1 relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                <Input placeholder='Search tasks...' className='pl-10' />
              </div>
              <Button variant='outline' size='sm'>
                <ListFilter className='w-4 h-4' />
              </Button>
              <Button variant='outline' size='sm'>
                <ArrowDownWideNarrow className='w-4 h-4' />
              </Button>
            </div>
          </div>

          <div className='flex-1 p-2 '>
            {tasks.map((task) => {
              const statusStyles = getStatusStyles(task.status)
              return (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task.id)}
                  className={`
                    p-4 mb-3 cursor-pointer transition rounded-xl border-2
                    hover:shadow-md 
                    ${selectedTask === task.id ? `${statusStyles.statusBg} ${statusStyles.statusBorder}` : 'border-gray-200 bg-white'}
                  `}
                >
                  <div className='flex items-start justify-between mb-2'>
                    <h3 className='font-semibold text-gray-900 text-sm '>{task.name}</h3>
                  </div>
                  <p className='text-xs text-gray-600 mb-3 line-clamp-2'>
                    {task.description || 'No description available'}
                  </p>
                  <div className=' text-xs'>
                    <div className='flex items-center  '>
                      <div className='flex items-center w-1/2 space-x-1'>
                        <Calendar className='w-4 h-4 text-blue-700' />
                        <span className='text-gray-500'>{formatDate(task.due_at)}</span>
                      </div>
                      <div className='flex items-center space-x-1 '>
                        <User className='w-4 h-4 text-blue-700' />
                        <span className='text-gray-500'>
                          {task.assignees.length > 0 ? task.assignees[0].user.name : 'Unassigned'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center justify-between mt-2 text-xs text-gray-500'>
                    <div className='flex items-center space-x-2'>
                      <Badge className={`${statusStyles.statusColor} text-white text-xs rounded-2xl px-2 py-1`}>
                        {statusStyles.displayText}
                      </Badge>
                    </div>
                    <div className='flex items-center space-x-3'>
                      {task.contents.length > 0 && (
                        <span className='flex items-center'>
                          <MessageSquare className='w-3 h-3 mr-1' />
                          {task.contents.length}
                        </span>
                      )}
                      {task._count.files > 0 && (
                        <span className='flex items-center'>
                          <Paperclip className='w-3 h-3 mr-1' />
                          {task._count.files}
                        </span>
                      )}
                      {task.checklists.length > 0 && (
                        <span className='flex items-center'>
                          <ClipboardList className='w-3 h-3 mr-1' />
                          {task.checklists.length}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Task Detail */}
        <div className='flex-1 bg-white flex flex-col'>
          {selectedTaskData && (
            <div className='p-6'>
              <div className='mb-6'>
                <h1 className='text-2xl font-semibold text-gray-900'>{selectedTaskData.name}</h1>
                <p className='text-2xl font-semibold text-gray-900 mb-4'>(Deadline Approaching)</p>
                <p className='text-gray-700 leading-relaxed mb-4'>
                  {selectedTaskData.description || 'No description available'}
                </p>
                <Separator className='my-6' />

                <div className='flex gap-6 mb-8'>
                  <div className='flex flex-col  w-1/2 gap-4'>
                    <div className='flex items-center space-x-2'>
                      <User className='w-4 h-4 text-blue-700' />
                      <span className='text-sm font-semibold'>Assignee:</span>
                      <span className='text-sm font-medium'>
                        {selectedTaskData.assignees.length > 0 ? selectedTaskData.assignees[0].user.name : 'Unassigned'}
                      </span>
                      <Avatar className='w-6 h-6'>
                        <AvatarImage
                          src={
                            selectedTaskData.assignees.length > 0 ? selectedTaskData.assignees[0].user.avatar_url : ''
                          }
                        />
                        <AvatarFallback className='text-xs'>
                          {selectedTaskData.assignees.length > 0
                            ? selectedTaskData.assignees[0].user.name.charAt(0)
                            : 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Tag className='w-4 h-4 text-blue-700' />
                      <span className='text-sm font-semibold'>Status:</span>
                      <Badge
                        className={`${getStatusStyles(selectedTaskData.status).statusColor} text-white text-xs rounded-2xl px-2 py-1`}
                      >
                        {getStatusStyles(selectedTaskData.status).displayText}
                      </Badge>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center space-x-2'>
                      <Calendar className='w-4 h-4 text-blue-700' />
                      <span className='text-sm font-semibold'>Deadline:</span>
                      <span className='text-sm font-medium text-red-600'>{formatDate(selectedTaskData.due_at)}</span>
                    </div>
                    <div></div>
                    <div className='flex items-center space-x-2'>
                      <Star className='w-4 h-4 text-blue-700' />
                      <span className='text-sm font-semibold'>Priority:</span>
                      <Badge
                        className={`${getPriorityStyles(selectedTaskData.priority).priorityColor}  text-xs rounded-2xl px-2 py-1`}
                      >
                        {getPriorityStyles(selectedTaskData.priority).displayText}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator className='my-6' />

                {/* Checklist */}
                <div className='mb-8'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                    Checklist (
                    {selectedTaskData.checklists.filter((c) => c.is_completed && c.status === 'active').length}/
                    {selectedTaskData.checklists.filter((c) => c.status === 'active').length})
                  </h3>
                  <div className='space-y-3 mb-4'>
                    {selectedTaskData.checklists
                      .filter((c) => c.status === 'active')
                      .map((item) => (
                        <ChecklistItem
                          key={item.id}
                          checklist={item}
                          taskId={selectedTaskData.id}
                          onSuccess={refreshTasks}
                        />
                      ))}
                  </div>

                  <AddChecklistItem taskId={selectedTaskData.id} onSuccess={refreshTasks} />
                </div>

                <Separator className='my-6' />

                {/* Activity Log */}
                <div className='mb-8'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-4'>Activity Log (3)</h3>
                  <div className='space-y-3'>
                    {activityLog.map((activity, index) => (
                      <div key={index} className='flex items-center space-x-3'>
                        <div className='flex items-center justify-center'>
                          {activity.type === 'create' && <Plus className='w-5 h-5 text-blue-600' />}
                          {activity.type === 'status' && <CircleDotDashed className='w-5 h-5 text-blue-600' />}
                          {activity.type === 'comment' && <MessageSquare className='w-5 h-5 text-blue-600' />}
                        </div>

                        {/* nội dung + time cùng hàng */}
                        <div className=' flex  items-center'>
                          <p className='text-sm text-gray-900 mr-1'>
                            <span className='font-medium'>{activity.user}</span> {activity.action}
                          </p>
                          <span className='text-xs text-gray-500'>{activity.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className='my-6' />

                {/* Comments */}
                <div className='mb-8'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                    Comments (
                    {selectedTaskData.contents.filter((c) => c.type === 'comment' && c.status === 'active').length})
                  </h3>
                  <div className='space-y-4 mb-4'>
                    {selectedTaskData.contents
                      .filter((c) => c.type === 'comment' && c.status === 'active')
                      .map((comment) => (
                        <TaskContentItem
                          key={comment.id}
                          content={comment}
                          currentUserId={currentUserId}
                          onSuccess={refreshTasks}
                          formatDate={formatDate}
                        />
                      ))}
                  </div>

                  <Separator className='my-6' />

                  <CreateTaskContentForm
                    taskId={selectedTaskData.id}
                    userId={currentUserId}
                    type='comment'
                    onSuccess={refreshTasks}
                  />
                </div>

                <Separator className='my-6' />

                {/* Notes */}
                <div className='mb-8'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-4'>Notes</h3>

                  {/* Display existing notes */}
                  <div className='space-y-4 mb-4'>
                    {selectedTaskData.contents
                      .filter((c) => c.type === 'note' && c.status === 'active')
                      .map((note) => (
                        <TaskContentItem
                          key={note.id}
                          content={note}
                          currentUserId={currentUserId}
                          onSuccess={refreshTasks}
                          formatDate={formatDate}
                        />
                      ))}
                  </div>

                  <Separator className='my-6' />

                  {/* Add Note Form */}
                  <CreateTaskContentForm
                    taskId={selectedTaskData.id}
                    userId={currentUserId}
                    type='note'
                    onSuccess={refreshTasks}
                    placeholder='Add a note...'
                    buttonText='Add Note'
                  />
                </div>

                <Separator className='my-6' />

                {/* Attachments */}
                <div>
                  <div className='flex items-center justify-between mb-4'>
                    <h3 className='text-lg font-semibold text-gray-900'>
                      Attachments ({filesLoading ? '...' : taskFiles.length})
                    </h3>
                  </div>
                  <div className='space-y-3'>
                    {filesLoading ? (
                      <div className='flex items-center justify-center p-8'>
                        <Loader2 className='w-6 h-6 animate-spin text-blue-600' />
                      </div>
                    ) : taskFiles.length > 0 ? (
                      taskFiles.map((file) => (
                        <div key={file.id} className='flex items-center justify-between p-3 rounded-lg'>
                          <div className='flex items-center space-x-3'>
                            <div className='w-8 h-8 rounded flex items-center justify-center'>
                              <Paperclip className='w-4 h-4 text-blue-600' />
                            </div>
                            <div>
                              <p className='text-sm font-medium text-gray-900'>{file.file_name}</p>
                              <p className='text-xs text-gray-500'>{formatFileSize(file.file_size)}</p>
                            </div>
                          </div>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => handleDownloadFile(file.file_url, file.file_name)}
                          >
                            <Download className='w-4 h-4 mr-2' />
                            Download
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p className='text-sm text-gray-500 text-center py-4'>No attachments</p>
                    )}
                    <input
                      ref={fileInputRef}
                      type='file'
                      className='hidden'
                      onChange={handleFileUpload}
                      disabled={uploadingFile}
                    />
                    <Button
                      variant='outline'
                      size='sm'
                      className='w-full mt-2'
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingFile}
                    >
                      {uploadingFile ? (
                        <>
                          <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className='w-4 h-4 mr-2' />
                          Upload Attachment
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
