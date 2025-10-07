import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, Settings } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { Input } from '@/app/components/ui/input'
import { PATH } from '@/app/routes/path'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts'

// Mock data for employee detail
const mockEmployeeData = {
  id: 1,
  name: 'Vu Nguyen',
  role: 'Software Engineer',
  department: 'Product Department',
  email: 'vu.nguyen@company.com',
  joinedDate: 'Jan 2023',
  currentStatus: 'Active'
}

// Dữ liệu Stress Rate (Bar Chart)
const stressData = [
  { name: 'Week 1', difficult: 60, easy: 80, medium: 70 },
  { name: 'Week 2', difficult: 90, easy: 85, medium: 95 },
  { name: 'Week 3', difficult: 70, easy: 85, medium: 90 }
]

// Dữ liệu Work Performance (Pie Chart)
const performanceData = [
  { name: 'Label 1', value: 60 },
  { name: 'Label 2', value: 25 },
  { name: 'Label 3', value: 10 },
  { name: 'Label 4', value: 5 }
]
const COLORS = ['#3b82f6', '#ec4899', '#22c55e', '#8b5cf6']

// Dữ liệu Stress Analyzing (Line Chart)
const stressAnalysisData = [
  { week: 'W1', label1: 120, label2: 100 },
  { week: 'W2', label1: 100, label2: 85 },
  { week: 'W3', label1: 80, label2: 95 },
  { week: 'W4', label1: 90, label2: 75 },
  { week: 'W5', label1: 70, label2: 65 },
  { week: 'W6', label1: 60, label2: 70 },
  { week: 'W7', label1: 65, label2: 80 },
  { week: 'W8', label1: 55, label2: 75 },
  { week: 'W9', label1: 70, label2: 85 },
  { week: 'W10', label1: 65, label2: 90 }
]

export default function MyTeamManagerDetail() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(PATH.EMPLOYEE_MANAGE_MY_TEAM)
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header Project Title */}
      <div className='bg-white px-6 py-8'>
        <h1 className='text-3xl font-bold text-gray-900'>Clother Project</h1>
      </div>

      {/* Employee Info */}
      <div className='bg-white border-b border-gray-200 px-6 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Button onClick={handleBack} variant='outline' size='sm'>
              <ArrowLeft className='w-4 h-4 mr-2' />
              Back to My Team
            </Button>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>
                {mockEmployeeData.name} | {mockEmployeeData.role} | {mockEmployeeData.department}
              </h1>
              <div className='flex items-center space-x-4 mt-1'>
                <span className='text-sm text-gray-600'>
                  Joined: <span className='text-gray-800'>{mockEmployeeData.joinedDate}</span>
                </span>
                <span className='text-sm text-gray-600'>
                  Current Status:
                  <Badge variant='outline' className='ml-2 bg-green-50 text-green-700 border-green-200'>
                    {mockEmployeeData.currentStatus}
                  </Badge>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 p-6'>
        {/* Left Column */}
        <div className='space-y-6'>
          {/* AI Assistant */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center space-x-2'>
                <div className='w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center'>
                  <span className='text-white text-sm font-bold'>🤖</span>
                </div>
                <span>AI Assistant</span>
                <Settings className='w-4 h-4 ml-auto text-gray-400' />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='bg-gray-50 p-3 rounded-lg text-sm text-gray-700'>
                  Hello! I am your Employee Performance AI. How can I assist you with employee evaluations today?
                </div>

                <div className='bg-blue-50 p-3 rounded-lg'>
                  <div className='text-sm text-blue-800 font-medium mb-2'>
                    Can you summarize Sarah Chen's performance over the last quarter?
                  </div>
                  <div className='text-xs text-blue-600 bg-blue-100 p-2 rounded'>
                    Vu handsome demonstrated exceptional performance in Q2, particularly in project completion rate
                    (98%) and team collaboration. Are there specific areas you'd like to delve into?
                  </div>
                </div>

                <div className='flex items-center space-x-2'>
                  <Input placeholder='Ask about employee performance...' className='flex-1 text-sm' />
                  <Button size='sm' className='bg-indigo-500 hover:bg-indigo-600'>
                    <Send className='w-4 h-4' />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Work Performance (PieChart) */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Work performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='h-64'>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Pie
                      data={performanceData}
                      cx='50%'
                      cy='50%'
                      outerRadius={100}
                      dataKey='value'
                      label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                    >
                      {performanceData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className='space-y-6'>
          {/* Stress Rate (BarChart) */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Stress Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='h-64'>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart data={stressData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='difficult' fill='#3b82f6' name='Difficult Task' />
                    <Bar dataKey='easy' fill='#22c55e' name='Easy Task' />
                    <Bar dataKey='medium' fill='#facc15' name='Medium Task' />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Stress Analyzing (LineChart) */}
          <Card className='border-2 border-purple-200'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg'>Stress analyzing</CardTitle>
                <Badge className='bg-yellow-100 text-yellow-800 border-yellow-300'>Warning</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className='h-64'>
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart data={stressAnalysisData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='week' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type='monotone' dataKey='label1' stroke='#8b5cf6' strokeWidth={2} name='Label 1' />
                    <Line type='monotone' dataKey='label2' stroke='#ec4899' strokeWidth={2} name='Label 2' />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
