import { useEffect, useState } from 'react'

import { MyTaskApi } from '@/app/apis/AUTH/performance.api'
import type { FocusLog } from './models/perfomance.type'
import { AlertPopup } from './partials/AlertPopup'
import { MetricsCards } from './partials/MetricsCards'
import { PersonalNotifications } from './partials/PersonalNotifications'
import { PriorityTasks } from './partials/PriorityTasks'
import { TimerSection } from './partials/TimerSection'
import { TimerSettings } from './partials/TimerSettings'
import { WeeklyFocusHistory } from './partials/WeeklyFocusHistory'

export default function FlowpilotDashboard() {
  const [focusDuration, setFocusDuration] = useState([25])
  const [breakDuration, setBreakDuration] = useState([5])
  const [currentTime, setCurrentTime] = useState(25 * 60)
  const [initialTime, setInitialTime] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [selectedMode, setSelectedMode] = useState('pomodoro')
  const [isBreakMode, setIsBreakMode] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [focusStartTime, setFocusStartTime] = useState<number | null>(null)
  const [focusLogData, setFocusLogData] = useState<FocusLog[]>([])
  const [loadingFocusLog, setLoadingFocusLog] = useState(true)

  useEffect(() => {
    const fetchFocusLog = async () => {
      try {
        setLoadingFocusLog(true)
        const response = await MyTaskApi.getFocusMe()
        if (response.success) {
          setFocusLogData(response.data)
        }
      } catch (error) {
        console.error('Failed to fetch focus log:', error)
      } finally {
        setLoadingFocusLog(false)
      }
    }

    fetchFocusLog()
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime((time) => {
          if (time <= 1) {
            setShowAlert(true)
            setIsRunning(false)

            // Nếu là focus mode (không phải break mode), ghi lại focus time
            if (!isBreakMode && focusStartTime) {
              const focusedMinutes = Math.round((initialTime - 1) / 60) // Tính số phút đã focus
              postFocusTime(focusedMinutes)
            }

            return 0
          }
          return time - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, currentTime, isBreakMode, focusStartTime, initialTime])

  useEffect(() => {
    if (!isRunning && !isCompleted) {
      const newTime = focusDuration[0] * 60
      setCurrentTime(newTime)
      setInitialTime(newTime)
    }
  }, [focusDuration, isRunning, isCompleted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Hàm gửi focus time lên server
  const postFocusTime = async (focusedMinutes: number) => {
    try {
      await MyTaskApi.postFocusTime(focusedMinutes)
      console.log(`Focus time logged: ${focusedMinutes} minutes`)
      // Refresh focus log data after logging
      const response = await MyTaskApi.getFocusMe()
      if (response.success) {
        setFocusLogData(response.data)
      }
    } catch (error) {
      console.error('Failed to log focus time:', error)
    }
  }

  const handleStart = () => {
    if (isCompleted) {
      handleReset()
    }

    // Nếu bắt đầu focus session (không phải break mode)
    if (!isRunning && !isBreakMode) {
      setFocusStartTime(Date.now())
    }

    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setIsCompleted(false)
    setIsBreakMode(false)
    setShowAlert(false)
    setFocusStartTime(null)
    const newTime = getTimeForMode(selectedMode)
    setCurrentTime(newTime)
    setInitialTime(newTime)
  }

  const getTimeForMode = (mode: string) => {
    switch (mode) {
      case 'pomodoro':
        return focusDuration[0] * 60
      case 'deep':
        return 45 * 60
      case 'marathon':
        return 60 * 60
      default:
        return focusDuration[0] * 60
    }
  }

  const handleModeChange = (mode: string) => {
    setSelectedMode(mode)
    setIsRunning(false)
    setIsCompleted(false)

    let newFocusDuration, newBreakDuration
    switch (mode) {
      case 'pomodoro':
        newFocusDuration = [25]
        newBreakDuration = [5]
        break
      case 'deep':
        newFocusDuration = [45]
        newBreakDuration = [10]
        break
      case 'marathon':
        newFocusDuration = [60]
        newBreakDuration = [15]
        break
      default:
        newFocusDuration = [25]
        newBreakDuration = [5]
    }

    setFocusDuration(newFocusDuration)
    setBreakDuration(newBreakDuration)

    const newTime = newFocusDuration[0] * 60
    setCurrentTime(newTime)
    setInitialTime(newTime)
  }

  const getCircleProgress = () => {
    if (isCompleted) {
      return 2 * Math.PI * 45
    }
    const progress = (initialTime - currentTime) / initialTime
    return 2 * Math.PI * 45 * progress
  }

  const handleContinueBreak = () => {
    setShowAlert(false)
    if (!isBreakMode) {
      // Chuyển sang break mode
      setIsBreakMode(true)
      setFocusStartTime(null) // Clear focus tracking khi chuyển sang break
      const breakTime = breakDuration[0] * 60
      setCurrentTime(breakTime)
      setInitialTime(breakTime)
      setIsRunning(true)
    } else {
      // Kết thúc break, reset để bắt đầu session mới
      setIsBreakMode(false)
      setIsCompleted(true)
      handleReset()
    }
  }

  return (
    <div className=''>
      <AlertPopup
        showAlert={showAlert}
        isBreakMode={isBreakMode}
        breakDuration={breakDuration}
        onContinueBreak={handleContinueBreak}
        onReset={handleReset}
        onClose={() => setShowAlert(false)}
      />

      <div className='p-6'>
        <MetricsCards />

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
          <div className='col-span-3'>
            <TimerSection
              selectedMode={selectedMode}
              currentTime={currentTime}
              isRunning={isRunning}
              isCompleted={isCompleted}
              isBreakMode={isBreakMode}
              onModeChange={handleModeChange}
              onStart={handleStart}
              onReset={handleReset}
              formatTime={formatTime}
              getCircleProgress={getCircleProgress}
            />
            <PersonalNotifications />
          </div>

          <div className='space-y-6'>
            <WeeklyFocusHistory focusLogData={focusLogData} loading={loadingFocusLog} />

            <TimerSettings
              focusDuration={focusDuration}
              breakDuration={breakDuration}
              selectedMode={selectedMode}
              onFocusDurationChange={setFocusDuration}
              onBreakDurationChange={setBreakDuration}
              onModeChange={setSelectedMode}
            />

            <PriorityTasks />
          </div>
        </div>
      </div>
    </div>
  )
}
