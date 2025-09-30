import { Card } from '@/app/components/ui/card'

const feedbackItems = [
  {
    text: 'Positive feedback on project delivery efficiency.',
    percentage: 85,
    color: 'bg-green-500'
  },
  {
    text: 'Concern raised about workload distribution in Q1.',
    percentage: 72,
    color: 'bg-yellow-500'
  },
  {
    text: 'Suggestion for new training module on leadership skills.',
    percentage: 68,
    color: 'bg-blue-500'
  },
  {
    text: 'High satisfaction in recent team collaboration survey.',
    percentage: 91,
    color: 'bg-green-500'
  },
  {
    text: 'Request for clearer communication channels for remote teams.',
    percentage: 76,
    color: 'bg-orange-500'
  }
]

export function FeedbackTrends() {
  return (
    <Card className='p-4'>
      <h3 className='font-semibold text-gray-900 mb-2'>Employee Feedback Trends</h3>
      <p className='text-sm text-gray-600 mb-4'>Overview of recent employee feedback and sentiment.</p>

      <div className='space-y-4'>
        {feedbackItems.map((item, index) => (
          <div key={index} className='space-y-2'>
            <div className='flex items-center justify-between'>
              <p className='text-sm text-gray-700'>{item.text}</p>
              <span className='text-sm font-medium text-gray-900'>{item.percentage}%</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
