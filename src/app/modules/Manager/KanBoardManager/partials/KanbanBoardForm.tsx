import { FilterDialog } from '@/app/modules/Employee/KanbanBoard/partials/FilterDialog'
import { KanbanCard } from '@/app/modules/Employee/KanbanBoard/partials/KanbanCard'
import { SortDialog } from '@/app/modules/Employee/KanbanBoard/partials/SortDialog'
import { TaskDetailModal } from './TaskDetailModal'
import { TaskCreateForm } from './TaskCreateForm'
import { ManagerKanbanColumn } from './ManagerKanbanColumn'
import { ReviewForm } from './ReviewForm'
import { RejectForm } from './RejectForm'
import { MyTaskApi } from '@/app/apis/AUTH/task-emp.api'
import type { MyTask, TaskStatus } from '@/app/modules/Employee/MyTasks/models/myTask.type'
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
import { useEffect, useMemo, useState } from 'react'

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
  originalTask: MyTask
}

export interface Column {
  id: TaskStatus
  title: string
  cards: Card[]
}

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    cards: []
  },
  {
    id: 'doing',
    title: 'In Progress',
    cards: []
  },
  {
    id: 'completed',
    title: 'Completed',
    cards: []
  },
  {
    id: 'rejected',
    title: 'Rejected',
    cards: []
  }
]

// Helper function to get priority color
const getPriorityColor = (priority: string): string => {
  switch (priority.toLowerCase()) {
    case 'low':
      return 'green'
    case 'medium':
      return 'yellow'
    case 'high':
      return 'red'
    default:
      return 'gray'
  }
}

// Helper function to convert MyTask to Card
const convertTaskToCard = (task: MyTask): Card => {
  const tags: Tag[] = [
    {
      label: task.priority.charAt(0).toUpperCase() + task.priority.slice(1),
      color: getPriorityColor(task.priority)
    }
  ]

  return {
    id: task.id,
    image: task.image_url || undefined,
    title: task.name,
    tags,
    subtasks: task.checklists.length,
    comments: task.contents.length,
    avatars: task.assignees.map(
      (assignee) => assignee.user.avatar_url || `https://i.pravatar.cc/150?u=${assignee.user.id}`
    ),
    originalTask: task
  }
}

