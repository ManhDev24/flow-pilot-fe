import { Badge } from '@/app/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { AlertCircle, CheckCircle, Clock } from 'lucide-react'

export function TodaySchedule() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg'>Today's Schedule</CardTitle>
        <p className='text-sm text-gray-500'>Your timeline for the day.</p>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center gap-4'>
          <div className='text-sm text-gray-500 w-16'>09:00 AM</div>
          <div className='flex-1'>
            <div className='flex items-center gap-2'>
              <span className='font-medium'>Daily Standup Meeting</span>
              <Badge variant='secondary' className='bg-green-100 text-green-700'>
                Meeting
              </Badge>
            </div>
          </div>
          <CheckCircle className='w-4 h-4 text-green-500' />
        </div>

        <div className='flex items-center gap-4'>
          <div className='text-sm text-gray-500 w-16'>10:00 AM</div>
          <div className='flex-1'>
            <div className='flex items-center gap-2'>
              <span className='font-medium'>Review Q2 Project Report</span>
              <Badge variant='secondary' className='bg-orange-100 text-orange-700'>
                Task
              </Badge>
            </div>
          </div>
          <AlertCircle className='w-4 h-4 text-orange-500' />
        </div>

        <div className='flex items-center gap-4'>
          <div className='text-sm text-gray-500 w-16'>11:30 AM</div>
          <div className='flex-1'>
            <div className='flex items-center gap-2'>
              <span className='font-medium'>Prepare for Client Demo</span>
              <Badge variant='secondary' className='bg-blue-100 text-blue-700'>
                Task
              </Badge>
            </div>
          </div>
          <Clock className='w-4 h-4 text-blue-500' />
        </div>

        <div className='flex items-center gap-4'>
          <div className='text-sm text-gray-500 w-16'>01:00 PM</div>
          <div className='flex-1'>
            <div className='flex items-center gap-2'>
              <span className='font-medium'>Lunch Break</span>
              <Badge variant='secondary' className='bg-gray-100 text-gray-700'>
                Personal
              </Badge>
            </div>
          </div>
          <CheckCircle className='w-4 h-4 text-green-500' />
        </div>

        <div className='flex items-center gap-4'>
          <div className='text-sm text-gray-500 w-16'>02:00 PM</div>
          <div className='flex-1'>
            <div className='flex items-center gap-2'>
              <span className='font-medium'>Refine UI/UX mockups</span>
              <Badge variant='secondary' className='bg-purple-100 text-purple-700'>
                Design
              </Badge>
            </div>
          </div>
          <Clock className='w-4 h-4 text-purple-500' />
        </div>
      </CardContent>
    </Card>
  )
}
