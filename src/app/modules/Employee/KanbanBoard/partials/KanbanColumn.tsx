import type { Column } from '@/app/modules/Employee/KanbanBoard/partials/KanbanBoardForm'
import { KanbanCard } from '@/app/modules/Employee/KanbanBoard/partials/KanbanCard'
import { useDroppable } from '@dnd-kit/core'
import { MoreHorizontal } from 'lucide-react'

interface KanbanColumnProps {
  column: Column
}

export function KanbanColumn({ column }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id
  })

  return (
    <div className='flex flex-col'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-sm font-semibold'>{column.title}</h2>
        <button className='rounded p-1 hover:bg-muted'>
          <MoreHorizontal className='h-4 w-4 text-muted-foreground' />
        </button>
      </div>
      <div
        ref={setNodeRef}
        className={`min-h-[200px] space-y-3 rounded-lg transition-colors ${isOver ? 'bg-muted/50' : ''}`}
      >
        {column.cards.map((card) => (
          <KanbanCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  )
}
