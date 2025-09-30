import { Card } from '@/app/components/ui/card'
import { ShieldCheck, Tally3, UserCheck, Users } from 'lucide-react'
const metrics = [
  {
    title: 'Total Employees',
    value: '2,350',
    change: '+4.2% from last year',
    subtext: 'Current active workforce',
    icon: Users,
    color: 'text-blue-600'
  },
  {
    title: 'Active account',
    value: '3.7/10',
    change: '+0.3 since last review',
    subtext: 'Average score across all evaluations',
    icon: UserCheck,
    color: 'text-green-600'
  },
  {
    title: 'Role Assign',
    value: '92%',
    change: '+1.5% compared to Q1',
    subtext: 'Percentage of employees retained',
    icon: ShieldCheck,
    color: 'text-purple-600'
  },
  {
    title: 'New Hires',
    value: '78%',
    change: '+16% from last month',
    subtext: 'Average training module completion',
    icon: Tally3,
    color: 'text-orange-600'
  }
]

export function MetricsCardsForReports() {
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
