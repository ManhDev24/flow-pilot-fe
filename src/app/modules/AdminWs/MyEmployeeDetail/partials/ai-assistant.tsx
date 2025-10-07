import { Card } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Bot, Send } from 'lucide-react'

export function AIAssistant() {
  return (
    <Card className='p-4'>
      <div className='flex items-center gap-2 mb-4'>
        <Bot className='w-4 h-4 text-blue-600' />
        <h3 className='font-semibold text-gray-900'>AI Assistant</h3>
      </div>

      <div className='space-y-4 mb-4'>
        <div className='text-sm text-gray-600'>
          Hello! I am your Employee Performance AI. How can I assist you with employee evaluations today?
        </div>

        <div className='bg-blue-600 text-white p-3 rounded-lg text-sm max-w-xs ml-auto'>
          Can you summarize Sarah Chen's performance over the last quarter?
        </div>

        <div className='text-sm text-gray-600'>
          Sarah Chen demonstrated exceptional performance in Q2, particularly in project management and client
          relations. She exceeded her sales targets by 15%. Are there any specific areas you'd like to delve into?
        </div>
      </div>

      <div className='flex gap-2'>
        <Input placeholder='Ask about employee performance...' className='flex-1 text-sm' />
        <Button size='sm' className='bg-blue-600 hover:bg-blue-700'>
          <Send className='w-4 h-4' />
        </Button>
      </div>

      <div className='mt-4 p-3 bg-gray-50 rounded-lg'>
        <div className='flex items-center gap-2 mb-2'>
          <div className='w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center'>
            <span className='text-xs font-medium'>JD</span>
          </div>
          <div>
            <p className='text-sm font-medium'>John Doe</p>
            <p className='text-xs text-gray-500'>HR Manager</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
