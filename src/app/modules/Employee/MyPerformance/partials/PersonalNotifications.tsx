import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'

export function PersonalNotifications() {
  return (
    <Card className='mt-6'>
      <CardHeader>
        <CardTitle className='text-lg'>Personal Notifications</CardTitle>
        <p className='text-sm text-gray-500'>Your latest updates and alerts.</p>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-start gap-3'>
          <div className='w-2 h-2 bg-green-500 rounded-full mt-2'></div>
          <div className='flex-1'>
            <p className='text-sm'>Task "Review Q2 Report" is due in 2 hours.</p>
            <p className='text-xs text-gray-500'>5 min ago</p>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <div className='w-2 h-2 bg-green-500 rounded-full mt-2'></div>
          <div className='flex-1'>
            <p className='text-sm'>New assignment: "Client Feedback Analysis".</p>
            <p className='text-xs text-gray-500'>1 hour ago</p>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <div className='w-2 h-2 bg-gray-400 rounded-full mt-2'></div>
          <div className='flex-1'>
            <p className='text-sm text-gray-600'>Meeting with Marketing Team at 3 PM today.</p>
            <p className='text-xs text-gray-500'>2 hours ago</p>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <div className='w-2 h-2 bg-gray-400 rounded-full mt-2'></div>
          <div className='flex-1'>
            <p className='text-sm text-gray-600'>Your weekly performance summary is ready.</p>
            <p className='text-xs text-gray-500'>Yesterday</p>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <div className='w-2 h-2 bg-gray-400 rounded-full mt-2'></div>
          <div className='flex-1'>
            <p className='text-sm text-gray-600'>Reminder: Friday is a company holiday.</p>
            <p className='text-xs text-gray-500'>3 days ago</p>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <div className='w-2 h-2 bg-gray-400 rounded-full mt-2'></div>
          <div className='flex-1'>
            <p className='text-sm text-gray-600'>Your report for "Website Redesign" has been approved.</p>
            <p className='text-xs text-gray-500'>3 days ago</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
