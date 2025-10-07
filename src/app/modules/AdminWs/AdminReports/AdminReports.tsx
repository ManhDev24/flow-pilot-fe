import { ChartsGridForReports } from '@/app/modules/AdminWs/AdminReports/partials/charts-grid'
import { MetricsCardsForReports } from '@/app/modules/AdminWs/AdminReports/partials/metrics-cards'
import { useOrganizationDashboard } from '@/app/hooks/useOrganizationDashboard'
import { useProjectsPerformance } from '@/app/hooks/useProjectsPerformance'
import { Button } from '@/app/components/ui/button'
import { Card } from '@/app/components/ui/card'
import { RefreshCw, AlertTriangle } from 'lucide-react'
import { useMemo } from 'react'

const AdminReports = () => {
  // Memoize filters để tránh re-render không cần thiết
  const dashboardFilters = useMemo(
    () => ({
      period: 'monthly' as const
    }),
    []
  )

  // Fetch organization dashboard data
  const {
    dashboardData,
    aiAnalysis,
    evaluation,
    loading: orgLoading,
    error: orgError,
    refetch: refetchOrgData
  } = useOrganizationDashboard(dashboardFilters)

  // Fetch projects performance data
  const { loading: projectsLoading, error: projectsError, refetch: refetchProjectsData } = useProjectsPerformance()

  const isLoading = orgLoading || projectsLoading
  const hasError = orgError || projectsError

  const handleRefresh = () => {
    refetchOrgData()
    refetchProjectsData()
  }

  return (
    <div className='flex-1 space-y-6 p-6 container mx-auto'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Organization Reports</h1>
          <p className='text-sm text-gray-600'>
            {dashboardData?.period && `Period: ${dashboardData.period}`}
            {dashboardData?.lastUpdated &&
              ` • Last updated: ${new Date(dashboardData.lastUpdated).toLocaleDateString()}`}
          </p>
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
      {hasError && (
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

      <MetricsCardsForReports dashboardData={dashboardData} evaluation={evaluation} loading={isLoading} />

      <ChartsGridForReports dashboardData={dashboardData} loading={isLoading} />

      {/* AI Analysis Summary */}
      {aiAnalysis && (
        <Card className='p-6'>
          <h3 className='text-lg font-semibold mb-4'>AI Performance Analysis</h3>
          <div className='space-y-4'>
            <div>
              <h4 className='font-medium text-gray-900 mb-2'>Overall Score</h4>
              <p className='text-2xl font-bold text-blue-600'>{aiAnalysis.overallScore}/10</p>
            </div>
            <div>
              <h4 className='font-medium text-gray-900 mb-2'>AI Summary</h4>
              <p className='text-gray-700'>{aiAnalysis.aiSummary}</p>
            </div>
            {aiAnalysis.performanceInsights && (
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
                <div>
                  <h5 className='font-medium text-green-600 mb-2'>Strengths</h5>
                  <ul className='text-sm space-y-1'>
                    {aiAnalysis.performanceInsights.strengths?.map((strength, index) => (
                      <li key={index} className='text-gray-700'>
                        • {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className='font-medium text-red-600 mb-2'>Areas for Improvement</h5>
                  <ul className='text-sm space-y-1'>
                    {aiAnalysis.performanceInsights.weaknesses?.map((weakness, index) => (
                      <li key={index} className='text-gray-700'>
                        • {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className='font-medium text-blue-600 mb-2'>Recommendations</h5>
                  <ul className='text-sm space-y-1'>
                    {aiAnalysis.performanceInsights.recommendations?.map((recommendation, index) => (
                      <li key={index} className='text-gray-700'>
                        • {recommendation}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}

export default AdminReports
