import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'

interface PerformanceData {
  label: string
  value: number
  color: string
}

const performanceData: PerformanceData[] = [
  { label: 'Segment A', value: 35, color: '#8B5CF6' },
  { label: 'Segment B', value: 25, color: '#EC4899' },
  { label: 'Segment C', value: 20, color: '#10B981' },
  { label: 'Segment D', value: 20, color: '#6366F1' }
]

function DonutChart({ data }: { data: PerformanceData[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let cumulativePercentage = 0

  const radius = 70
  const strokeWidth = 16
  const normalizedRadius = radius - strokeWidth * 2
  const circumference = normalizedRadius * 2 * Math.PI

  return (
    <div className='flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-8'>
      {/* Donut Chart */}
      <div className='relative flex-shrink-0'>
        <svg height={radius * 2} width={radius * 2} className='transform -rotate-90'>
          {/* Background circle */}
          <circle
            stroke='#f3f4f6'
            fill='transparent'
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />

          {/* Data segments */}
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100
            const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`
            const strokeDashoffset = (-cumulativePercentage * circumference) / 100

            cumulativePercentage += percentage

            return (
              <circle
                key={index}
                stroke={item.color}
                fill='transparent'
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                className='transition-all duration-300 hover:opacity-80'
              />
            )
          })}
        </svg>

        {/* Center content */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center'>
            <div className='text-lg font-bold text-foreground'>Last 30 Days</div>
            <div className='text-xs text-muted-foreground'>Performance</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className='space-y-3'>
        {data.map((item, index) => (
          <div key={index} className='flex items-center space-x-3'>
            <div className='w-3 h-3 rounded-full flex-shrink-0' style={{ backgroundColor: item.color }}></div>
            <span className='text-sm text-muted-foreground'>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PerformanceChart() {
  return (
    <Card className='bg-card border-border'>
      <CardHeader>
        <CardTitle className='text-lg font-semibold text-foreground'>Last 30 Days Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <DonutChart data={performanceData} />
      </CardContent>
    </Card>
  )
}
