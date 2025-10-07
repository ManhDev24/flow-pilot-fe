import { Button } from '@/app/components/ui/button'
import { Card } from '@/app/components/ui/card'
import {
  PerformanceProvider,
  usePerformanceContext
} from '@/app/modules/AdminWs/DashboardAdmin/context/PerformanceContext'
import { useAllPerformanceData } from '@/app/modules/AdminWs/DashboardAdmin/hooks/usePerformanceQueries'
import { AIAssistant } from '@/app/modules/AdminWs/DashboardAdmin/partials/ai-assistant'
import { FeedbackTrends } from '@/app/modules/AdminWs/DashboardAdmin/partials/feedback-trends'
import { MetricsCards } from '@/app/modules/AdminWs/DashboardAdmin/partials/metrics-cards'
import { PerformanceTrend } from '@/app/modules/AdminWs/DashboardAdmin/partials/performance-trend'
import { DateRangeSelector } from '@/app/modules/AdminWs/DashboardAdmin/partials/project-selector'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { ProjectsStatisticsOverview } from '@/app/modules/AdminWs/DashboardAdmin/partials/projects-statistics-overview'
// Component con để xử lý data fetching
function DashboardContent() {
  const { fromDate, toDate } = usePerformanceContext()
  const { isLoading, isError, refetch } = useAllPerformanceData(fromDate, toDate)

  const handleRefresh = () => {
    refetch()
  }

  return (
    <div className='flex min-h-screen container mx-auto'>
      <main className='flex-1 p-6'>
        {/* Header với refresh button */}
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>Organization Performance Dashboard</h1>
            <p className='text-sm text-gray-600'>Comprehensive performance analysis across all projects</p>
          </div>
          <div className='flex gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={handleRefresh}
              disabled={isLoading}
              className='flex items-center gap-2'
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Loading...' : 'Refresh'}
            </Button>
          </div>
        </div>

        {/* Error state */}
        {isError && (
          <Card className='p-4 mb-6 border-red-200 bg-red-50'>
            <div className='flex items-center gap-2 text-red-700'>
              <AlertTriangle className='w-4 h-4' />
              <span className='font-medium'>Error loading data</span>
            </div>
            <p className='text-sm text-red-600 mt-1'>Failed to load performance data. Please try again.</p>
            <Button
              variant='outline'
              size='sm'
              onClick={handleRefresh}
              className='mt-2 border-red-300 text-red-700 hover:bg-red-100'
            >
              Try Again
            </Button>
          </Card>
        )}

        {/* Date Range Selector */}
        <DateRangeSelector />

        {/* Dashboard content */}
        <MetricsCards />

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
          <AIAssistant />
          <PerformanceTrend />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
          <ProjectsStatisticsOverview />
          <FeedbackTrends />
        </div>
      </main>
    </div>
  )
}

// Component chính với Provider wrapper
function DashboardAdmin() {
  return (
    <PerformanceProvider>
      <DashboardContent />
    </PerformanceProvider>
  )
}

export default DashboardAdmin