export function KanbanBoardForm() {
  const [columns, setColumns] = useState<Column[]>(initialColumns)
  const [activeCard, setActiveCard] = useState<Card | null>(null)
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'title' | 'subtasks' | 'comments'>('title')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedTaskForDetail, setSelectedTaskForDetail] = useState<MyTask | null>(null)
  const [createTaskOpen, setCreateTaskOpen] = useState(false)
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState<string>('')
  const [selectedTaskOwnerId, setSelectedTaskOwnerId] = useState<string>('')

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    })
  )

  // Function to fetch tasks from API
  const fetchTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await MyTaskApi.getAllTasksByManager()

      if (response.success && response.data) {
        // Group tasks by column based on status mapping
        const tasksByColumn: Record<string, Card[]> = {
          todo: [],
          doing: [],
          completed: [],
          rejected: []
        }

        response.data.forEach((task) => {
          const card = convertTaskToCard(task)

          // Map task status to kanban columns
          switch (task.status) {
            case 'todo':
            case 'overdued':
              tasksByColumn.todo.push(card)
              break
            case 'doing':
              tasksByColumn.doing.push(card)
              break
            case 'reviewing':
            case 'completed':
            case 'feedbacked':
              tasksByColumn.completed.push(card)
              break
            case 'rejected':
              tasksByColumn.rejected.push(card)
              break
            default:
              // Default to todo if status is unknown
              tasksByColumn.todo.push(card)
              break
          }
        })

        // Update columns with tasks
        setColumns((prevColumns) =>
          prevColumns.map((column) => ({
            ...column,
            cards: tasksByColumn[column.id] || []
          }))
        )
      }
    } catch (err) {
      setError('Failed to fetch tasks')
      console.error('Error fetching tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch tasks from API
  useEffect(() => {
    fetchTasks()
  }, [])

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

  const handleViewDetail = (taskId: string) => {
    const task = columns.flatMap((col) => col.cards).find((card) => card.id === taskId)?.originalTask
    if (task) {
      setSelectedTaskForDetail(task)
      setDetailModalOpen(true)
    }
  }

  const handleReview = async (taskId: string, taskOwnerId: string) => {
    // First call /task/:id to get task details
    try {
      const response = await MyTaskApi.getTaskById(taskId)
      if (response.success && response.data) {
        setSelectedTaskId(taskId)
        setSelectedTaskOwnerId(taskOwnerId)
        setReviewModalOpen(true)
      }
    } catch (error) {
      console.error('Error fetching task details:', error)
    }
  }

  const handleReject = async (taskId: string) => {
    // First call /task/:id to get task details
    try {
      const response = await MyTaskApi.getTaskById(taskId)
      if (response.success && response.data) {
        setSelectedTaskId(taskId)
        setRejectModalOpen(true)
      }
    } catch (error) {
      console.error('Error fetching task details:', error)
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const card = columns.flatMap((col) => col.cards).find((card) => card.id === active.id)
    setActiveCard(card || null)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveCard(null)

    if (!over) return

    const activeCardId = active.id as string
    const overColumnId = over.id as TaskStatus

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

    // Map column ID to task status for API
    const newTaskStatus = overColumnId // This will be 'todo', 'doing', 'completed', or 'rejected'

    // Update columns state optimistically
    setColumns((prevColumns) => {
      return prevColumns.map((column) => {
        if (column.id === sourceColumn.id) {
          // Remove card from source column
          return {
            ...column,
            cards: column.cards.filter((c) => c.id !== activeCardId)
          }
        } else if (column.id === targetColumn.id) {
          // Add card to target column with updated status
          const updatedCard = {
            ...cardToMove,
            originalTask: {
              ...cardToMove.originalTask,
              status: newTaskStatus
            }
          }
          return {
            ...column,
            cards: [...column.cards, updatedCard]
          }
        }
        return column
      })
    })

    // Call API to update task status
    try {
      await MyTaskApi.updateTaskStatus(activeCardId, newTaskStatus)
      console.log(`Task ${activeCardId} status updated to ${newTaskStatus}`)
    } catch (error) {
      console.error('Failed to update task status:', error)

      // Revert the optimistic update if API call fails
      setColumns((prevColumns) => {
        return prevColumns.map((column) => {
          if (column.id === targetColumn.id) {
            // Remove card from target column
            return {
              ...column,
              cards: column.cards.filter((c) => c.id !== activeCardId)
            }
          } else if (column.id === sourceColumn.id) {
            // Add card back to source column
            return {
              ...column,
              cards: [...column.cards, cardToMove]
            }
          }
          return column
        })
      })

      // Show error message to user
      alert('Failed to update task status. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className='flex h-full bg-background items-center justify-center'>
        <div className='text-lg'>Loading tasks...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex h-full bg-background items-center justify-center'>
        <div className='text-lg text-red-500'>{error}</div>
      </div>
    )
  }

  return (
    <div className='flex flex-col h-full bg-background'>
      <div className='flex-1 p-6 flex flex-col'>
        <div className='mb-6 flex items-center justify-between'>
          <h1 className='text-3xl font-bold'>Kanban Board</h1>
          <div className='flex items-center gap-3'>
            <button
              onClick={() => setCreateTaskOpen(true)}
              className='flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-3 py-2 text-sm hover:bg-primary/90'
            >
              <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
              </svg>
              Create Task
            </button>
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

        <div className='flex-1 min-h-0'>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className='grid grid-cols-4 gap-6 h-full w-full'>
              {filteredAndSortedColumns.map((column) => (
                <div key={column.id} className='min-w-0'>
                  <ManagerKanbanColumn
                    column={column}
                    onViewDetail={handleViewDetail}
                    onReview={handleReview}
                    onReject={handleReject}
                  />
                </div>
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
        </div>
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
      <TaskDetailModal
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
        task={selectedTaskForDetail}
        onTaskUpdated={fetchTasks}
      />

      {/* Task Create Modal */}
      {createTaskOpen && (
        <div className='fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4'>
          <div className='bg-background rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            <TaskCreateForm
              onSuccess={() => {
                setCreateTaskOpen(false)
                fetchTasks()
              }}
              onCancel={() => setCreateTaskOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewModalOpen && (
        <div className='fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4'>
          <div className='bg-background rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto'>
            <ReviewForm
              taskId={selectedTaskId}
              taskOwnerId={selectedTaskOwnerId}
              onSuccess={() => {
                setReviewModalOpen(false)
                fetchTasks()
              }}
              onCancel={() => setReviewModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectModalOpen && (
        <div className='fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4'>
          <div className='bg-background rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto'>
            <RejectForm
              taskId={selectedTaskId}
              onSuccess={() => {
                setRejectModalOpen(false)
                fetchTasks()
              }}
              onCancel={() => setRejectModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
