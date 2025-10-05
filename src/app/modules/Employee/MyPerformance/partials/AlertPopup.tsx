import { Button } from '@/app/components/ui/button'
import { CheckCircle } from 'lucide-react'

interface AlertPopupProps {
  showAlert: boolean
  isBreakMode: boolean
  breakDuration: number[]
  onContinueBreak: () => void
  onReset: () => void
  onClose: () => void
}

export function AlertPopup({
  showAlert,
  isBreakMode,
  breakDuration,
  onContinueBreak,
  onReset,
  onClose
}: AlertPopupProps) {
  if (!showAlert) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 max-w-sm mx-4 text-center shadow-xl'>
        <div className='mb-4'>
          <div className='w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3'>
            <CheckCircle className='w-8 h-8 text-indigo-600' />
          </div>
          <h3 className='text-lg font-semibold text-gray-900 mb-2'>
            {!isBreakMode ? 'Focus Time Complete!' : 'Break Time Complete!'}
          </h3>
          <p className='text-gray-600'>
            {!isBreakMode
              ? `Great work! Ready for a ${breakDuration[0]} minute break?`
              : 'Break is over! Ready for another focus session?'}
          </p>
        </div>
        <div className='flex gap-3 justify-center'>
          <Button onClick={onContinueBreak} className='bg-indigo-600 hover:bg-indigo-700 text-white px-6'>
            {!isBreakMode ? 'Start Break' : 'New Session'}
          </Button>
          <Button
            variant='outline'
            onClick={() => {
              onClose()
              onReset()
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
