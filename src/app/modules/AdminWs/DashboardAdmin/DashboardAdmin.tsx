import { AIAssistant } from '@/app/modules/AdminWs/DashboardAdmin/partials/ai-assistant'
import { FeedbackTrends } from '@/app/modules/AdminWs/DashboardAdmin/partials/feedback-trends'
import { MetricsCards } from '@/app/modules/AdminWs/DashboardAdmin/partials/metrics-cards'
import { PerformanceTrend } from '@/app/modules/AdminWs/DashboardAdmin/partials/performance-trend'
import { RecentEvaluations } from '@/app/modules/AdminWs/DashboardAdmin/partials/recent-evaluations'

function DashboardAdmin() {
  return (
    <div className='flex min-h-screen  container mx-auto'>
      <main className='flex-1 p-6'>
        <MetricsCards />
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
          <AIAssistant />
          <PerformanceTrend />
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
          <RecentEvaluations />
          <FeedbackTrends />
        </div>
      </main>
    </div>
  )
}

export default DashboardAdmin
