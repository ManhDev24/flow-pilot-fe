import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'
import { Textarea } from '@/app/components/ui/textarea'
import { MyTaskApi } from '@/app/apis/AUTH/task-emp.api'
import { toast } from 'react-toastify'

// Validation schema for reject
const rejectSchema = yup.object({
  reason: yup.string().required('Reject reason is required').min(5, 'Reason must be at least 5 characters'),
  notes: yup.string().required('Reject notes are required').min(10, 'Notes must be at least 10 characters')
})

type RejectFormData = {
  reason: string
  notes: string
}

interface RejectFormProps {
  taskId: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function RejectForm({ taskId, onSuccess, onCancel }: RejectFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RejectFormData>({
    resolver: yupResolver(rejectSchema),
    defaultValues: {
      reason: '',
      notes: ''
    }
  })

  const onSubmit = async (data: RejectFormData) => {
    try {
      setIsLoading(true)

      const rejectData = {
        task_id: taskId,
        reason: data.reason,
        notes: data.notes
      }

      const response = await MyTaskApi.rejectTask(rejectData)

      if (response.success) {
        toast.success('Task rejected successfully!')
        onSuccess?.()
        reset()
      }
    } catch (error: any) {
      console.error('Error rejecting task:', error)
      const message = error?.response?.data?.message || 'Failed to reject task'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>Reject Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {/* Reason */}
          <div>
            <label className='block text-sm font-medium mb-1'>Reject Reason *</label>
            <Controller
              name='reason'
              control={control}
              render={({ field }) => <Input placeholder='Enter reason for rejection' {...field} />}
            />
            {errors.reason && <p className='text-sm text-red-500 mt-1'>{errors.reason.message}</p>}
          </div>

          {/* Notes */}
          <div>
            <label className='block text-sm font-medium mb-1'>Detailed Notes *</label>
            <Controller
              name='notes'
              control={control}
              render={({ field }) => (
                <Textarea placeholder='Provide detailed feedback for the rejection...' rows={4} {...field} />
              )}
            />
            {errors.notes && <p className='text-sm text-red-500 mt-1'>{errors.notes.message}</p>}
          </div>

          {/* Actions */}
          <div className='flex justify-end space-x-2 pt-4'>
            <Button type='button' variant='outline' onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button type='submit' disabled={isLoading} variant='destructive'>
              {isLoading ? 'Rejecting...' : 'Reject Task'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
