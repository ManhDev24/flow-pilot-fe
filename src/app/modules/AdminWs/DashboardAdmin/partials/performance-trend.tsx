import { Card } from '@/app/components/ui/card'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Jan', performance: 75, target: 80 },
  { month: 'Feb', performance: 78, target: 80 },
  { month: 'Mar', performance: 82, target: 80 },
  { month: 'Apr', performance: 85, target: 80 },
  { month: 'May', performance: 88, target: 80 },
  { month: 'Jun', performance: 92, target: 80 },
  { month: 'Jul', performance: 95, target: 80 }
]

export function PerformanceTrend() {
  return (
    <Card className='p-4'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='font-semibold text-gray-900'>Employee Performance Trend</h3>
      </div>
      <p className='text-sm text-gray-600 mb-4'>Monthly average performance scores against set goals.</p>

      <div className='h-64'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={data}>
            <XAxis dataKey='month' axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
            <Line
              type='monotone'
              dataKey='performance'
              stroke='#3B82F6'
              strokeWidth={2}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            />
            <Line type='monotone' dataKey='target' stroke='#E5E7EB' strokeWidth={2} strokeDasharray='5 5' dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className='flex items-center gap-4 mt-4 text-xs'>
        <div className='flex items-center gap-2'>
          <div className='w-3 h-3 bg-blue-600 rounded-full'></div>
          <span className='text-gray-600'>Performance Score</span>
        </div>
        <div className='flex items-center gap-2'>
          <div className='w-3 h-1 bg-gray-300'></div>
          <span className='text-gray-600'>Target Score</span>
        </div>
      </div>
    </Card>
  )
}
