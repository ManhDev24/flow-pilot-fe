import { Card } from '@/app/components/ui/card'
import { ShieldCheck, Tally3, UserCheck, Users } from 'lucide-react'
import type { OrganizationDashboardSummary, OrganizationPerformanceEvaluation } from '@/app/modules/AdminWs/models/performanceInterface'

interface MetricsCardsProps {
  dashboardData: OrganizationDashboardSummary | null
  evaluation: OrganizationPerformanceEvaluation | null
  loading?: boolean
}

export function MetricsCardsForReports({ dashboardData, evaluation, loading }: MetricsCardsProps) {
  const metrics = [
    {
      title: 'Total Employees',
      value: loading ? '-' : dashboardData?.totalEmployees?.toLocaleString() || '0',
      change: loading ? '-' : `${dashboardData?.period || 'current period'}`,
      subtext: 'Current active workforce',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Performance Score',
      value: loading ? '-' : `${dashboardData?.activeAccountScore || evaluation?.overallPerformanceScore || 0}/10`,
      change: loading ? '-' : 'No change data',
      subtext: 'Average score across all evaluations',
      icon: UserCheck,
      color: 'text-green-600'
    },
    {
      title: 'Role Assignment',
      value: loading ? '-' : `${dashboardData?.roleAssignPercentage || 0}%`,
      change: loading ? '-' : 'Current assignment rate',
      subtext: 'Percentage of employees with assigned roles',
      icon: ShieldCheck,
      color: 'text-purple-600'
    },
    {
      title: 'New Hires Success',
      value: loading ? '-' : `${dashboardData?.newHiresPercentage || 0}%`,
      change: loading ? '-' : 'Integration success rate',
      subtext: 'New hire integration success rate',
      icon: Tally3,
      color: 'text-orange-600'
    }
  ]

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {metrics.map((metric) => (
        <Card key={metric.title} className='p-4'>
          <div className='flex items-start justify-between'>
            <div className='flex-1'>
              <p className='text-sm font-medium text-gray-600 mb-1'>{metric.title}</p>
              <p className='text-2xl font-bold text-gray-900 mb-1'>{metric.value}</p>
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
