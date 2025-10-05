import { ChartsGridForReports } from '@/app/modules/AdminWs/AdminReports/partials/charts-grid'
import { MetricsCardsForReports } from '@/app/modules/AdminWs/AdminReports/partials/metrics-cards'
import { useOrganizationDashboard } from '@/app/hooks/useOrganizationDashboard'
import { useProjectsPerformance } from '@/app/hooks/useProjectsPerformance'
import { Card } from '@/app/components/ui/card'
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

  // Handle error display
  if (hasError) {
    return (
      <div className='flex-1 space-y-6 p-6 container mx-auto'>
        <Card className='p-6'>
          <div className='text-center'>
            <h3 className='text-lg font-semibold text-red-600 mb-2'>Error Loading Dashboard Data</h3>
            <p className='text-gray-600 mb-4'>{orgError || projectsError}</p>
            <button
              onClick={() => {
                refetchOrgData()
                refetchProjectsData()
              }}
              className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
            >
              Retry
            </button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className='flex-1 space-y-6 p-6 container mx-auto'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Organization Reports</h1>
          <p className='text-gray-600 mt-1'>
            {dashboardData?.period && `Period: ${dashboardData.period}`}
            {dashboardData?.lastUpdated &&
              ` • Last updated: ${new Date(dashboardData.lastUpdated).toLocaleDateString()}`}
          </p>
        </div>
        {isLoading && (
          <div className='flex items-center space-x-2'>
            <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600'></div>
            <span className='text-sm text-gray-600'>Loading...</span>
          </div>
        )}
      </div>

      <MetricsCardsForReports dashboardData={dashboardData} evaluation={evaluation} loading={isLoading} />

      <ChartsGridForReports dashboardData={dashboardData} />

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
