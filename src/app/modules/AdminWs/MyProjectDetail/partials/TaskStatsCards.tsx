import { Card, CardContent } from '@/app/components/ui/card'
import { CheckCircle, Clock, AlertTriangle, FileText } from 'lucide-react'
import type { TaskStats } from '../models/project-detail.type'

interface TaskStatsCardsProps {
  stats: TaskStats
}

export function TaskStatsCards({ stats }: TaskStatsCardsProps) {
  const cards = [
    {
      title: 'Completed tasks',
      value: stats.completed,
      change: 'Increased by 6 this week',
      icon: CheckCircle,
      bgColor: 'bg-rose-50',
      iconBgColor: 'bg-rose-400',
      iconColor: 'text-white'
    },
    {
      title: 'Incomplete tasks',
      value: stats.incomplete,
      change: 'Decreased by 5 this week',
      icon: Clock,
      bgColor: 'bg-cyan-50',
      iconBgColor: 'bg-cyan-400',
      iconColor: 'text-white'
    },
    {
      title: 'Overdue tasks',
      value: stats.overdue,
      change: 'Increased by 3 this week',
      icon: AlertTriangle,
      bgColor: 'bg-purple-50',
      iconBgColor: 'bg-purple-400',
      iconColor: 'text-white'
    },
    {
      title: 'Total tasks',
      value: stats.total,
      change: `Completion rate: ${Math.round((stats.completed / stats.total) * 100)}%`,
      icon: FileText,
      bgColor: 'bg-indigo-50',
      iconBgColor: 'bg-indigo-400',
      iconColor: 'text-white'
    }
  ]

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card key={index} className={`${card.bgColor} border-0 shadow-sm`}>
            <CardContent className='p-6'>
              <div className='flex items-center gap-3 mb-4'>
                <div className={`p-3 rounded-xl ${card.iconBgColor}`}>
                  <Icon className={`w-5 h-5 ${card.iconColor}`} />
                </div>
                <span className='text-sm font-medium text-gray-600'>{card.title}</span>
              </div>
              <div className='space-y-2'>
                <div className='text-3xl font-bold text-gray-900'>{card.value}</div>
                <div className='text-sm text-gray-500'>{card.change}</div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
