import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import { Pause, Play, RotateCcw } from 'lucide-react'

interface TimerSectionProps {
  selectedMode: string
  currentTime: number
  isRunning: boolean
  isCompleted: boolean
  isBreakMode: boolean
  onModeChange: (mode: string) => void
  onStart: () => void
  onReset: () => void
  formatTime: (seconds: number) => string
  getCircleProgress: () => number
}

export function TimerSection({
  selectedMode,
  currentTime,
  isRunning,
  isCompleted,
  isBreakMode,
  onModeChange,
  onStart,
  onReset,
  formatTime,
  getCircleProgress
}: TimerSectionProps) {
  return (
    <Card className='mb-8'>
      <CardContent className='space-y-8 pt-6'>
        {/* Timer Mode Buttons */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
          <Button
            variant={selectedMode === 'pomodoro' ? 'default' : 'outline'}
            onClick={() => onModeChange('pomodoro')}
            className={selectedMode === 'pomodoro' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : ''}
          >
            Pomodoro (25/5)
          </Button>
          <Button
            variant={selectedMode === 'deep' ? 'default' : 'outline'}
            onClick={() => onModeChange('deep')}
            className={selectedMode === 'deep' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : ''}
          >
            Deep Work (45/10)
          </Button>
          <Button
            variant={selectedMode === 'marathon' ? 'default' : 'outline'}
            onClick={() => onModeChange('marathon')}
            className={selectedMode === 'marathon' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : ''}
          >
            Marathon (60/15)
          </Button>
        </div>

        {/* Timer Circle */}
        <div className='flex justify-center'>
          <div className='relative w-72 h-72'>
            <svg className='w-full h-full' viewBox='0 0 100 100'>
              {/* Background Circle */}
              <circle cx='50' cy='50' r='45' stroke='#e5e7eb' strokeWidth='3' fill='none' />

              {/* Countdown Circle */}
              <circle
                cx='50'
                cy='50'
                r='45'
                stroke='#4f46e5'
                strokeWidth='4'
                fill='none'
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={2 * Math.PI * 45 - getCircleProgress()}
                strokeLinecap='round'
                style={{
                  transform: 'rotate(-90deg)',
                  transformOrigin: '50% 50%',
                  transition: 'stroke-dashoffset 1s linear'
                }}
              />
            </svg>

            {/* Time Text */}
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
              {isBreakMode && <span className='text-sm font-medium text-indigo-600 mb-1'>Break Time</span>}
              <span
                className={`text-5xl font-light transition-colors duration-500 ${
                  isCompleted ? 'text-gray-400' : 'text-indigo-600'
                }`}
                style={{
                  textShadow: isRunning ? '0 2px 4px rgba(79, 70, 229, 0.1)' : 'none'
                }}
              >
                {formatTime(currentTime)}
              </span>
            </div>
          </div>
        </div>

        {/* Timer Controls */}
        <div className='flex justify-center gap-4'>
          <Button onClick={onStart} className='bg-indigo-600 hover:bg-indigo-700 px-8'>
            {isCompleted ? (
              <>
                <Play className='w-4 h-4' />
                Start
              </>
            ) : isRunning ? (
              <>
                <Pause className='w-4 h-4' />
                Pause
              </>
            ) : (
              <>
                <Play className='w-4 h-4' />
                Start
              </>
            )}
            {/* <Play className='w-4 h-4 mr-2' />
            {isCompleted ? 'Start' : isRunning ? 'Pause' : 'Start'} */}
          </Button>
          <Button variant='outline' onClick={onReset}>
            <RotateCcw className='w-4 h-4' />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
