import { AIAssistant } from '@/app/modules/AdminWs/DashboardAdmin/partials/ai-assistant'
import { EmployeeProfile } from '@/app/modules/AdminWs/MyEmployeeDetail/partials/employee-profile'
import { WorkPerformanceCharts } from '@/app/modules/AdminWs/MyEmployeeDetail/partials/work-performance-charts'

function MyEmployeeDetail() {
  return (
    <div className='flex h-screen bg-gray-50'>
      <div className='flex-1 flex flex-col'>
        <main className='flex-1 p-6 overflow-auto'>
          <div className='max-w-7xl mx-auto space-y-6'>
            <EmployeeProfile />
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 h-fit'>
              <div className='lg:col-span-1 flex'>
                <AIAssistant />
              </div>
              <div className='lg:col-span-2 flex'>
                <WorkPerformanceCharts />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default MyEmployeeDetail
