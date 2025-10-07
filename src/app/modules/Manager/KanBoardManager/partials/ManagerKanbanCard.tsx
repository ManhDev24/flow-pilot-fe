import { useDraggable } from '@dnd-kit/core'
import { Card } from '@/app/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import { Button } from '@/app/components/ui/button'
import { MessageSquare, ThumbsUp, ThumbsDown, Eye } from 'lucide-react'
import type { MyTask } from '@/app/modules/Employee/MyTasks/models/myTask.type'

interface Tag {
  label: string
  color: string
}

interface ManagerKanbanCardProps {
  id: string
  image?: string
  title: string
  tags: Tag[]
  subtasks: number
  comments: number
  avatars: string[]
  originalTask: MyTask
  onViewDetail?: () => void
  onReview?: (taskId: string, taskOwnerId: string) => void
  onReject?: (taskId: string) => void
}

const tagColors: Record<string, string> = {
  purple: 'bg-purple-100 text-purple-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  pink: 'bg-pink-100 text-pink-700',
  red: 'bg-red-100 text-red-700',
  green: 'bg-green-100 text-green-700',
  blue: 'bg-blue-100 text-blue-700',
  gray: 'bg-gray-100 text-gray-700'
}

export function ManagerKanbanCard({
  id,
  image,
  title,
  tags,
  subtasks,
  comments,
  avatars,
  originalTask,
  onViewDetail,
  onReview,
  onReject
}: ManagerKanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : undefined

  const isReviewing = originalTask.status === 'reviewing'
  const taskOwnerId = originalTask.assignees[0]?.user?.id || ''

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`overflow-hidden border border-border bg-card p-0 shadow-sm transition-all hover:shadow-md ${
        isDragging ? 'cursor-grabbing opacity-50' : 'cursor-grab'
      } ${isReviewing ? 'ring-2 ring-purple-500 ring-opacity-50' : ''}`}
    >
      {image && (
        <div className='h-32 overflow-hidden'>
          <img src={image} alt='Task image' className='h-full w-full object-cover' />
        </div>
      )}

      <div className='p-3'>
        <h3 className='mb-2 line-clamp-2 text-sm font-medium'>{title}</h3>

        <div className='mb-3 flex flex-wrap gap-1'>
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`rounded-full px-2 py-1 text-xs font-medium ${tagColors[tag.color] || tagColors.gray}`}
            >
              {tag.label}
            </span>
          ))}
          {isReviewing && (
            <span className='rounded-full px-2 py-1 text-xs font-bold bg-purple-200 text-purple-800 border border-purple-500'>
              🔍 REVIEWING
            </span>
          )}
        </div>

        <div className='mb-3 flex items-center justify-between text-xs text-muted-foreground'>
          <div className='flex items-center gap-3'>
            <span>📋 {subtasks}</span>
            <div className='flex items-center gap-1'>
              <MessageSquare className='h-3 w-3' />
              <span>{comments}</span>
            </div>
          </div>

          <div className='flex -space-x-1'>
            {avatars.slice(0, 3).map((avatar, index) => (
              <Avatar key={index} className='h-5 w-5 border border-background'>
                <AvatarImage src={avatar} />
                <AvatarFallback className='text-xs'>U</AvatarFallback>
              </Avatar>
            ))}
            {avatars.length > 3 && (
              <div className='flex h-5 w-5 items-center justify-center rounded-full border border-background bg-muted text-xs'>
                +{avatars.length - 3}
              </div>
            )}
          </div>
        </div>

        {/* Manager Actions for Reviewing Tasks */}
        {isReviewing && (
          <div className='pt-2 border-t border-gray-200'>
            <div className='flex gap-2'>
              <Button
                size='sm'
                variant='default'
                className='flex-1 h-7 text-xs bg-green-600 hover:bg-green-700'
                onClick={(e) => {
                  e.stopPropagation()
                  onReview?.(id, taskOwnerId)
                }}
              >
                <ThumbsUp className='h-3 w-3 mr-1' />
                Review
              </Button>
              <Button
                size='sm'
                variant='destructive'
                className='flex-1 h-7 text-xs'
                onClick={(e) => {
                  e.stopPropagation()
                  onReject?.(id)
                }}
              >
                <ThumbsDown className='h-3 w-3 mr-1' />
                Reject
              </Button>
              <Button
                size='sm'
                variant='outline'
                className='h-7 px-2'
                onClick={(e) => {
                  e.stopPropagation()
                  onViewDetail?.()
                }}
              >
                <Eye className='h-3 w-3' />
              </Button>
            </div>
          </div>
        )}

        {/* Regular View Detail Button for non-reviewing tasks */}
        {!isReviewing && onViewDetail && (
          <div className='pt-2 border-t border-gray-200'>
            <Button
              size='sm'
              variant='outline'
              className='w-full h-7 text-xs'
              onClick={(e) => {
                e.stopPropagation()
                onViewDetail()
              }}
            >
              <Eye className='h-3 w-3 mr-1' />
              View Details
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
