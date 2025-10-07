import { MyTaskApi } from '@/app/apis/AUTH/task-emp.api'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { Textarea } from '@/app/components/ui/textarea'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'

// ✅ Validation schema
const reviewSchema = yup.object({
  task_owner_id: yup.string().required('Task owner ID is required'),
  quality_score: yup.number().required('Quality score is required').min(1),
  notes: yup.string().required('Review notes are required').min(1)
})

type ReviewFormData = {
  task_owner_id: string
  quality_score: number
  notes: string
}

interface ReviewFormProps {
  taskId: string
  taskOwnerId: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function ReviewForm({ taskId, taskOwnerId, onSuccess, onCancel }: ReviewFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  // ✅ Bật chế độ validation realtime
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm<ReviewFormData>({
    resolver: yupResolver(reviewSchema),
    mode: 'onChange', // 👈 quan trọng
    defaultValues: {
      task_owner_id: taskOwnerId,
      quality_score: 5,
      notes: ''
    }
  })

  // ✅ Chắc chắn rằng hàm này chạy
  const onSubmit = async (data: ReviewFormData) => {
    console.log('✅ Form submitted with data:', data) // 👈 Nếu không thấy log này -> form không chạy
    try {
      setIsLoading(true)
      const reviewData = {
        task_id: taskId,
        task_owner_id: data.task_owner_id,
        quality_score: data.quality_score,
        notes: data.notes
      }

      console.log('📤 Sending review data to API:', reviewData)
      const response = await MyTaskApi.createReview(reviewData)
      console.log('✅ API response:', response)

      if (response.success) {
        toast.success('Review submitted successfully!')
        onSuccess?.()
        reset()
      }
    } catch (error: any) {
      console.error('❌ Error submitting review:', error)
      toast.error(error?.response?.data?.message || 'Failed to submit review')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>Review Task</CardTitle>
      </CardHeader>
      <CardContent>
        {/* 👇 FORM phải bọc toàn bộ nội dung */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className='space-y-4'>
          {/* Hidden owner */}
          <Controller
            name='task_owner_id'
            control={control}
            render={({ field }) => <input type='hidden' {...field} />}
          />

          {/* Quality score */}
          <div>
            <label className='block text-sm font-medium mb-1'>Quality Score (1–10) *</label>
            <Controller
              name='quality_score'
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  defaultValue={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select quality score' />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(10)].map((_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1} - {i + 1 <= 3 ? 'Poor' : i + 1 <= 6 ? 'Average' : i + 1 <= 8 ? 'Good' : 'Excellent'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.quality_score && <p className='text-sm text-red-500 mt-1'>{errors.quality_score.message}</p>}
          </div>

          {/* Notes */}
          <div>
            <label className='block text-sm font-medium mb-1'>Review Notes *</label>
            <Controller
              name='notes'
              control={control}
              render={({ field }) => <Textarea {...field} placeholder='Enter your review notes...' rows={4} />}
            />
            {errors.notes && <p className='text-sm text-red-500 mt-1'>{errors.notes.message}</p>}
          </div>

          {/* Actions */}
          <div className='flex justify-end space-x-2 pt-4'>
            <Button type='button' variant='outline' onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button type='submit' disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit Review'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
