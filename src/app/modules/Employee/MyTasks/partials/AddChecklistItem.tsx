import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { MyTaskApi } from '@/app/apis/AUTH/task-emp.api'
import { Plus, Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'

interface AddChecklistItemProps {
  taskId: string
  onSuccess?: () => void
}

export function AddChecklistItem({ taskId, onSuccess }: AddChecklistItemProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [title, setTitle] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      toast.error('Title cannot be empty')
      return
    }

    try {
      setIsSubmitting(true)
      await MyTaskApi.createChecklistItem(taskId, title.trim(), 'active', false)

      setTitle('')
      setIsAdding(false)
      toast.success('Checklist item added successfully')
      onSuccess?.()
    } catch (error) {
      console.error('Error creating checklist:', error)
      toast.error('Failed to add checklist item')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isAdding) {
    return (
      <Button
        variant='ghost'
        size='sm'
        onClick={() => setIsAdding(true)}
        className='flex items-center gap-2 text-blue-600 hover:text-blue-700'
      >
        <Plus className='w-4 h-4' />
        Add checklist item
      </Button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Enter checklist item...'
        className='text-sm'
        disabled={isSubmitting}
        autoFocus
      />
      <Button type='submit' size='sm' disabled={isSubmitting || !title.trim()} className='h-8 px-3'>
        {isSubmitting ? <Loader2 className='w-3 h-3 animate-spin' /> : 'Add'}
      </Button>
      <Button
        type='button'
        variant='outline'
        size='sm'
        onClick={() => {
          setIsAdding(false)
          setTitle('')
        }}
        disabled={isSubmitting}
        className='h-8 px-3'
      >
        Cancel
      </Button>
    </form>
  )
}
