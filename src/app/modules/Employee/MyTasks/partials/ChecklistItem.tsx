import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Checkbox } from '@/app/components/ui/checkbox'
import { MyTaskApi } from '@/app/apis/AUTH/task-emp.api'
import { Edit, Trash2, Check, X, Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'
import type { Checklist } from '../models/myTask.type'

interface ChecklistItemProps {
  checklist: Checklist
  taskId: string
  onSuccess?: () => void
}

export function ChecklistItem({ checklist, taskId, onSuccess }: ChecklistItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(checklist.title)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isToggling, setIsToggling] = useState(false)

  const handleToggleComplete = async () => {
    try {
      setIsToggling(true)
      await MyTaskApi.updateChecklistItem(
        checklist.id.toString(),
        taskId,
        checklist.title,
        'active',
        !checklist.is_completed
      )

      toast.success(`Checklist item ${!checklist.is_completed ? 'completed' : 'unchecked'}`)
      onSuccess?.()
    } catch (error) {
      console.error('Error toggling checklist:', error)
      toast.error('Failed to update checklist')
    } finally {
      setIsToggling(false)
    }
  }

  const handleEdit = async () => {
    if (!editTitle.trim()) {
      toast.error('Title cannot be empty')
      return
    }

    try {
      setIsSubmitting(true)
      await MyTaskApi.updateChecklistItem(
        checklist.id.toString(),
        taskId,
        editTitle.trim(),
        'active',
        checklist.is_completed
      )

      setIsEditing(false)
      toast.success('Checklist item updated successfully')
      onSuccess?.()
    } catch (error) {
      console.error('Error updating checklist:', error)
      toast.error('Failed to update checklist')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this checklist item?')) {
      return
    }

    try {
      setIsDeleting(true)
      await MyTaskApi.updateChecklistItem(
        checklist.id.toString(),
        taskId,
        checklist.title,
        'inactive',
        checklist.is_completed
      )

      toast.success('Checklist item deleted successfully')
      onSuccess?.()
    } catch (error) {
      console.error('Error deleting checklist:', error)
      toast.error('Failed to delete checklist')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className='flex items-center space-x-3 group'>
      <Checkbox
        checked={checklist.is_completed}
        onCheckedChange={handleToggleComplete}
        disabled={isToggling}
        className='data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700'
      />

      <div className='flex-1'>
        {isEditing ? (
          <div className='flex items-center gap-2'>
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className='text-sm'
              disabled={isSubmitting}
              autoFocus
            />
            <Button size='sm' onClick={handleEdit} disabled={isSubmitting || !editTitle.trim()} className='h-7 px-2'>
              {isSubmitting ? <Loader2 className='w-3 h-3 animate-spin' /> : <Check className='w-3 h-3' />}
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => {
                setIsEditing(false)
                setEditTitle(checklist.title)
              }}
              disabled={isSubmitting}
              className='h-7 px-2'
            >
              <X className='w-3 h-3' />
            </Button>
          </div>
        ) : (
          <div className='flex items-center justify-between'>
            <span className={`text-sm ${checklist.is_completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
              {checklist.title}
            </span>

            <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
              <Button variant='ghost' size='sm' onClick={() => setIsEditing(true)} className='h-6 w-6 p-0'>
                <Edit className='w-3 h-3' />
              </Button>
              <Button
                variant='ghost'
                size='sm'
                onClick={handleDelete}
                disabled={isDeleting}
                className='h-6 w-6 p-0 text-red-500 hover:text-red-700'
              >
                {isDeleting ? <Loader2 className='w-3 h-3 animate-spin' /> : <Trash2 className='w-3 h-3' />}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
