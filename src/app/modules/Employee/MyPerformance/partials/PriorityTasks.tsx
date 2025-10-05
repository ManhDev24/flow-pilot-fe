import { useEffect, useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Skeleton } from '@/app/components/ui/skeleton'
import { AlertCircle, Star } from 'lucide-react'
import { MyTaskApi } from '@/app/apis/AUTH/task-emp.api'
import type { MyTask } from '@/app/modules/Employee/MyTasks/models/myTask.type'

export function PriorityTasks() {
  const [tasks, setTasks] = useState<MyTask[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await MyTaskApi.getMyTask()

        if (response.success && response.data) {
          // Sắp xếp theo độ ưu tiên: high -> medium -> low
          const priorityOrder = { high: 1, medium: 2, low: 3 }
          const sortedTasks = response.data
            .filter((task) => task.status !== 'completed' && task.status !== 'rejected') // Chỉ lấy task chưa hoàn thành
            .sort((a, b) => {
              return (
                priorityOrder[a.priority as keyof typeof priorityOrder] -
                priorityOrder[b.priority as keyof typeof priorityOrder]
              )
            })
            .slice(0, 5) // Chỉ lấy 4 task đầu tiên

          setTasks(sortedTasks)
        }
      } catch (err) {
        setError('Failed to fetch tasks')
        console.error('Error fetching tasks:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  // Hàm format ngày
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow'
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }
  }

  // Hàm lấy màu theo độ ưu tiên
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-600'
      case 'medium':
        return 'text-orange-600'
      case 'low':
        return 'text-gray-500'
      default:
        return 'text-gray-500'
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Priority Tasks</CardTitle>
          <p className='text-sm text-gray-500'>Urgent tasks requiring immediate attention.</p>
        </CardHeader>
        <CardContent className='space-y-3'>
          {[...Array(4)].map((_, index) => (
            <div key={index} className='flex items-center gap-3'>
              <Skeleton className='h-4 w-4' />
              <div className='flex-1'>
                <Skeleton className='h-4 w-48 mb-1' />
                <Skeleton className='h-3 w-24' />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Priority Tasks</CardTitle>
          <p className='text-sm text-gray-500'>Urgent tasks requiring immediate attention.</p>
        </CardHeader>
        <CardContent>
          <div className='text-center text-red-500'>
            <AlertCircle className='w-8 h-8 mx-auto mb-2' />
            <p className='text-sm'>{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg'>Priority Tasks</CardTitle>
        <p className='text-sm text-gray-500'>Urgent tasks requiring immediate attention.</p>
      </CardHeader>
      <CardContent className='space-y-3'>
        {tasks.length > 0 ? (
          <>
            {tasks.map((task) => (
              <div key={task.id} className='flex items-center gap-3'>
                <Star className='w-4 h-4 text-yellow-500' />
                <div className='flex-1'>
                  <p className='text-sm font-medium'>{task.name}</p>
                  <div className='flex items-center gap-2'>
                    <p className={`text-xs ${getPriorityColor(task.priority)}`}>{formatDate(task.due_at)}</p>
                    {/* <span
                      className={`text-xs px-2 py-1 rounded-full text-white ${
                        task.priority === 'high'
                          ? 'bg-red-500'
                          : task.priority === 'medium'
                            ? 'bg-orange-500'
                            : 'bg-gray-500'
                      }`}
                    >
                      {task.priority.toUpperCase()}
                    </span> */}
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className='text-center text-gray-500 py-4'>
            <Star className='w-8 h-8 mx-auto mb-2 opacity-50' />
            <p className='text-sm'>No priority tasks found</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
