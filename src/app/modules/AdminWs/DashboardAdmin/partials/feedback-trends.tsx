import { Card } from '@/app/components/ui/card'
import { useAllPerformanceData } from '@/app/modules/AdminWs/DashboardAdmin/hooks/usePerformanceQueries'
import { usePerformanceContext } from '@/app/modules/AdminWs/DashboardAdmin/context/PerformanceContext'
import { Skeleton } from "@/app/components/ui/skeleton"

// Fallback data nếu không có dữ liệu từ API
const fallbackFeedbackItems = [
  {
    text: 'Positive feedback on project delivery efficiency.',
    percentage: 85,
    color: 'bg-green-500'
  },
  {
    text: 'Concern raised about workload distribution in Q1.',
    percentage: 72,
    color: 'bg-yellow-500'
  },
  {
    text: 'Suggestion for new training module on leadership skills.',
    percentage: 68,
    color: 'bg-blue-500'
  },
  {
    text: 'High satisfaction in recent team collaboration survey.',
    percentage: 91,
    color: 'bg-green-500'
  },
  {
    text: 'Request for clearer communication channels for remote teams.',
    percentage: 76,
    color: 'bg-orange-500'
  }
]

const getColorByPercentage = (percentage: number): string => {
  if (percentage >= 85) return 'bg-green-500'
  if (percentage >= 70) return 'bg-blue-500'
  if (percentage >= 60) return 'bg-yellow-500'
  return 'bg-orange-500'
}

export function FeedbackTrends() {
  const { fromDate, toDate } = usePerformanceContext()
  const { allProjectsAIAnalysis, allProjectsOverview, isLoading } = useAllPerformanceData(fromDate, toDate)
  
  // Tạo feedback trends từ actual data structure
  let feedbackTrends: Array<{text: string, percentage: number, color: string}> = []
  
  if (allProjectsAIAnalysis) {
    const { aggregateMetrics, organizationSummary } = allProjectsAIAnalysis
    feedbackTrends = [
      {
        text: `Quality performance: ${organizationSummary || 'AI generated insights available'}`,
        percentage: Math.round(aggregateMetrics?.avgQuality || 75),
        color: getColorByPercentage(aggregateMetrics?.avgQuality || 75)
      },
      {
        text: `Burnout management: ${aggregateMetrics?.avgBurnout || 0}% burnout level reported`,
        percentage: Math.round(100 - (aggregateMetrics?.avgBurnout || 30)), // Inverse of burnout
        color: getColorByPercentage(100 - (aggregateMetrics?.avgBurnout || 30))
      },
      {
        text: `Task completion efficiency: ${aggregateMetrics?.totalCompleted || 0} tasks completed`,
        percentage: Math.min(Math.round((aggregateMetrics?.totalCompleted || 0) / 10), 100),
        color: getColorByPercentage(Math.min(Math.round((aggregateMetrics?.totalCompleted || 0) / 10), 100))
      }
    ]
  }
  
  if (allProjectsOverview && feedbackTrends.length < 3) {
    const { aggregateMetrics } = allProjectsOverview
    feedbackTrends.push({
      text: `Project completion rate across ${allProjectsOverview.totalProjects} projects`,
      percentage: Math.round(aggregateMetrics?.averageCompletionRate || 0),
      color: getColorByPercentage(aggregateMetrics?.averageCompletionRate || 0)
    })
  }
  
  // Sử dụng dữ liệu từ API nếu có, nếu không sử dụng fallback
  const feedbackItems = feedbackTrends.length > 0 ? feedbackTrends : fallbackFeedbackItems
  const hasData = feedbackTrends.length > 0

  return (
    <Card className='p-4'>
      <div className="flex items-center justify-between mb-2">
        <h3 className='font-semibold text-gray-900'>Employee Feedback Trends</h3>
        {!hasData && (
          <span className='text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded'>Demo Data</span>
        )}
      </div>
      <p className='text-sm text-gray-600 mb-4'>
        {hasData ? 'AI analysis insights from organization strengths.' : 'Overview of recent employee feedback and sentiment.'}
      </p>

      <div className='space-y-4'>
        {isLoading ? (
          // Loading state
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-8" />
              </div>
              <Skeleton className="w-full h-2 rounded-full" />
            </div>
          ))
        ) : (
          feedbackItems.map((item, index) => (
            <div key={index} className='space-y-2'>
              <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-700'>{item.text}</p>
                <span className='text-sm font-medium text-gray-900'>{item.percentage}%</span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-2'>
                <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }}></div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
