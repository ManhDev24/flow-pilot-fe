import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Textarea } from '@/app/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { Label } from '@/app/components/ui/label'
import { CalendarIcon, TrashIcon } from 'lucide-react'
import type { Card, Tag } from './KanbanBoardForm'

interface TaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'add' | 'edit'
  task?: Card
  onSave: (task: Omit<Card, 'id'> & { id?: string }) => void
  onDelete?: (taskId: string) => void
}

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' }
]

const statusOptions = [
  { value: 'not-ready', label: 'Not Ready' },
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' }
]

const assigneeOptions = [
  { value: 'charlie-brown', label: 'Charlie Brown' },
  { value: 'john-doe', label: 'John Doe' },
  { value: 'jane-smith', label: 'Jane Smith' },
  { value: 'mike-johnson', label: 'Mike Johnson' }
]

const availableTags = [
  { label: 'Backend', color: 'red' },
  { label: 'Frontend', color: 'yellow' },
  { label: 'Security', color: 'purple' },
  { label: 'Research', color: 'purple' },
  { label: 'Urgent', color: 'yellow' },
  { label: 'Improvement', color: 'pink' },
  { label: 'Testing', color: 'green' },
  { label: 'Backlog', color: 'red' },
  { label: 'Feature', color: 'purple' },
  { label: 'Design', color: 'blue' },
  { label: 'Medium', color: 'purple' }
]

export function TaskDialog({ open, onOpenChange, mode, task, onSave, onDelete }: TaskDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'todo',
    priority: 'medium',
    assignee: 'charlie-brown',
    tags: [] as Tag[],
    subtasks: 0,
    comments: 0,
    avatars: ['https://i.pravatar.cc/150?img=1'] as string[]
  })

  const [selectedTagLabels, setSelectedTagLabels] = useState<string>('')

  useEffect(() => {
    if (mode === 'edit' && task) {
      setFormData({
        title: task.title,
        description: '', // Add description field to Card interface if needed
        dueDate: 'July 10th, 2024', // Add dueDate field to Card interface if needed
        status: 'in-progress', // Determine status based on column
        priority: 'high', // Add priority field to Card interface if needed
        assignee: 'charlie-brown', // Add assignee field to Card interface if needed
        tags: task.tags,
        subtasks: task.subtasks,
        comments: task.comments,
        avatars: task.avatars
      })
      setSelectedTagLabels(task.tags.map((t) => t.label).join(', '))
    } else {
      // Reset form for add mode
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        status: 'todo',
        priority: 'medium',
        assignee: 'charlie-brown',
        tags: [],
        subtasks: 0,
        comments: 0,
        avatars: ['https://i.pravatar.cc/150?img=1']
      })
      setSelectedTagLabels('')
    }
  }, [mode, task, open])

  const handleSave = () => {
    // Parse tags from comma-separated string
    const parsedTags = selectedTagLabels
      .split(',')
      .map((label) => label.trim())
      .filter((label) => label)
      .map((label) => {
        const tagDef = availableTags.find((t) => t.label.toLowerCase() === label.toLowerCase())
        return tagDef || { label, color: 'gray' }
      })

    const taskData = {
      ...(mode === 'edit' && task ? { id: task.id } : {}),
      title: formData.title,
      tags: parsedTags,
      subtasks: formData.subtasks,
      comments: formData.comments,
      avatars: formData.avatars,
      image: task?.image // Preserve existing image
    }

    onSave(taskData)
    onOpenChange(false)
  }

  const handleDelete = () => {
    if (mode === 'edit' && task && onDelete) {
      onDelete(task.id)
      onOpenChange(false)
    }
  }

  const handleInputChange = (field: string, value: string | number | Tag[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-left'>{mode === 'add' ? 'Add Task' : 'Edit Task'}</DialogTitle>
          <p className='text-sm text-muted-foreground text-left'>
            {mode === 'add'
              ? 'Create a task here for employee. Click create when you done'
              : "Make changes to your task here. Click save when you're done."}
          </p>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='taskName'>Task Name</Label>
            <Input
              id='taskName'
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder='Enter task name'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder='Enter task description'
              className='min-h-[80px]'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='dueDate'>Due Date</Label>
            <div className='relative'>
              <Input
                id='dueDate'
                value={formData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                placeholder='Select due date'
              />
              <CalendarIcon className='absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='status'>Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder='Select status' />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='priority'>Priority</Label>
            <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
              <SelectTrigger>
                <SelectValue placeholder='Select priority' />
              </SelectTrigger>
              <SelectContent>
                {priorityOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='assignee'>Assignee</Label>
            <Select value={formData.assignee} onValueChange={(value) => handleInputChange('assignee', value)}>
              <SelectTrigger>
                <SelectValue placeholder='Select assignee' />
              </SelectTrigger>
              <SelectContent>
                {assigneeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='tags'>Tags</Label>
            <Input
              id='tags'
              value={selectedTagLabels}
              onChange={(e) => setSelectedTagLabels(e.target.value)}
              placeholder='Enter tags separated by commas'
            />
          </div>
        </div>

        <div className='flex justify-between pt-4'>
          <div className='flex gap-2'>
            <Button variant='outline' onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            {mode === 'edit' && onDelete && (
              <Button variant='destructive' onClick={handleDelete}>
                <TrashIcon className='h-4 w-4 mr-2' />
                Delete
              </Button>
            )}
          </div>
          <Button onClick={handleSave}>{mode === 'add' ? 'Create Task' : 'Save Task'}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
