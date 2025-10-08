import { Card, CardContent } from '@/app/components/ui/card'
import { Skeleton } from '@/app/components/ui/skeleton'
import type { MetricCardProps } from '../models/DashboardInterface'

function MetricCard({ title, value, icon, color, loading }: MetricCardProps) {
  if (loading) {
    return (
      <Card className='overflow-hidden'>
        <CardContent className='p-6'>
          <div className='flex items-center justify-between'>
            <div className='flex-1'>
              <Skeleton className='h-4 w-24 mb-2' />
              <Skeleton className='h-8 w-32' />
            </div>
            <Skeleton className='h-12 w-12 rounded-lg' />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className='overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer'>
      <CardContent>
        <div className='flex flex-col min-h-[80px] items-stretch justify-center space-y-2'>
          <div className='flex items-center justify-between'>
            <p className='text-sm font-medium text-muted-foreground mb-1'>{title}</p>
            <div
              className='flex items-center justify-center w-2 h-2 rounded-lg'
              style={{ backgroundColor: `${color}20` }}
            >
              <div style={{ color }}>{icon}</div>
            </div>
          </div>
          <h3 className='text-2xl font-bold tracking-tight'>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </h3>
        </div>
      </CardContent>
    </Card>
  )
}

export default MetricCard
