import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts'

const roleDistributionData = [
  { name: 'Software Engineer', value: 65, color: '#6366f1' },
  { name: 'Product Manager', value: 25, color: '#ec4899' },
  { name: 'Designer', value: 10, color: '#8b5cf6' }
]

const accountStatusData = [
  { month: 'Jan', active: 280, inactive: 45, pending: 25 },
  { month: 'Feb', active: 290, inactive: 40, pending: 20 },
  { month: 'Mar', active: 300, inactive: 35, pending: 15 },
  { month: 'Apr', active: 310, inactive: 30, pending: 10 },
  { month: 'May', active: 315, inactive: 25, pending: 10 },
  { month: 'Jul', active: 320, inactive: 20, pending: 10 }
]

const growthTrendsData = [
  { quarter: 'Q1 2023', newHires: 32, departures: 8 },
  { quarter: 'Q2 2023', newHires: 38, departures: 12 },
  { quarter: 'Q3 2023', newHires: 35, departures: 15 },
  { quarter: 'Q4 2023', newHires: 42, departures: 10 },
  { quarter: 'Q1 2024', newHires: 45, departures: 8 },
  { quarter: 'Q2 2024', newHires: 55, departures: 5 }
]

const topRolesData = [
  { role: 'Software Engineer', count: 65 },
  { role: 'Product Manager', count: 45 },
  { role: 'UX Designer', count: 35 },
  { role: 'Data Scientist', count: 25 },
  { role: 'Other', count: 15 }
]

export function ChartsGridForReports() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      <Card className='bg-card border border-border'>
        <CardHeader>
          <CardTitle className='text-lg font-semibold'>Employee Role Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='h-64'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={roleDistributionData}
                  cx='50%'
                  cy='50%'
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey='value'
                >
                  {roleDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className='flex justify-center space-x-4 mt-4'>
            {roleDistributionData.map((item) => (
              <div key={item.name} className='flex items-center space-x-2'>
                <div className='w-3 h-3 rounded-full' style={{ backgroundColor: item.color }} />
                <span className='text-xs text-muted-foreground'>
                  {item.name} {item.value}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Account Status Over Time */}
      <Card className='bg-card border border-border'>
        <CardHeader>
          <CardTitle className='text-lg font-semibold'>Account Status Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='h-64'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={accountStatusData}>
                <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
                <XAxis dataKey='month' stroke='#64748b' />
                <YAxis stroke='#64748b' />
                <Tooltip />
                <Line type='monotone' dataKey='active' stroke='#6366f1' strokeWidth={2} dot={{ fill: '#6366f1' }} />
                <Line type='monotone' dataKey='inactive' stroke='#ec4899' strokeWidth={2} dot={{ fill: '#ec4899' }} />
                <Line type='monotone' dataKey='pending' stroke='#8b5cf6' strokeWidth={2} dot={{ fill: '#8b5cf6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className='flex justify-center space-x-4 mt-4'>
            <div className='flex items-center space-x-2'>
              <div className='w-3 h-3 rounded-full bg-blue-500' />
              <span className='text-xs text-muted-foreground'>Active</span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='w-3 h-3 rounded-full bg-pink-500' />
              <span className='text-xs text-muted-foreground'>Inactive</span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='w-3 h-3 rounded-full bg-purple-500' />
              <span className='text-xs text-muted-foreground'>Pending</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee Growth Trends */}
      <Card className='bg-card border border-border'>
        <CardHeader>
          <CardTitle className='text-lg font-semibold'>Employee Growth Trends</CardTitle>
          <div className='flex items-center space-x-2 mt-2'>
            <div className='w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center'>
              <span className='text-xs font-bold'>JD</span>
            </div>
            <div>
              <p className='text-sm font-medium'>John Doe</p>
              <p className='text-xs text-muted-foreground'>HR Manager</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='h-64'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={growthTrendsData}>
                <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
                <XAxis dataKey='quarter' stroke='#64748b' />
                <YAxis stroke='#64748b' />
                <Tooltip />
                <Legend />
                <Bar dataKey='newHires' fill='#6366f1' name='New Hires' />
                <Bar dataKey='departures' fill='#ec4899' name='Departures' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top 5 Active Roles */}
      <Card className='bg-card border border-border'>
        <CardHeader>
          <CardTitle className='text-lg font-semibold'>Top 5 Active Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {topRolesData.map((role, index) => (
              <div key={role.role} className='flex items-center space-x-3'>
                <span className='text-sm font-medium w-32 text-left'>{role.role}</span>
                <div className='flex-1 bg-secondary rounded-full h-6 relative'>
                  <div
                    className={`h-6 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-pink-500'}`}
                    style={{ width: `${(role.count / 65) * 100}%` }}
                  />
                </div>
                <span className='text-sm font-medium w-8 text-right'>{role.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
