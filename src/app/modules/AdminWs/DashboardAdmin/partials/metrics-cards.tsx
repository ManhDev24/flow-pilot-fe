import { Card } from '@/app/components/ui/card'
import { Users, TrendingUp, UserCheck, GraduationCap } from 'lucide-react'
import { useAllPerformanceData } from '@/app/modules/AdminWs/DashboardAdmin/hooks/usePerformanceQueries'
import { usePerformanceContext } from '@/app/modules/AdminWs/DashboardAdmin/context/PerformanceContext'
import { Skeleton } from '@/app/components/ui/skeleton'

export function MetricsCards() {
  const { fromDate, toDate } = usePerformanceContext()
  const { allProjectsOverview, allProjectsAIAnalysis, isLoading } = useAllPerformanceData(fromDate, toDate)
  console.log('allProjectsAIAnalysis: ', allProjectsAIAnalysis);

  // Tính toán metrics từ dữ liệu API theo interface mới
  const metrics = {
    totalEmployees: allProjectsAIAnalysis?.totalEmployees || 0,
    avgQuality: allProjectsAIAnalysis?.aggregateMetrics?.avgQuality || 0,
    avgBurnout: allProjectsAIAnalysis?.aggregateMetrics?.avgBurnout || 0,
    totalProjects: allProjectsOverview?.totalProjects || 0,
    averageCompletionRate: allProjectsOverview?.aggregateMetrics?.averageCompletionRate || 0
  }

  const metricsConfig = [
    {
      title: 'Total Employees',
      value: metrics.totalEmployees.toString(),
      change: metrics.totalEmployees > 0 ? `Active across ${metrics.totalProjects} projects` : 'No data',
      subtext: 'Current active workforce',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Avg Quality Score',
      value: `${metrics.avgQuality.toFixed(1)}/100`,
      change:
        metrics.avgQuality > 0
          ? `${metrics.avgQuality >= 80 ? '+' : ''}${(metrics.avgQuality - 75).toFixed(1)} vs target (75)`
          : 'No data',
      subtext: 'Average quality score across all projects',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Completion Rate',
      value: `${metrics.averageCompletionRate.toFixed(1)}%`,
      change:
        metrics.averageCompletionRate > 0
          ? `${metrics.averageCompletionRate >= 70 ? 'Above' : 'Below'} target (70%)`
          : 'No data',
      subtext: 'Average task completion rate',
      icon: UserCheck,
      color: 'text-purple-600'
    },
    {
      title: 'Burnout Index',
      value: `${metrics.avgBurnout.toFixed(1)}%`,
      change:
        metrics.avgBurnout > 0
          ? `${metrics.avgBurnout <= 30 ? 'Low' : metrics.avgBurnout <= 60 ? 'Moderate' : 'High'} level`
          : 'No data',
      subtext: 'Average employee burnout level',
      icon: GraduationCap,
      color: 'text-orange-600'
    }
  ]

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {metricsConfig.map((metric) => (
        <Card key={metric.title} className='p-4'>
          <div className='flex items-start justify-between'>
            <div className='flex-1'>
              <p className='text-sm font-medium text-gray-600 mb-1'>{metric.title}</p>
              {isLoading ? (
                <Skeleton className='h-8 w-16 mb-1' />
              ) : (
                <p className='text-2xl font-bold text-gray-900 mb-1'>{metric.value}</p>
              )}
              <p className='text-xs text-green-600 mb-1'>{metric.change}</p>
              <p className='text-xs text-gray-500'>{metric.subtext}</p>
            </div>
            <metric.icon className={`w-5 h-5 ${metric.color}`} />
          </div>
        </Card>
      ))}
    </div>
  )
}
