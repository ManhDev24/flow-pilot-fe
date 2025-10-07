import { useState, useEffect } from 'react'
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
import type { MyTask } from '@/app/modules/Employee/MyTasks/models/myTask.type'

// Validation schema
const taskUpdateSchema = yup.object({
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

type TaskUpdateFormData = {
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

interface TaskUpdateFormProps {
  task: MyTask
  onSuccess?: () => void
  onCancel?: () => void
}

export function TaskUpdateForm({ task, onSuccess, onCancel }: TaskUpdateFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  // Check if task is in final state (cannot be edited)
  const isTaskFinalized = task.status === 'feedbacked' || task.status === 'rejected'

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TaskUpdateFormData>({
    resolver: yupResolver(taskUpdateSchema) as any,
    defaultValues: {
      project_id: task.project_id || '',
      name: task.name || '',
      description: task.description || '',
      start_at: task.start_at ? new Date(task.start_at).toISOString().slice(0, 16) : '',
      due_at: task.due_at ? new Date(task.due_at).toISOString().slice(0, 16) : '',
      time_spent_in_minutes: task.time_spent_in_minutes || 0,
      priority: task.priority as 'low' | 'medium' | 'high',
      status: task.status,
      image_url: task.image_url || ''
    }
  })

  const onSubmit = async (data: TaskUpdateFormData) => {
    try {
      setIsLoading(true)

      const updateData = {
        name: data.name,
        description: data.description,
        start_at: new Date(data.start_at).toISOString(),
        due_at: new Date(data.due_at).toISOString(),
        priority: data.priority,
        status: data.status
      }

      const response = await MyTaskApi.updateTask(task.id, updateData)

      if (response.success) {
        toast.success('Task updated successfully!')
        onSuccess?.()
      }
    } catch (error: any) {
      console.error('Error updating task:', error)
      const message = error?.response?.data?.message || 'Failed to update task'
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
        <CardTitle>Update Task</CardTitle>
        {isTaskFinalized && (
          <div className='bg-yellow-50 border border-yellow-200 rounded-md p-3 mt-2'>
            <div className='flex'>
              <div className='text-yellow-600'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <h3 className='text-sm font-medium text-yellow-800'>Task Cannot Be Modified</h3>
                <div className='mt-1 text-sm text-yellow-700'>
                  This task has been {task.status === 'feedbacked' ? 'feedbacked' : 'rejected'} and cannot be modified
                  further.
                </div>
              </div>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-1'>Task Name *</label>
            <Controller
              name='name'
              control={control}
              render={({ field }) => <Input placeholder='Enter task name' disabled={isTaskFinalized} {...field} />}
            />
            {errors.name && <p className='text-sm text-red-500 mt-1'>{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className='block text-sm font-medium mb-1'>Description</label>
            <Controller
              name='description'
              control={control}
              render={({ field }) => (
                <Textarea placeholder='Enter task description' rows={3} disabled={isTaskFinalized} {...field} />
              )}
            />
            {errors.description && <p className='text-sm text-red-500 mt-1'>{errors.description.message}</p>}
          </div>

          {/* Time Spent */}
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

          {/* Dates */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>Start Date *</label>
              <Controller
                name='start_at'
                control={control}
                render={({ field }) => <Input type='datetime-local' disabled={isTaskFinalized} {...field} />}
              />
              {errors.start_at && <p className='text-sm text-red-500 mt-1'>{errors.start_at.message}</p>}
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Due Date *</label>
              <Controller
                name='due_at'
                control={control}
                render={({ field }) => <Input type='datetime-local' disabled={isTaskFinalized} {...field} />}
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
                  <Select value={field.value} onValueChange={field.onChange} disabled={isTaskFinalized}>
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
          </div>

          {/* Image URL */}
          {/* <div>
            <label className='block text-sm font-medium mb-1'>Image URL</label>
            <Controller
              name='image_url'
              control={control}
              render={({ field }) => <Input placeholder='Enter image URL' {...field} />}
            />
            {errors.image_url && <p className='text-sm text-red-500 mt-1'>{errors.image_url.message}</p>}
          </div> */}

          {/* Task Image File */}
          <div>
            <label className='block text-sm font-medium mb-2'>Task Image File</label>
            <Input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              className='mb-2'
              disabled={isTaskFinalized}
            />
            {selectedImage && <p className='text-sm text-gray-600'>Selected: {selectedImage.name}</p>}
          </div>

          {/* Actions */}
          <div className='flex justify-end space-x-2 pt-4'>
            <Button type='button' variant='outline' onClick={onCancel} disabled={isLoading}>
              {isTaskFinalized ? 'Close' : 'Cancel'}
            </Button>
            {!isTaskFinalized && (
              <Button type='submit' disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Task'}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
