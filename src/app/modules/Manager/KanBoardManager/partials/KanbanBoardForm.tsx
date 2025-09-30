import { FilterDialog } from './FilterDialog'
import { KanbanCard } from './KanbanCard'
import { KanbanColumn } from './KanbanColumn'
import { SortDialog } from './SortDialog'
import { TaskDialog } from './TaskDialog'
import { Button } from '@/app/components/ui/button'
import {
  closestCorners,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { useMemo, useState } from 'react'

export interface Tag {
  label: string
  color: string
}

export interface Card {
  id: string
  image?: string
  title: string
  tags: Tag[]
  subtasks: number
  comments: number
  avatars: string[]
}

export interface Column {
  id: string
  title: string
  cards: Card[]
}

const initialColumns: Column[] = [
  {
    id: 'not-ready',
    title: 'Not Ready',
    cards: [
      {
        id: '1',
        image: '/succulent-plant-in-mint-pot.jpg',
        title: 'Commodo ex esse in no',
        tags: [
          { label: 'Research', color: 'purple' },
          { label: 'Urgent', color: 'yellow' }
        ],
        subtasks: 3,
        comments: 1,
        avatars: [
          'https://i.pravatar.cc/150?img=1',
          'https://i.pravatar.cc/150?img=2',
          'https://i.pravatar.cc/150?img=3'
        ]
      },
      {
        id: '2',
        title: 'Reprehenderit adipisicing irur',
        tags: [{ label: 'Improvement', color: 'pink' }],
        subtasks: 3,
        comments: 1,
        avatars: ['https://i.pravatar.cc/150?img=4', 'https://i.pravatar.cc/150?img=5']
      },
      {
        id: '3',
        title: 'Cupidatat commodo incididun',
        tags: [
          { label: 'Improvement', color: 'yellow' },
          { label: 'Backend', color: 'red' }
        ],
        subtasks: 3,
        comments: 1,
        avatars: ['https://i.pravatar.cc/150?img=6', 'https://i.pravatar.cc/150?img=7']
      },
      {
        id: '4',
        title:
          'Voluptate amet nostrud veniam aliqua voluptate eu laboris non incididunt enim aute aliqua aliqua esse cillum',
        tags: [{ label: 'Frontend', color: 'yellow' }],
        subtasks: 3,
        comments: 1,
        avatars: ['https://i.pravatar.cc/150?img=8', 'https://i.pravatar.cc/150?img=9']
      }
    ]
  },
  {
    id: 'todo',
    title: 'To Do',
    cards: [
      {
        id: '5',
        title: 'Lorem labore ullamco a',
        tags: [
          { label: 'Testing', color: 'green' },
          { label: 'Backlog', color: 'red' }
        ],
        subtasks: 3,
        comments: 1,
        avatars: [
          'https://i.pravatar.cc/150?img=10',
          'https://i.pravatar.cc/150?img=11',
          'https://i.pravatar.cc/150?img=12'
        ]
      },
      {
        id: '6',
        title: 'Incididunt cillum non aliquip reprehenderit pariatur',
        tags: [{ label: 'Feature', color: 'purple' }],
        subtasks: 3,
        comments: 1,
        avatars: [
          'https://i.pravatar.cc/150?img=13',
          'https://i.pravatar.cc/150?img=14',
          'https://i.pravatar.cc/150?img=15'
        ]
      },
      {
        id: '7',
        title: 'Occaecat nulla qui voluptate',
        tags: [
          { label: 'Research', color: 'purple' },
          { label: 'Testing', color: 'green' }
        ],
        subtasks: 3,
        comments: 1,
        avatars: ['https://i.pravatar.cc/150?img=16', 'https://i.pravatar.cc/150?img=17']
      }
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    cards: [
      {
        id: '8',
        title: 'Ipsum amet nostrud exc',
        tags: [{ label: 'Backlog', color: 'purple' }],
        subtasks: 3,
        comments: 1,
        avatars: ['https://i.pravatar.cc/150?img=18', 'https://i.pravatar.cc/150?img=19']
      },
      {
        id: '9',
        image: '/cactus-in-orange-pot.jpg',
        title: 'In sunt proident officia pariatur lorem magna ex consequat',
        tags: [{ label: 'Medium', color: 'purple' }],
        subtasks: 3,
        comments: 1,
        avatars: ['https://i.pravatar.cc/150?img=20', 'https://i.pravatar.cc/150?img=21']
      },
      {
        id: '10',
        title: 'Duis ea aute ipsum nostrud laboris quis dolore consectetur cupidatat esse aute aliqua',
        tags: [
          { label: 'Design', color: 'purple' },
          { label: 'Improvement', color: 'pink' }
        ],
        subtasks: 3,
        comments: 1,
        avatars: [
          'https://i.pravatar.cc/150?img=22',
          'https://i.pravatar.cc/150?img=23',
          'https://i.pravatar.cc/150?img=24'
        ]
      },
      {
        id: '11',
        image: '/tall-cactus-in-beige-pot.jpg',
        title: 'Duis irure aliqua officia tempor in excepteur quis',
        tags: [{ label: 'Improvement', color: 'pink' }],
        subtasks: 3,
        comments: 1,
        avatars: ['https://i.pravatar.cc/150?img=25', 'https://i.pravatar.cc/150?img=26']
      }
    ]
  },
  {
    id: 'completed',
    title: 'Completed',
    cards: [
      {
        id: '12',
        image: '/purple-flowers-in-white-vases.jpg',
        title: 'Duis ea aute ipsum nostrud laboris quis dolore consectetur cupidatat esse aute aliqua',
        tags: [
          { label: 'Backlog', color: 'red' },
          { label: 'Backlog', color: 'pink' }
        ],
        subtasks: 3,
        comments: 1,
        avatars: [
          'https://i.pravatar.cc/150?img=27',
          'https://i.pravatar.cc/150?img=28',
          'https://i.pravatar.cc/150?img=29'
        ]
      },
      {
        id: '13',
        title: 'Mollit elit enim reprehenderit non exercitation mollit',
        tags: [
          { label: 'Design', color: 'blue' },
          { label: 'Backlog', color: 'pink' }
        ],
        subtasks: 3,
        comments: 1,
        avatars: ['https://i.pravatar.cc/150?img=30', 'https://i.pravatar.cc/150?img=31']
      },
      {
        id: '14',
        title: 'Aute incididunt nisi eiusmod duis duis officia nostrud',
        tags: [
          { label: 'Design', color: 'green' },
          { label: 'Improvement', color: 'pink' }
        ],
        subtasks: 3,
        comments: 1,
        avatars: ['https://i.pravatar.cc/150?img=32', 'https://i.pravatar.cc/150?img=33']
      }
    ]
  }
]

export function KanbanBoardForm() {
  const [columns, setColumns] = useState<Column[]>(initialColumns)
  const [activeCard, setActiveCard] = useState<Card | null>(null)
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const [taskDialogOpen, setTaskDialogOpen] = useState(false)
  const [taskDialogMode, setTaskDialogMode] = useState<'add' | 'edit'>('add')
  const [selectedTask, setSelectedTask] = useState<Card | undefined>(undefined)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'title' | 'subtasks' | 'comments'>('title')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    })
  )

  const filteredAndSortedColumns = useMemo(() => {
    return columns.map((column) => {
      let filteredCards = column.cards

      // Apply tag filter
      if (selectedTags.length > 0) {
        filteredCards = filteredCards.filter((card) => card.tags.some((tag) => selectedTags.includes(tag.label)))
      }

      // Apply sorting
      const sortedCards = [...filteredCards].sort((a, b) => {
        let comparison = 0
        if (sortBy === 'title') {
          comparison = a.title.localeCompare(b.title)
        } else if (sortBy === 'subtasks') {
          comparison = a.subtasks - b.subtasks
        } else if (sortBy === 'comments') {
          comparison = a.comments - b.comments
        }
        return sortOrder === 'asc' ? comparison : -comparison
      })

      return { ...column, cards: sortedCards }
    })
  }, [columns, selectedTags, sortBy, sortOrder])

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    columns.forEach((column) => {
      column.cards.forEach((card) => {
        card.tags.forEach((tag) => tags.add(tag.label))
      })
    })
    return Array.from(tags).sort()
  }, [columns])

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const card = columns.flatMap((col) => col.cards).find((card) => card.id === active.id)
    setActiveCard(card || null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveCard(null)

    if (!over) return

    const activeCardId = active.id as string
    const overColumnId = over.id as string

    // Find source column and card
    let sourceColumn: Column | undefined
    let cardToMove: Card | undefined

    for (const column of columns) {
      const card = column.cards.find((c) => c.id === activeCardId)
      if (card) {
        sourceColumn = column
        cardToMove = card
        break
      }
    }

    if (!sourceColumn || !cardToMove) return

    // Find target column
    const targetColumn = columns.find((col) => col.id === overColumnId)
    if (!targetColumn) return

    // Don't do anything if dropping in the same column
    if (sourceColumn.id === targetColumn.id) return

    // Update columns state
    setColumns((prevColumns) => {
      return prevColumns.map((column) => {
        if (column.id === sourceColumn.id) {
          // Remove card from source column
          return {
            ...column,
            cards: column.cards.filter((c) => c.id !== activeCardId)
          }
        } else if (column.id === targetColumn.id) {
          // Add card to target column
          return {
            ...column,
            cards: [...column.cards, cardToMove]
          }
        }
        return column
      })
    })
  }

  const handleAddTask = () => {
    setTaskDialogMode('add')
    setSelectedTask(undefined)
    setTaskDialogOpen(true)
  }

  const handleEditTask = (card: Card) => {
    setTaskDialogMode('edit')
    setSelectedTask(card)
    setTaskDialogOpen(true)
  }

  const handleSaveTask = (taskData: Omit<Card, 'id'> & { id?: string }) => {
    if (taskDialogMode === 'add') {
      // Add new task to the first column (Not Ready)
      const newCard: Card = {
        ...taskData,
        id: Date.now().toString() // Simple ID generation
      }

      setColumns((prevColumns) =>
        prevColumns.map((column) =>
          column.id === 'not-ready' ? { ...column, cards: [...column.cards, newCard] } : column
        )
      )
    } else {
      // Edit existing task
      if (taskData.id) {
        setColumns((prevColumns) =>
          prevColumns.map((column) => ({
            ...column,
            cards: column.cards.map((card) => (card.id === taskData.id ? ({ ...card, ...taskData } as Card) : card))
          }))
        )
      }
    }
  }

  const handleDeleteTask = (taskId: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        cards: column.cards.filter((card) => card.id !== taskId)
      }))
    )
  }

  return (
    <div className='flex h-screen bg-background'>
      <div className='flex flex-1 flex-col'>
        <main className='flex-1 p-6'>
          <div className='mb-6 flex items-center justify-between'>
            <h1 className='text-3xl font-bold'>Kanban Board</h1>
            <div className='flex items-center gap-3'>
              <Button onClick={handleAddTask} className='flex items-center gap-2'>
                <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                </svg>
                Add Task
              </Button>
              <button className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted'>
                <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                  />
                </svg>
                My tickets
              </button>
              <button
                onClick={() => setFilterOpen(true)}
                className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted'
              >
                <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'
                  />
                </svg>
                Filter
                {selectedTags.length > 0 && (
                  <span className='flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground'>
                    {selectedTags.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setSortOpen(true)}
                className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted'
              >
                <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4'
                  />
                </svg>
                Sort
              </button>
              <button className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted'>
                <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                  />
                </svg>
                View
              </button>
              <button className='rounded-lg px-3 py-2 text-sm hover:bg-muted'>
                <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
                  />
                </svg>
              </button>
            </div>
          </div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className='grid grid-cols-4 gap-6'>
              {filteredAndSortedColumns.map((column) => (
                <KanbanColumn key={column.id} column={column} onEditCard={handleEditTask} />
              ))}
            </div>
            <DragOverlay
              dropAnimation={{
                duration: 200,
                easing: 'ease-out'
              }}
            >
              {activeCard ? (
                <div className='transform scale-105 rotate-1 opacity-90 transition-all duration-200'>
                  <KanbanCard {...activeCard} />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </main>
      </div>
      <FilterDialog
        open={filterOpen}
        onOpenChange={setFilterOpen}
        allTags={allTags}
        selectedTags={selectedTags}
        onSelectedTagsChange={setSelectedTags}
      />
      <SortDialog
        open={sortOpen}
        onOpenChange={setSortOpen}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortByChange={setSortBy}
        onSortOrderChange={setSortOrder}
      />
      <TaskDialog
        open={taskDialogOpen}
        onOpenChange={setTaskDialogOpen}
        mode={taskDialogMode}
        task={selectedTask}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
      />
    </div>
  )
}
