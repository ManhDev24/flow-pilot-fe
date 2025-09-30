import { useDraggable } from '@dnd-kit/core'
import { Card } from '@/app/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import { Button } from '@/app/components/ui/button'
import { MessageSquare, Edit2 } from 'lucide-react'

interface Tag {
  label: string
  color: string
}

interface KanbanCardProps {
  id: string
  image?: string
  title: string
  tags: Tag[]
  subtasks: number
  comments: number
  avatars: string[]
  onEdit?: () => void
}

const tagColors: Record<string, string> = {
  purple: 'bg-purple-100 text-purple-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  pink: 'bg-pink-100 text-pink-700',
  red: 'bg-red-100 text-red-700',
  green: 'bg-green-100 text-green-700',
  blue: 'bg-blue-100 text-blue-700'
}

export function KanbanCard({ id, image, title, tags, subtasks, comments, avatars, onEdit }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : undefined

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`overflow-hidden border border-border bg-card p-0 shadow-sm transition-all hover:shadow-md ${
        isDragging ? 'cursor-grabbing opacity-50' : 'cursor-grab'
      }`}
    >
      {image && (
        <div className='relative h-40 w-full bg-muted'>
          <img src={image} alt={title} className='object-cover w-full h-full' />
        </div>
      )}
      <div className='p-4'>
        <div className='flex justify-between items-start mb-3'>
          <h3 className='text-sm font-medium leading-snug text-card-foreground flex-1 pr-2'>{title}</h3>
          {onEdit && (
            <Button
              size='sm'
              variant='ghost'
              onClick={(e) => {
                e.stopPropagation()
                onEdit()
              }}
              className='p-1 h-6 w-6 opacity-60 hover:opacity-100'
            >
              <Edit2 className='h-3 w-3' />
            </Button>
          )}
        </div>
        <div className='mb-3 flex flex-wrap gap-2'>
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`rounded-full px-2 py-1 text-xs font-medium ${tagColors[tag.color] || 'bg-gray-100 text-gray-700'}`}
            >
              {tag.label}
            </span>
          ))}
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3 text-xs text-muted-foreground'>
            <div className='flex items-center gap-1'>
              <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                />
              </svg>
              <span>{subtasks}</span>
            </div>
            <div className='flex items-center gap-1'>
              <MessageSquare className='h-4 w-4' />
              <span>{comments}</span>
            </div>
          </div>
          <div className='flex -space-x-2'>
            {avatars.map((avatar, index) => (
              <Avatar key={index} className='h-6 w-6 border-2 border-card'>
                <AvatarImage src={avatar || '/placeholder.svg'} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
