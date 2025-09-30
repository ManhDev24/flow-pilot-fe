import { Card } from '@/app/components/ui/card'

const evaluations = [
  {
    name: 'Alice Johnson',
    status: 'Exceeded Expectations',
    date: '2024-07-20',
    avatar: 'AJ'
  },
  {
    name: 'Bob Williams',
    status: 'Met Expectations',
    date: '2024-07-18',
    avatar: 'BW'
  },
  {
    name: 'Carol Davis',
    status: 'Needs Improvement',
    date: '2024-07-15',
    avatar: 'CD'
  },
  {
    name: 'David Brown',
    status: 'Outstanding Performance',
    date: '2024-07-12',
    avatar: 'DB'
  },
  {
    name: 'Eva Smith',
    status: 'Met Expectations',
    date: '2024-07-10',
    avatar: 'ES'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Outstanding Performance':
      return 'text-green-700 bg-green-100'
    case 'Exceeded Expectations':
      return 'text-blue-700 bg-blue-100'
    case 'Met Expectations':
      return 'text-gray-700 bg-gray-100'
    case 'Needs Improvement':
      return 'text-orange-700 bg-orange-100'
    default:
      return 'text-gray-700 bg-gray-100'
  }
}

export function RecentEvaluations() {
  return (
    <Card className='p-4'>
      <h3 className='font-semibold text-gray-900 mb-2'>Recent Evaluations</h3>
      <p className='text-sm text-gray-600 mb-4'>Latest performance reviews conducted.</p>

      <div className='space-y-3'>
        {evaluations.map((evaluation) => (
          <div key={evaluation.name} className='flex items-center gap-3'>
            <div className='w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center'>
              <span className='text-xs font-medium text-gray-700'>{evaluation.avatar}</span>
            </div>
            <div className='flex-1'>
              <p className='text-sm font-medium text-gray-900'>{evaluation.name}</p>
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(evaluation.status)}`}
              >
                {evaluation.status}
              </span>
            </div>
            <span className='text-xs text-gray-500'>{evaluation.date}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
