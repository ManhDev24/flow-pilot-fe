import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'
import { Textarea } from '@/app/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { MyTaskApi } from '@/app/apis/AUTH/task-emp.api'
import { toast } from 'react-toastify'
import type { IUserStatePayload } from '@/app/models'
import { getLocalStorage } from '@/app/utils'

// Validation schema
const taskSchema = yup.object({
  project_id: yup.string().required('Project ID is required'),
  name: yup.string().required('Task name is required').min(2, 'Task name must be at least 2 characters'),
  description: yup.string().notRequired(),
  start_at: yup.string().required('Start date is required'),
  due_at: yup
    .string()
    .required('Due date is required')
    .test('due-after-start', 'Due date must be after start date', function (value) {
      const { start_at } = this.parent
      if (!value || !start_at) return true
      return new Date(value) > new Date(start_at)
    }),
  time_spent_in_minutes: yup.number().min(0, 'Time spent cannot be negative').default(0),
  priority: yup.string().oneOf(['low', 'medium', 'high'], 'Invalid priority').required('Priority is required'),
  status: yup
    .string()
    .oneOf(['todo', 'doing', 'reviewing', 'rejected', 'completed', 'feedbacked', 'overdued'], 'Invalid status')
    .required('Status is required'),
  image_url: yup.string().notRequired()
})

type TaskFormData = {
  project_id: string
  name: string
  description?: string
  start_at: string
  due_at: string
  time_spent_in_minutes: number
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'doing' | 'reviewing' | 'rejected' | 'completed' | 'feedbacked' | 'overdued'
  image_url?: string
}

interface TaskCreateFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export function TaskCreateForm({ onSuccess, onCancel }: TaskCreateFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const userLocalStorage: IUserStatePayload = getLocalStorage('user')
  const projectId = userLocalStorage.projectId
  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<TaskFormData>({
    resolver: yupResolver(taskSchema) as any,
    defaultValues: {
      project_id: projectId, // Default project ID
      name: '',
      description: '',
      start_at: '',
      due_at: '',
      time_spent_in_minutes: 0,
      priority: 'medium',
      status: 'todo',
      image_url: ''
    }
  })

  const onSubmit = async (data: TaskFormData) => {
    try {
      setIsLoading(true)

      const submitData = new FormData()
      submitData.append('project_id', data.project_id)
      submitData.append('name', data.name)
      if (data.description) {
        submitData.append('description', data.description)
      }
      submitData.append('start_at', new Date(data.start_at).toISOString())
      submitData.append('due_at', new Date(data.due_at).toISOString())
      submitData.append('time_spent_in_minutes', data.time_spent_in_minutes.toString())
      submitData.append('priority', data.priority)
      submitData.append('status', data.status)
      if (data.image_url) {
        submitData.append('image_url', data.image_url)
      }

      if (selectedImage) {
        submitData.append('taskImage', selectedImage)
      }

      const response = await MyTaskApi.createTask(submitData)

      if (response.success) {
        toast.success('Task created successfully!')
        onSuccess?.()
        // Reset form
        reset()
        setSelectedImage(null)
      }
    } catch (error: any) {
      console.error('Error creating task:', error)
      const message = error?.response?.data?.message || 'Failed to create task'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
    }
  }

  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <CardHeader>
        <CardTitle>Create New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-1'>Task Name *</label>
            <Controller
              name='name'
              control={control}
              render={({ field }) => <Input placeholder='Enter task name' {...field} />}
            />
            {errors.name && <p className='text-sm text-red-500 mt-1'>{errors.name.message}</p>}
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Description</label>
            <Controller
              name='description'
              control={control}
              render={({ field }) => <Textarea placeholder='Enter task description' rows={3} {...field} />}
            />
            {errors.description && <p className='text-sm text-red-500 mt-1'>{errors.description.message}</p>}
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Time Spent (minutes)</label>
            <Controller
              name='time_spent_in_minutes'
              control={control}
              render={({ field }) => (
                <Input
                  type='number'
                  min={0}
                  value={field.value === 0 ? '' : field.value}
                  onChange={(e) => {
                    const value = e.target.value
                    const parsed = value === '' ? 0 : parseInt(value)
                    field.onChange(parsed)
                  }}
                  placeholder='Enter time spent in minutes'
                />
              )}
            />
            {errors.time_spent_in_minutes && (
              <p className='text-sm text-red-500 mt-1'>{errors.time_spent_in_minutes.message}</p>
            )}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>Start Date *</label>
              <Controller
                name='start_at'
                control={control}
                render={({ field }) => <Input type='datetime-local' {...field} />}
              />
              {errors.start_at && <p className='text-sm text-red-500 mt-1'>{errors.start_at.message}</p>}
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Due Date *</label>
              <Controller
                name='due_at'
                control={control}
                render={({ field }) => <Input type='datetime-local' {...field} />}
              />
              {errors.due_at && <p className='text-sm text-red-500 mt-1'>{errors.due_at.message}</p>}
            </div>
          </div>

          {/* Priority and Status */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>Priority *</label>
              <Controller
                name='priority'
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select priority' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='low'>Low</SelectItem>
                      <SelectItem value='medium'>Medium</SelectItem>
                      <SelectItem value='high'>High</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.priority && <p className='text-sm text-red-500 mt-1'>{errors.priority.message}</p>}
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>Status *</label>
              <Controller
                name='status'
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='todo'>To Do</SelectItem>
                      <SelectItem value='doing'>Doing</SelectItem>
                      <SelectItem value='reviewing'>Reviewing</SelectItem>
                      <SelectItem value='rejected'>Rejected</SelectItem>
                      <SelectItem value='completed'>Completed</SelectItem>
                      <SelectItem value='feedbacked'>Feedbacked</SelectItem>
                      <SelectItem value='overdued'>Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && <p className='text-sm text-red-500 mt-1'>{errors.status.message}</p>}
            </div>
          </div>
          <div>
            <label className='block text-sm font-medium mb-2'>Task Image File</label>
            <Input type='file' accept='image/*' onChange={handleImageChange} className='mb-2' />
            {selectedImage && <p className='text-sm text-gray-600'>Selected: {selectedImage.name}</p>}
          </div>

          <div className='flex justify-end space-x-2 pt-4'>
            <Button type='button' variant='outline' onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button type='submit' disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Task'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
