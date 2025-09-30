import { Badge } from '@/app/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { Calendar } from 'lucide-react'

export function EmployeeProfile() {
  return (
    <div className='bg-white rounded-lg border border-gray-200 p-6'>
      <div className='flex items-start justify-between'>
        <div>
          <h1 className='text-2xl font-semibold text-gray-900'>Vu Nguyen | Software Engineer | Product Department</h1>
          <div className='mt-4 flex items-center space-x-6 text-sm'>
            <div>
              <span className='text-gray-500'>Joined:</span>
              <span className='ml-2 text-gray-900'>Jan 2023</span>
            </div>
            <div className='flex items-center'>
              <span className='text-gray-500'>Current Status:</span>
              <Badge className='ml-2 bg-green-100 text-green-800 hover:bg-green-100'>Active</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-6 flex items-center space-x-4'>
        <div className='flex items-center space-x-2 text-sm text-gray-600'>
          <Calendar className='h-4 w-4' />
          <span>Jan 01, 2023 - Jun 04, 2025</span>
        </div>
        <Select defaultValue='yearly'>
          <SelectTrigger className='w-32'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='yearly'>Yearly</SelectItem>
            <SelectItem value='monthly'>Monthly</SelectItem>
            <SelectItem value='quarterly'>Quarterly</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
