import { Card, CardContent } from '@/app/components/ui/card'
import { CheckCircle, Clock, AlertCircle, BarChart3 } from 'lucide-react'

interface OverviewCardProps {
  title: string
  value: string | number
  subtitle: string
  icon: React.ReactNode
  iconBgColor: string
  textColor?: string
}

function OverviewCard({ title, value, subtitle, icon, iconBgColor, textColor = 'text-foreground' }: OverviewCardProps) {
  return (
    <Card className='bg-card border-border hover:shadow-md transition-shadow duration-200'>
      <CardContent className='p-4 sm:p-6'>
        <div className='flex items-center space-x-3 sm:space-x-4'>
          <div className={`p-2 sm:p-3 rounded-lg ${iconBgColor} flex-shrink-0`}>{icon}</div>
          <div className='flex-1 min-w-0'>
            <div className='flex items-baseline space-x-2'>
              <h3 className={`text-2xl sm:text-3xl font-bold ${textColor} truncate`}>{value}</h3>
            </div>
            <p className='text-sm text-muted-foreground mt-1 font-medium'>{title}</p>
            <p className='text-xs text-muted-foreground mt-1'>{subtitle}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function OverviewCards() {
  const cards = [
    {
      title: 'Completed tasks',
      value: 68,
      subtitle: 'Increased by 6 this week',
      icon: <CheckCircle className='h-6 w-6 text-white' />,
      iconBgColor: 'bg-pink-500'
    },
    {
      title: 'Incomplete tasks',
      value: 17,
      subtitle: 'Decreased by 5 this week',
      icon: <Clock className='h-6 w-6 text-white' />,
      iconBgColor: 'bg-teal-500'
    },
    {
      title: 'Overdue tasks',
      value: 9,
      subtitle: 'Increased by 3 this week',
      icon: <AlertCircle className='h-6 w-6 text-white' />,
      iconBgColor: 'bg-purple-600'
    },
    {
      title: 'Total tasks',
      value: 85,
      subtitle: 'Completion rate: 80%',
      icon: <BarChart3 className='h-6 w-6 text-white' />,
      iconBgColor: 'bg-indigo-600'
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
