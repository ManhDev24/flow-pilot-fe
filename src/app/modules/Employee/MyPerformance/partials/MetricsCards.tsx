import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/app/components/ui/card'
import { Skeleton } from '@/app/components/ui/skeleton'
import { AlertCircle, Calendar, CheckCircle, Timer } from 'lucide-react'
import { MyTaskApi } from '@/app/apis/AUTH/performance.api'
import type { Performance } from '@/app/modules/Employee/MyPerformance/models/perfomance.type'

export function MetricsCards() {
  const [performance, setPerformance] = useState<Performance | null>(null)
  const [yesterdayPerformance, setYesterdayPerformance] = useState<Performance | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        setLoading(true)
        setError(null)
        const userId = '327e1b0b-2698-4a0f-9273-ca9729a9f0cd'
        const today = new Date().toISOString().split('T')[0]

        // Tính ngày hôm qua
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayStr = yesterday.toISOString().split('T')[0]

        // Gọi API cho cả hôm nay và hôm qua
        const [todayResponse, yesterdayResponse] = await Promise.all([
          MyTaskApi.getMyPerformance(userId, today),
          MyTaskApi.getMyPerformance(userId, yesterdayStr)
        ])

        if (todayResponse.success && todayResponse.data) {
          setPerformance(todayResponse.data)
        }

        if (yesterdayResponse.success && yesterdayResponse.data) {
          setYesterdayPerformance(yesterdayResponse.data)
        }
      } catch (err) {
        setError('Failed to fetch performance data')
        console.error('Error fetching performance:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPerformance()
  }, [])

  // Hàm tính tỉ lệ thay đổi
  const calculatePercentageChange = (
    current: number,
    previous: number
  ): { percentage: number; isPositive: boolean } => {
    if (previous === 0) {
      return { percentage: current > 0 ? 100 : 0, isPositive: current >= 0 }
    }
    const change = ((current - previous) / previous) * 100
    return { percentage: Math.abs(Math.round(change)), isPositive: change >= 0 }
  }

  if (loading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        {[...Array(4)].map((_, index) => (
          <Card key={index}>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div className='flex-1'>
                  <Skeleton className='h-4 w-24 mb-2' />
                  <Skeleton className='h-8 w-16 mb-1' />
                  <Skeleton className='h-3 w-32 mb-1' />
                  <Skeleton className='h-3 w-20' />
                </div>
                <Skeleton className='h-8 w-8 rounded' />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error || !performance) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <Card>
          <CardContent className='p-6'>
            <div className='text-center text-red-500'>
              <AlertCircle className='w-8 h-8 mx-auto mb-2' />
              <p className='text-sm'>{error || 'No data available'}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
      <Card>
        <CardContent className='p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500 mb-1'>Today's Tasks</p>
              <p className='text-2xl font-bold'>{performance.todayTasks}</p>
              <p className='text-xs text-gray-400'>Total tasks assigned</p>
              {yesterdayPerformance &&
                (() => {
                  const change = calculatePercentageChange(performance.todayTasks, yesterdayPerformance.todayTasks)
                  return (
                    <p className={`text-xs mt-1 ${change.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {change.isPositive ? '↗' : '↘'} {change.percentage}% vs yesterday
                    </p>
                  )
                })()}
            </div>
            <Calendar className='w-8 h-8 text-orange-500' />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500 mb-1'>Completion Rate</p>
              <p className='text-2xl font-bold'>{performance.completionRate}%</p>
              <p className='text-xs text-gray-400'>Tasks completed today</p>
              {yesterdayPerformance &&
                (() => {
                  const change = calculatePercentageChange(
                    performance.completionRate,
                    yesterdayPerformance.completionRate
                  )
                  return (
                    <p className={`text-xs mt-1 ${change.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {change.isPositive ? '↗' : '↘'} {change.percentage}% vs yesterday
                    </p>
                  )
                })()}
            </div>
            <CheckCircle className='w-8 h-8 text-green-500' />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500 mb-1'>Overdue Tasks</p>
              <p className='text-2xl font-bold'>{performance.overdueTasks}</p>
              <p className='text-xs text-gray-400'>Past deadline</p>
              {yesterdayPerformance &&
                (() => {
                  const change = calculatePercentageChange(performance.overdueTasks, yesterdayPerformance.overdueTasks)
                  return (
                    <p className={`text-xs mt-1 ${change.isPositive ? 'text-red-600' : 'text-green-600'}`}>
                      {change.isPositive ? '↗' : '↘'} {change.percentage}% vs yesterday
                    </p>
                  )
                })()}
            </div>
            <AlertCircle className='w-8 h-8 text-red-500' />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500 mb-1'>Focus Hours</p>
              <p className='text-2xl font-bold'>{performance.focusHours}h</p>
              <p className='text-xs text-gray-400'>Logged today</p>
              {yesterdayPerformance &&
                (() => {
                  const change = calculatePercentageChange(performance.focusHours, yesterdayPerformance.focusHours)
                  return (
                    <p className={`text-xs mt-1 ${change.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {change.isPositive ? '↗' : '↘'} {change.percentage}% vs yesterday
                    </p>
                  )
                })()}
            </div>
            <Timer className='w-8 h-8 text-purple-500' />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
