import { Card } from '@/app/components/ui/card'
import { Progress } from '@/app/components/ui/progress'
import { Badge } from '@/app/components/ui/badge'
import { Skeleton } from '@/app/components/ui/skeleton'
import { BarChart3, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { MyTaskApi } from '@/app/apis/AUTH/performance.api'
import type { AllProjectsStatsResponse } from '@/app/modules/AdminWs/models/performanceInterface'

interface ProjectStat {
  label: string
  value: number
  total: number
  percentage: number
  color: string
  icon: React.ReactNode
}

export function ProjectsStatisticsOverview() {
  const [statsData, setStatsData] = useState<AllProjectsStatsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch project statistics
  useEffect(() => {
    const fetchProjectStats = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await MyTaskApi.getAllProjectsStats()
        
        setStatsData(response)
      } catch (err) {
        
        setError('Failed to load project statistics')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjectStats()
  }, [])

  // Process stats data into display format
  const processStatsData = (response: AllProjectsStatsResponse): ProjectStat[] => {
    if (!response?.data || !response.data.projectStats) return []

    const { projectStats, totalProjects } = response.data
    
    // Calculate project status counts from projectStats array
    const statusCounts = projectStats.reduce((acc, project) => {
      const status = project.status?.toLowerCase() || 'unknown'
      if (status === 'completed') {
        acc.completed += 1
      } else if (status === 'active' || status === 'in_progress' || status === 'ongoing') {
        acc.active += 1
      } else if (status === 'overdue') {
        acc.overdue += 1
      } else if (status === 'scheduled' || status === 'pending') {
        acc.scheduled += 1
      }
      return acc
    }, { completed: 0, active: 0, overdue: 0, scheduled: 0 })

    const stats: ProjectStat[] = [
      {
        label: 'Completed Projects',
        value: statusCounts.completed,
        total: totalProjects,
        percentage: totalProjects ? Math.round((statusCounts.completed / totalProjects) * 100) : 0,
        color: 'bg-green-500',
        icon: <CheckCircle className='w-4 h-4 text-green-600' />
      },
      {
        label: 'Active Projects',
        value: statusCounts.active,
        total: totalProjects,
        percentage: totalProjects ? Math.round((statusCounts.active / totalProjects) * 100) : 0,
        color: 'bg-blue-500',
        icon: <Clock className='w-4 h-4 text-blue-600' />
      },
      {
        label: 'Overdue Projects',
        value: statusCounts.overdue,
        total: totalProjects,
        percentage: totalProjects ? Math.round((statusCounts.overdue / totalProjects) * 100) : 0,
        color: 'bg-red-500',
        icon: <AlertCircle className='w-4 h-4 text-red-600' />
      },
      {
        label: 'Scheduled Projects',
        value: statusCounts.scheduled,
        total: totalProjects,
        percentage: totalProjects ? Math.round((statusCounts.scheduled / totalProjects) * 100) : 0,
        color: 'bg-purple-500',
        icon: <Calendar className='w-4 h-4 text-purple-600' />
      }
    ]

    return stats
  }

  const projectStats = statsData ? processStatsData(statsData) : []
  const hasData = statsData?.data && statsData.data.totalProjects > 0

  const getStatusBadgeColor = (label: string) => {
    const colorMap: { [key: string]: string } = {
      'Completed Projects': 'bg-green-100 text-green-800',
      'Active Projects': 'bg-blue-100 text-blue-800',
      'Overdue Projects': 'bg-red-100 text-red-800',
      'Scheduled Projects': 'bg-purple-100 text-purple-800'
    }
    return colorMap[label] || 'bg-gray-100 text-gray-800'
  }

  return (
    <Card className='p-4'>
      <div className='flex items-center justify-between mb-2'>
        <div className='flex items-center gap-2'>
          <BarChart3 className='w-5 h-5 text-indigo-600' />
          <h3 className='font-semibold text-gray-900'>Projects Statistics Overview</h3>
        </div>
        {!hasData && !isLoading && (
          <span className='text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded'>No Data</span>
        )}
      </div>
      
      <p className='text-sm text-gray-600 mb-4'>
        {hasData 
          ? `Statistics overview for ${statsData?.data?.totalProjects} projects in your organization. Completion rate: ${statsData?.data?.overallCompletionRate?.toFixed(1)}%`
          : error 
            ? 'Unable to load project statistics. Please try again later.'
            : statsData?.data 
              ? 'Project data loaded but no projects found in your organization.'
              : 'No project statistics available.'
        }
      </p>

      {isLoading ? (
        // Loading state
        <div className='space-y-4'>
          <div>
            <Skeleton className='h-4 w-32 mb-2' />
            <Skeleton className='h-2 w-full mb-1' />
            <Skeleton className='h-2 w-3/4 mb-1' />
            <Skeleton className='h-2 w-1/2' />
          </div>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-24 mb-2' />
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className='flex items-center justify-between'>
                <Skeleton className='h-6 w-32' />
                <Skeleton className='h-4 w-16' />
              </div>
            ))}
          </div>
        </div>
      ) : error ? (
        // Error state
        <div className='text-center py-8 text-red-500'>
          <AlertCircle className='w-12 h-12 mx-auto mb-3 text-red-300' />
          <div className='text-sm font-medium'>{error}</div>
          <div className='text-xs mt-1 text-gray-500'>Please check your connection and try again</div>
        </div>
      ) : hasData ? (
        <div className='space-y-4'>
          {/* Main Statistics Progress Bars */}
          <div>
            <div className='flex items-center gap-2 mb-3'>
              <BarChart3 className='w-4 h-4 text-indigo-600' />
              <h4 className='text-sm font-medium text-gray-700'>Project Status Distribution</h4>
            </div>
            
            <div className='space-y-3'>
              {projectStats.map((stat) => (
                <div key={stat.label}>
                  <div className='flex items-center justify-between text-sm mb-1'>
                    <div className='flex items-center gap-2'>
                      {stat.icon}
                      <span className='text-gray-700 font-medium'>{stat.label}</span>
                    </div>
                    <span className='font-semibold text-gray-900'>{stat.percentage}%</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Progress value={stat.percentage} className='h-2 flex-1' />
                    <span className='text-xs text-gray-500 min-w-[60px] text-right'>
                      {stat.value}/{stat.total}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Statistics Cards */}
          <div>
            <div className='flex items-center gap-2 mb-3'>
              <CheckCircle className='w-4 h-4 text-green-600' />
              <h4 className='text-sm font-medium text-gray-700'>Project Status Summary</h4>
            </div>
            
            <div className='grid grid-cols-2 gap-2'>
              {projectStats.map((stat) => (
                <div key={stat.label} className='flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100'>
                  <div className='flex items-center gap-2'>
                    <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                    <Badge variant="secondary" className={`text-xs ${getStatusBadgeColor(stat.label)}`}>
                      {stat.label.replace(' Projects', '')}
                    </Badge>
                  </div>
                  <div className='text-right'>
                    <div className='text-sm font-bold text-gray-900'>{stat.value}</div>
                    <div className='text-xs text-gray-500'>{stat.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Summary */}
            <div className='mt-4 pt-3 border-t border-gray-100'>
              <div className='grid grid-cols-3 gap-4 text-center mb-3'>
                <div>
                  <div className='text-lg font-bold text-gray-900'>{statsData?.data?.totalProjects || 0}</div>
                  <div className='text-xs text-gray-500'>Total Projects</div>
                </div>
                <div>
                  <div className='text-lg font-bold text-green-600'>{projectStats.find(s => s.label === 'Completed Projects')?.value || 0}</div>
                  <div className='text-xs text-gray-500'>Completed</div>
                </div>
                <div>
                  <div className='text-lg font-bold text-blue-600'>{projectStats.find(s => s.label === 'Active Projects')?.value || 0}</div>
                  <div className='text-xs text-gray-500'>In Progress</div>
                </div>
              </div>
              
              {/* Tasks Summary */}
              {statsData?.data?.totalProjectTasks > 0 && (
                <div className='pt-2 border-t border-gray-50'>
                  <div className='grid grid-cols-2 gap-4 text-center'>
                    <div>
                      <div className='text-sm font-semibold text-gray-700'>{statsData.data.totalProjectTasks}</div>
                      <div className='text-xs text-gray-500'>Total Tasks</div>
                    </div>
                    <div>
                      <div className='text-sm font-semibold text-green-600'>{statsData.data.totalCompletedTasks}</div>
                      <div className='text-xs text-gray-500'>Completed Tasks</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // No data state
        <div className='text-center py-8 text-gray-500'>
          <BarChart3 className='w-12 h-12 mx-auto mb-3 text-gray-300' />
          <div className='text-sm'>No project statistics available</div>
          <div className='text-xs mt-1'>Create projects to see statistics and performance metrics</div>
        </div>
      )}
    </Card>
  )
}