import { useEffect, useState } from 'react'
import { OverviewCards } from '@/app/modules/Manager/ProjectReport/partials/OverviewCards'
import { PerformanceChart } from '@/app/modules/Manager/ProjectReport/partials/PerformanceChart'
import { TasksByComponentsChart } from '@/app/modules/Manager/ProjectReport/partials/TasksByComponentsChart'
import { MyTaskApi } from '@/app/apis/AUTH/performance.api'
import { getLocalStorage } from '@/app/utils'

interface ProjectOverviewData {
  project: {
    id: string
    name: string
    description: string | null
    start_date: string
    end_date: string
    process: number
    team_size: number | null
    status: string
  }
  totalTasks: number
  completedTasks: number
  overdueTasks: number
  inProgressTasks: number
  completionRate: number
}

interface QuarterlyData {
  quarters: string[]
  series: Array<{
    name: string
    data: number[]
    color: string
  }>
  summary: {
    totalTasks: number
    completedTasks: number
    ongoingTasks: number
    notStartedTasks: number
  }
}

export function ProjectReportDashboard() {
  const [projectOverview, setProjectOverview] = useState<ProjectOverviewData | null>(null)
  const [quarterlyData, setQuarterlyData] = useState<QuarterlyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Get project ID from localStorage
        const userLocalStorage: any = getLocalStorage('user')
        const projectId = userLocalStorage?.projectId || 'c80d9f08-3e36-4cea-a7f1-4ed22527be74' // fallback ID

        // Fetch project overview
        const overviewResponse = await MyTaskApi.getManagerProjectOverview(projectId)
        setProjectOverview(overviewResponse.data)

        // Fetch quarterly tasks chart
        const quarterlyResponse = await MyTaskApi.getQuarterlyTasksChart(projectId, 2025)
        if (quarterlyResponse.success) {
          setQuarterlyData(quarterlyResponse.data)
        }

        console.log('check', quarterlyResponse.data)
      } catch (err) {
        console.error('Error fetching project data:', err)
        setError('Failed to load project data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className='p-4 sm:p-6 space-y-6 bg-background min-h-screen'>
        <div className='flex items-center justify-center h-64'>
          <div className='text-lg'>Loading project data...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='p-4 sm:p-6 space-y-6 bg-background min-h-screen'>
        <div className='flex items-center justify-center h-64'>
          <div className='text-lg text-red-500'>{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className='p-4 sm:p-6 space-y-6 bg-background min-h-screen'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl sm:text-3xl font-bold text-foreground'>Overview</h1>
      </div>

      {/* Overview Cards */}
      <OverviewCards data={projectOverview} />

      {/* Detailed Reports Section */}
      <div className='space-y-6'>
        <h2 className='text-xl sm:text-2xl font-semibold text-foreground'>Detailed reports</h2>

        <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
          {/* Tasks by Components Chart */}
          <div className='xl:col-span-2'>
            <TasksByComponentsChart data={quarterlyData} />
          </div>

          {/* Performance Chart */}
          <div className='xl:col-span-1'>
            <PerformanceChart />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='flex items-center justify-start mt-8 pt-4 border-t border-border'>
        <div className='flex items-center space-x-2 text-muted-foreground'>
          <span className='text-sm'>Made with</span>
          <div className='flex items-center space-x-1'>
            <div className='w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-sm'></div>
            <span className='text-sm font-semibold'>Visily</span>
          </div>
        </div>
      </div>
    </div>
  )
}
