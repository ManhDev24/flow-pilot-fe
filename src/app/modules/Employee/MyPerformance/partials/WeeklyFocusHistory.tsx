import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'

interface WeeklyFocusHistoryProps {
  weeklyData: { day: string; hours: number }[]
}

export function WeeklyFocusHistory({ weeklyData }: WeeklyFocusHistoryProps) {
  const maxHours = Math.max(...weeklyData.map((d) => d.hours))

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg'>Weekly Focus History</CardTitle>
        <p className='text-sm text-gray-500'>Your focus over the last 7 days</p>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          {weeklyData.map((day, index) => (
            <div key={index} className='flex items-center gap-3'>
              <span className='text-xs text-gray-500 w-8'>{day.day}</span>
              <div className='flex-1 bg-gray-200 rounded-full h-2'>
                <div
                  className='bg-indigo-600 h-2 rounded-full transition-all duration-500'
                  style={{ width: `${(day.hours / maxHours) * 100}%` }}
                />
              </div>
              <span className='text-xs text-gray-500 w-4'>{day.hours}</span>
            </div>
          ))}
        </div>
        <div className='mt-4 text-center'>
          <div className='flex justify-between text-xs text-gray-400'>
            <span>0</span>
            <span>2</span>
            <span>4</span>
            <span>6</span>
            <span>8</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
