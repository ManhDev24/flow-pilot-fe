import { Card, CardContent } from '@/app/components/ui/card'
import type { ProjectProgress } from '../models/project-detail.type'

interface ProjectProgressComponentProps {
  progress: ProjectProgress
}

export function ProjectProgressComponent({ progress }: ProjectProgressComponentProps) {
  const completedPercentage = Math.round((progress.completed / progress.total) * 100)

  return (
    <Card className='border-0 shadow-sm'>
      <CardContent className='p-6'>
        <h3 className='text-lg font-semibold text-gray-900 mb-6'>Project Progress</h3>

        <div className='flex items-center justify-center mb-6'>
          <div className='relative w-48 h-36'>
            <svg className='w-full h-full' viewBox='0 0 200 100'>
              {/* Background arc */}
              <path
                d='M 20 80 A 80 80 0 0 1 180 80'
                stroke='#e5e7eb'
                strokeWidth='12'
                fill='none'
                strokeLinecap='round'
              />
              {/* Progress arc */}
              <path
                d='M 20 80 A 80 80 0 0 1 180 80'
                stroke='#6366f1'
                strokeWidth='12'
                fill='none'
                strokeLinecap='round'
                strokeDasharray={`${completedPercentage * 2.51} 251.32`}
              />
            </svg>
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='text-center mt-4'>
                <div className='text-3xl font-bold text-gray-900'>{completedPercentage}%</div>
                <div className='text-sm text-gray-500'>Completed</div>
              </div>
            </div>
          </div>
        </div>

        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 bg-indigo-500 rounded-full'></div>
              <span className='text-sm font-medium text-gray-700'>Completed</span>
            </div>
            <span className='text-sm font-semibold text-gray-900'>{progress.completed}</span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 bg-orange-400 rounded-full'></div>
              <span className='text-sm font-medium text-gray-700'>In Progress</span>
            </div>
            <span className='text-sm font-semibold text-gray-900'>{progress.inProgress}</span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 bg-gray-300 rounded-full'></div>
              <span className='text-sm font-medium text-gray-700'>Pending</span>
            </div>
            <span className='text-sm font-semibold text-gray-900'>
              {progress.total - progress.completed - progress.inProgress}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
