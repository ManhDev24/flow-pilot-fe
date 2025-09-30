import { OverviewCards } from '@/app/modules/Manager/ProjectReport/partials/OverviewCards'
import { PerformanceChart } from '@/app/modules/Manager/ProjectReport/partials/PerformanceChart'
import { TasksByComponentsChart } from '@/app/modules/Manager/ProjectReport/partials/TasksByComponentsChart'

export function ProjectReportDashboard() {
  return (
    <div className='p-4 sm:p-6 space-y-6 bg-background min-h-screen'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl sm:text-3xl font-bold text-foreground'>Overview</h1>
      </div>

      {/* Overview Cards */}
      <OverviewCards />

      {/* Detailed Reports Section */}
      <div className='space-y-6'>
        <h2 className='text-xl sm:text-2xl font-semibold text-foreground'>Detailed reports</h2>

        <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
          {/* Tasks by Components Chart */}
          <div className='xl:col-span-2'>
            <TasksByComponentsChart />
          </div>

          {/* Performance Chart */}
          <div className='xl:col-span-1'>
            <PerformanceChart />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='flex items-center justify-start mt-8 pt-4 border-t border-border'>
        <div className='flex items-center space-x-2 text-muted-foreground'>
          <span className='text-sm'>Made with</span>
          <div className='flex items-center space-x-1'>
            <div className='w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-sm'></div>
            <span className='text-sm font-semibold'>Visily</span>
          </div>
        </div>
      </div>
    </div>
  )
}
