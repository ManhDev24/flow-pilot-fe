import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { Textarea } from '@/app/components/ui/textarea'
import { MyTaskApi } from '@/app/apis/AUTH/task-emp.api'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'

interface CreateTaskContentFormProps {
  taskId: string
  userId: string
  type: 'comment' | 'note'
  onSuccess?: () => void
  placeholder?: string
  buttonText?: string
}

export function CreateTaskContentForm({
  taskId,
  userId,
  type,
  onSuccess,
  placeholder,
  buttonText
}: CreateTaskContentFormProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) {
      toast.error('Content cannot be empty')
      return
    }

    try {
      setIsSubmitting(true)
      await MyTaskApi.createTaskContent(taskId, userId, content.trim(), type, 'active')

      setContent('')
      toast.success(`${type === 'comment' ? 'Comment' : 'Note'} added successfully`)
      onSuccess?.()
    } catch (error) {
      console.error('Error creating task content:', error)
      toast.error(`Failed to add ${type}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const defaultPlaceholder = type === 'comment' ? 'Add a comment...' : 'Add a note...'
  const defaultButtonText = type === 'comment' ? 'Add Comment' : 'Add Note'

  return (
    <div className='flex space-x-3'>
      <div className='flex-1'>
        <form onSubmit={handleSubmit}>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder || defaultPlaceholder}
            className='mb-2'
            disabled={isSubmitting}
          />
          <Button
            type='submit'
            disabled={isSubmitting || !content.trim()}
            className='bg-indigo-600 hover:bg-indigo-700'
          >
            {isSubmitting ? (
              <>
                <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                Adding...
              </>
            ) : (
              buttonText || defaultButtonText
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
