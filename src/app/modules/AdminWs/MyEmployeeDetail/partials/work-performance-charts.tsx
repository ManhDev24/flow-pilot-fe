import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

const barData = [
  { name: 'Q1', taskCompletion: 85, onTimeDelivery: 78, contribution: 92 },
  { name: 'Q2', taskCompletion: 92, onTimeDelivery: 88, contribution: 85 },
  { name: 'Q3', taskCompletion: 78, onTimeDelivery: 95, contribution: 90 },
  { name: 'Q4', taskCompletion: 88, onTimeDelivery: 82, contribution: 94 }
]

const pieData = [
  { name: 'Label 1', value: 65, color: '#3B82F6' },
  { name: 'Label 2', value: 15, color: '#EF4444' },
  { name: 'Label 3', value: 12, color: '#10B981' },
  { name: 'Label 4', value: 8, color: '#F59E0B' }
]

const lineData = [
  { name: 'Jan', label1: 65, label2: 45 },
  { name: 'Feb', label1: 45, label2: 55 },
  { name: 'Mar', label1: 55, label2: 35 },
  { name: 'Apr', label1: 35, label2: 65 },
  { name: 'May', label1: 75, label2: 45 },
  { name: 'Jun', label1: 55, label2: 75 },
  { name: 'Jul', label1: 45, label2: 55 },
  { name: 'Aug', label1: 65, label2: 35 },
  { name: 'Sep', label1: 85, label2: 65 },
  { name: 'Oct', label1: 75, label2: 85 },
  { name: 'Nov', label1: 55, label2: 75 },
  { name: 'Dec', label1: 85, label2: 65 }
]

export function WorkPerformanceCharts() {
  return (
    <div className='space-y-6 h-full flex flex-col w-full'>
      {/* Bar Chart */}
      <Card className='flex-1'>
        <CardHeader>
          <CardTitle>Work performance</CardTitle>
        </CardHeader>
        <CardContent className='flex-1 flex flex-col'>
          <ResponsiveContainer width='100%' height={250}>
            <BarChart data={barData}>
              <XAxis dataKey='name' />
              <YAxis />
              <Bar dataKey='taskCompletion' fill='#3B82F6' name='Task Completion Rate' />
              <Bar dataKey='onTimeDelivery' fill='#10B981' name='On-time Delivery Rate' />
              <Bar dataKey='contribution' fill='#F59E0B' name='Contribution to Project' />
            </BarChart>
          </ResponsiveContainer>
          <div className='flex items-center justify-center space-x-6 mt-4 text-sm'>
            <div className='flex items-center space-x-2'>
              <div className='w-3 h-3 bg-blue-500 rounded-full'></div>
              <span>Task Completion Rate</span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='w-3 h-3 bg-green-500 rounded-full'></div>
              <span>On-time Delivery Rate</span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
              <span>Contribution to Project</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 flex-1'>
        {/* Pie Chart */}
        <Card className='flex flex-col'>
          <CardHeader>
            <CardTitle>Work performance</CardTitle>
          </CardHeader>
          <CardContent className='flex-1 flex flex-col'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center space-x-2'>
                <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center'>
                  <span className='text-xs font-medium'>JD</span>
                </div>
                <div>
                  <p className='font-medium text-sm'>John Doe</p>
                  <p className='text-xs text-gray-500'>HR Manager</p>
                </div>
              </div>
            </div>
            <div className='flex-1'>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie data={pieData} cx='50%' cy='50%' innerRadius={40} outerRadius={80} dataKey='value'>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className='flex items-center justify-center space-x-4 mt-4 text-xs'>
              {pieData.map((item, index) => (
                <div key={index} className='flex items-center space-x-1'>
                  <div className='w-2 h-2 rounded-full' style={{ backgroundColor: item.color }}></div>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Line Chart */}
        <Card className='flex flex-col'>
          <CardHeader>
            <CardTitle>Work performance</CardTitle>
          </CardHeader>
          <CardContent className='flex-1 flex flex-col'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={lineData}>
                <XAxis dataKey='name' />
                <YAxis />
                <Line
                  type='monotone'
                  dataKey='label1'
                  stroke='#3B82F6'
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
                <Line
                  type='monotone'
                  dataKey='label2'
                  stroke='#EF4444'
                  strokeWidth={2}
                  dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className='flex items-center justify-center space-x-6 mt-4 text-xs'>
              <div className='flex items-center space-x-2'>
                <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                <span>Label 1</span>
              </div>
              <div className='flex items-center space-x-2'>
                <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                <span>Label 2</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
