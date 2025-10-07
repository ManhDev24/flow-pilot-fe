import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import { decrementTime, setIsRunning, setTimerVisible } from '@/app/redux/slices/timer.slice'
import type { RootState } from '@/app/redux/store'
import { ExternalLink, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function GlobalTimerWidget() {
  const dispatch = useDispatch()
  const timer = useSelector((state: RootState) => state.timer)
  const [position, setPosition] = useState({ x: 30, y: 400 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isMinimized] = useState(false)

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timer.isRunning && timer.currentTime > 0) {
      interval = setInterval(() => {
        dispatch(decrementTime())
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timer.isRunning, timer.currentTime, dispatch])

  // Format time helper
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    const rect = e.currentTarget.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  // Handle drag move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragOffset])

  // Handle close
  const handleClose = () => {
    dispatch(setTimerVisible(false))
    dispatch(setIsRunning(false))
  }
  const nav = useNavigate()
  const handleRedirect = () => {
    nav('/emp/my-performance')
  }

  // Don't render if not visible
  if (!timer.isVisible) {
    return null
  }

  return (
    <div
      className='fixed z-50 select-none'
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
    >
      <Card className='bg-white shadow-lg border-2 border-indigo-200 min-w-[200px]'>
        <CardContent className=''>
          {/* Header */}
          <div className='flex items-center justify-between mb-2'>
            <div className='flex items-center gap-2'>
              <div
                className={`w-2 h-2 rounded-full ${timer.isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}
              />
              <span className='text-xs font-medium text-gray-600'>
                {timer.isBreakMode ? 'Break Time' : 'Focus Time'}
              </span>
            </div>
            <div className='flex items-center gap-1'>
              <Button variant='ghost' size='sm' className='h-6 w-6 p-0 hover:bg-gray-100' onClick={handleRedirect}>
                <ExternalLink className='h-3 w-3' />
              </Button>
              <Button variant='ghost' size='sm' className='h-6 w-6 p-0 hover:bg-red-100' onClick={handleClose}>
                <X className='h-3 w-3' />
              </Button>
            </div>
          </div>

          {/* Timer content - hide when minimized */}
          {!isMinimized && (
            <>
              {/* Timer display */}
              <div className='text-center mb-3'>
                <div className='text-2xl font-bold text-indigo-600 font-mono'>{formatTime(timer.currentTime)}</div>
                <div className='text-xs text-gray-500 capitalize'>{timer.selectedMode} Mode</div>
              </div>

              {/* Progress bar */}
              <div className='w-full bg-gray-200 rounded-full h-1.5 mb-3'>
                <div
                  className='bg-indigo-600 h-1.5 rounded-full transition-all duration-1000 ease-linear'
                  style={{
                    width: `${((timer.initialTime - timer.currentTime) / timer.initialTime) * 100}%`
                  }}
                />
              </div>
            </>
          )}

          {/* Minimized display */}
          {isMinimized && (
            <div className='text-center'>
              <div className='text-sm font-bold text-indigo-600 font-mono'>{formatTime(timer.currentTime)}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
