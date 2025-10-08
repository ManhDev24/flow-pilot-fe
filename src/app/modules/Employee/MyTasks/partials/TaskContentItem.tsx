import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { Textarea } from '@/app/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import { MyTaskApi } from '@/app/apis/AUTH/task-emp.api'
import { Edit, Trash2, Check, X, Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'
import type { Content } from '../models/myTask.type'
import { ConfirmDeleteDialog } from './ConfirmDeleteDialog'

interface TaskContentItemProps {
  content: Content
  currentUserId: string
  onSuccess?: () => void
  formatDate: (dateString: string) => string
}

export function TaskContentItem({ content, currentUserId, onSuccess, formatDate }: TaskContentItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(content.content)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleEdit = async () => {
    if (!editContent.trim()) {
      toast.error('Content cannot be empty')
      return
    }

    try {
      setIsSubmitting(true)
      await MyTaskApi.updateTaskContent(
        content.id,
        content.task_id,
        content.user_id,
        editContent.trim(),
        content.type,
        'active'
      )

      setIsEditing(false)
      toast.success(`${content.type === 'comment' ? 'Comment' : 'Note'} updated successfully`)
      onSuccess?.()
    } catch (error) {
      console.error('Error updating content:', error)
      toast.error(`Failed to update ${content.type}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await MyTaskApi.deleteTaskContent(content.id)

      toast.success(`${content.type === 'comment' ? 'Comment' : 'Note'} deleted successfully`)
      setShowDeleteDialog(false)
      onSuccess?.()
    } catch (error) {
      console.error('Error deleting content:', error)
      toast.error(`Failed to delete ${content.type}`)
    } finally {
      setIsDeleting(false)
    }
  }

  const canEdit = content.user_id === currentUserId

  return (
    <div className='flex space-x-3'>
      <Avatar className='w-8 h-8'>
        <AvatarImage src={content.user.avatar_url} />
        <AvatarFallback>{content.user.name.slice(0, 1).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className='flex-1'>
        <div className='p-3'>
          <div className='flex items-center justify-between mb-1'>
            <p className='text-sm font-semibold text-gray-900'> {content.user.name}</p>
            {canEdit && !isEditing && (
              <div className='flex items-center gap-1'>
                <Button variant='ghost' size='sm' onClick={() => setIsEditing(true)} className='h-6 w-6 p-0'>
                  <Edit className='w-3 h-3' />
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => setShowDeleteDialog(true)}
                  disabled={isDeleting}
                  className='h-6 w-6 p-0 text-red-500 hover:text-red-700'
                >
                  {isDeleting ? <Loader2 className='w-3 h-3 animate-spin' /> : <Trash2 className='w-3 h-3' />}
                </Button>
              </div>
            )}
          </div>

          {isEditing ? (
            <div className='space-y-2'>
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className='text-sm'
                disabled={isSubmitting}
              />
              <div className='flex items-center gap-2'>
                <Button
                  size='sm'
                  onClick={handleEdit}
                  disabled={isSubmitting || !editContent.trim()}
                  className='h-7 px-2'
                >
                  {isSubmitting ? (
                    <Loader2 className='w-3 h-3 animate-spin mr-1' />
                  ) : (
                    <Check className='w-3 h-3 mr-1' />
                  )}
                  Save
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    setIsEditing(false)
                    setEditContent(content.content)
                  }}
                  disabled={isSubmitting}
                  className='h-7 px-2'
                >
                  <X className='w-3 h-3 mr-1' />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <span className='inline-flex items-baseline flex-wrap'>
              <span className='text-sm text-gray-700'>{content.content}</span>
              <span className='text-xs text-gray-500 ml-2'>{formatDate(content.created_at)}</span>
            </span>
          )}
        </div>
      </div>

      <ConfirmDeleteDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title={`Confirm Delete ${content.type === 'comment' ? 'Comment' : 'Note'}`}
        description={`Are you sure you want to delete this ${content.type}`}
        isLoading={isDeleting}
      />
    </div>
  )
}
