import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Loader2 } from 'lucide-react'
import type { FocusLog } from '../models/perfomance.type'

interface WeeklyFocusHistoryProps {
  focusLogData: FocusLog[]
  loading: boolean
}

export function WeeklyFocusHistory({ focusLogData, loading }: WeeklyFocusHistoryProps) {
  // Get last 7 days
  const getLast7Days = () => {
    const days = []
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      const dayName = dayNames[date.getDay()]

      // Find matching data from API
      const focusData = focusLogData.find((log) => log.date === dateStr)
      const hours = focusData ? Math.round((focusData.total_focused_minutes / 60) * 10) / 10 : 0

      days.push({
        day: dayName,
        hours: hours,
        date: dateStr
      })
    }

    return days
  }

  const weeklyData = getLast7Days()
  const maxHours = Math.max(...weeklyData.map((d) => d.hours), 1) // Min 1 to avoid division by 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg'>Weekly Focus History</CardTitle>
        <p className='text-sm text-gray-500'>Your focus over the last 7 days</p>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className='flex items-center justify-center py-8'>
            <Loader2 className='w-6 h-6 animate-spin text-indigo-600' />
          </div>
        ) : (
          <>
            <div className='space-y-3'>
              {weeklyData.map((day, index) => (
                <div key={index} className='flex items-center gap-3'>
                  <span className='text-xs text-gray-500 w-8'>{day.day}</span>
                  <div className='flex-1 bg-gray-200 rounded-full h-2'>
                    <div
                      className='bg-indigo-600 h-2 rounded-full transition-all duration-500'
                      style={{ width: `${(day.hours / maxHours) * 100}%` }}
                    />
                  </div>
                  <span className='text-xs text-gray-500 w-8 text-right'>{day.hours}h</span>
                </div>
              ))}
            </div>
            <div className='mt-4 text-center'>
              <div className='flex justify-between text-xs text-gray-400'>
                <span>0</span>
                <span>{Math.round(maxHours / 4)}</span>
                <span>{Math.round(maxHours / 2)}</span>
                <span>{Math.round((maxHours * 3) / 4)}</span>
                <span>{Math.round(maxHours)}</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
