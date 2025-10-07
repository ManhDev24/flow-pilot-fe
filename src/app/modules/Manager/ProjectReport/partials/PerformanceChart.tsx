import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const performanceData = [
  { name: 'Segment A', value: 35, color: '#3B82F6' },
  { name: 'Segment B', value: 25, color: '#EC4899' },
  { name: 'Segment C', value: 20, color: '#10B981' },
  { name: 'Segment D', value: 20, color: '#8B5CF6' }
]

export function PerformanceChart() {
  return (
    <Card className='bg-card border-border'>
      <CardHeader>
        <CardTitle className='text-lg font-semibold text-foreground'>Last 30 Days Performance</CardTitle>
      </CardHeader>

      <CardContent className='h-[320px] flex items-center justify-center'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={performanceData}
              cx='50%'
              cy='50%'
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey='value'
              labelLine={false}
              label={({ percent }) => `${(Number(percent) * 100).toFixed(0)}%`}
            >
              {performanceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign='bottom' height={36} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
