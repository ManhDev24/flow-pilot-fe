import { Card, CardContent } from '@/app/components/ui/card'
import { CheckCircle, Clock, AlertCircle, BarChart3 } from 'lucide-react'

interface OverviewCardProps {
  title: string
  value: string | number
  subtitle: string
  icon: React.ReactNode
  iconBgColor: string
  cardBg: string
}

function OverviewCard({ title, value, subtitle, icon, iconBgColor, cardBg }: OverviewCardProps) {
  return (
    <Card className={`${cardBg} border-0 hover:shadow-md transition-shadow duration-200`}>
      <CardContent className=''>
        <div className='flex items-start gap-3 flex-col '>
          <div className='flex gap-4 justify-between items-center'>
            <div className={`p-2 sm:p-3 rounded-lg ${iconBgColor} flex-shrink-0`}>{icon}</div>
            <p className='text-sm text-gray-700 dark:text-gray-300 font-medium'>{title}</p>
          </div>
          <h3 className='text-4xl font-bold text-gray-900 dark:text-white truncate'>{value}</h3>
          <p className='text-sm text-gray-700 dark:text-gray-400'>{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  )
}

interface OverviewCardsProps {
  data: {
    totalTasks: number
    completedTasks: number
    overdueTasks: number
    inProgressTasks: number
    completionRate: number
  } | null
}

export default function OverviewCards({ data }: OverviewCardsProps) {
  if (!data) {
    // Skeleton loading UI
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className='bg-gray-100 border-0'>
            <CardContent className='p-4'>
              <div className='animate-pulse flex items-center space-x-4'>
                <div className='rounded-lg bg-gray-300 h-12 w-12'></div>
                <div className='flex-1 space-y-2'>
                  <div className='h-4 bg-gray-300 rounded w-3/4'></div>
                  <div className='h-3 bg-gray-300 rounded w-1/2'></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const incompleteTasks = data.totalTasks - data.completedTasks

  const cards = [
    {
      title: 'Completed tasks',
      value: data.completedTasks,
      subtitle: 'Increased by 6 this week',
      icon: <CheckCircle className='h-6 w-6 text-white' />,
      iconBgColor: 'bg-pink-500',
      cardBg: 'bg-pink-50'
    },
    {
      title: 'Incomplete tasks',
      value: incompleteTasks,
      subtitle: 'Decreased by 5 this week',
      icon: <Clock className='h-6 w-6 text-white' />,
      iconBgColor: 'bg-teal-500',
      cardBg: 'bg-teal-50'
    },
    {
      title: 'Overdue tasks',
      value: data.overdueTasks,
      subtitle: 'Increased by 3 this week',
      icon: <AlertCircle className='h-6 w-6 text-white' />,
      iconBgColor: 'bg-purple-600',
      cardBg: 'bg-purple-50'
    },
    {
      title: 'Total tasks',
      value: data.totalTasks,
      subtitle: `Completion rate: ${data.completionRate}%`,
      icon: <BarChart3 className='h-6 w-6 text-white' />,
      iconBgColor: 'bg-indigo-600',
      cardBg: 'bg-indigo-50'
    }
  ]

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {cards.map((card, index) => (
        <OverviewCard key={index} {...card} />
      ))}
    </div>
  )
}
