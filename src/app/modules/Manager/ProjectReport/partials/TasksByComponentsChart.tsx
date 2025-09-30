import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { useState } from 'react'

interface ChartData {
  quarter: string
  completed: number
  ongoing: number
  notStarted: number
}

const chartData: ChartData[] = [
  { quarter: 'Q1', completed: 45, ongoing: 8, notStarted: 25 },
  { quarter: 'Q2', completed: 35, ongoing: 12, notStarted: 20 },
  { quarter: 'Q3', completed: 30, ongoing: 40, notStarted: 15 },
  { quarter: 'Q4', completed: 38, ongoing: 10, notStarted: 42 }
]

function BarChart({ data }: { data: ChartData[] }) {
  const maxValue = Math.max(...data.map((d) => d.completed + d.ongoing + d.notStarted))

  return (
    <div className='space-y-6'>
      {/* Legend */}
      <div className='flex items-center justify-center space-x-6 text-sm'>
        <div className='flex items-center space-x-2'>
          <div className='w-3 h-3 rounded-full bg-blue-500'></div>
          <span className='text-muted-foreground'>Completed</span>
        </div>
        <div className='flex items-center space-x-2'>
          <div className='w-3 h-3 rounded-full bg-green-500'></div>
          <span className='text-muted-foreground'>On-going</span>
        </div>
        <div className='flex items-center space-x-2'>
          <div className='w-3 h-3 rounded-full bg-orange-500'></div>
          <span className='text-muted-foreground'>Not started</span>
        </div>
      </div>

      {/* Chart */}
      <div className='flex items-end justify-center space-x-4 sm:space-x-8 h-64 px-4'>
        {data.map((item, index) => {
          const completedHeight = Math.max((item.completed / maxValue) * 200, 4)
          const ongoingHeight = Math.max((item.ongoing / maxValue) * 200, 4)
          const notStartedHeight = Math.max((item.notStarted / maxValue) * 200, 4)

          return (
            <div key={index} className='flex flex-col items-center space-y-2'>
              <div className='flex items-end space-x-1'>
                <div
                  className='w-8 sm:w-12 bg-blue-500 rounded-t-sm hover:bg-blue-600 transition-colors duration-200'
                  style={{ height: `${completedHeight}px` }}
                ></div>
                <div
                  className='w-8 sm:w-12 bg-green-500 rounded-t-sm hover:bg-green-600 transition-colors duration-200'
                  style={{ height: `${ongoingHeight}px` }}
                ></div>
                <div
                  className='w-8 sm:w-12 bg-orange-500 rounded-t-sm hover:bg-orange-600 transition-colors duration-200'
                  style={{ height: `${notStartedHeight}px` }}
                ></div>
              </div>
              <span className='text-sm text-muted-foreground font-medium'>{item.quarter}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function TasksByComponentsChart() {
  const [selectedYear, setSelectedYear] = useState('2022')

  return (
    <Card className='bg-card border-border'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg font-semibold text-foreground'>Tasks by components</CardTitle>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className='w-[120px]'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='2020'>2020</SelectItem>
              <SelectItem value='2021'>2021</SelectItem>
              <SelectItem value='2022'>2022</SelectItem>
              <SelectItem value='2023'>2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <BarChart data={chartData} />
      </CardContent>
    </Card>
  )
}
