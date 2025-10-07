import { Card, CardContent } from '@/app/components/ui/card'
import type { TeamKPI } from '../models/project-detail.type'

interface TeamKPIComponentProps {
  kpi: TeamKPI
}

export function TeamKPIComponent({ kpi }: TeamKPIComponentProps) {
  return (
    <Card className='border-0 shadow-sm'>
      <CardContent className='p-6'>
        <div className='flex items-start justify-between'>
          <div>
            <p className='text-sm font-medium text-gray-600 mb-2'>TEAM KPI</p>
            <p className='text-5xl font-bold text-indigo-600 mb-2'>{kpi.percentage}%</p>
            <p className='text-sm text-gray-700'>
              <span className='font-semibold'>KPI Value: {kpi.value}</span>
            </p>
          </div>
          <div className='relative w-32 h-32'>
            <svg className='w-full h-full -rotate-90' viewBox='0 0 100 100'>
              <circle cx='50' cy='50' r='40' fill='none' stroke='#e5e7eb' strokeWidth='12' />
              <circle
                cx='50'
                cy='50'
                r='40'
                fill='none'
                stroke='#6366f1'
                strokeWidth='12'
                strokeDasharray={`${kpi.percentage * 2.51} ${100 * 2.51}`}
                strokeLinecap='round'
              />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
