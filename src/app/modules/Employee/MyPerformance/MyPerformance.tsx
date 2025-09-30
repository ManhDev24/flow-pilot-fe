import { useState, useEffect } from 'react'

import {
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Timer,
  Play,
  RotateCcw,
  Settings,
  Bell,
  User,
  Users,
  BarChart3,
  Folder,
  Star
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Slider } from '@/app/components/ui/slider'
import { Switch } from '@/app/components/ui/switch'

export default function FlowpilotDashboard() {
  const [focusDuration, setFocusDuration] = useState([25])
  const [breakDuration, setBreakDuration] = useState([5])
  const [currentTime, setCurrentTime] = useState(25 * 60) // Will be updated based on settings
  const [initialTime, setInitialTime] = useState(25 * 60) // Track initial time for circle calculation
  const [isRunning, setIsRunning] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false) // Track if timer completed
  const [selectedMode, setSelectedMode] = useState('pomodoro')
  const [notifications, setNotifications] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime((time) => {
          if (time <= 1) {
            setIsRunning(false)
            setIsCompleted(true)
            return 0
          }
          return time - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, currentTime])

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

  const handleStart = () => {
    if (isCompleted) {
      handleReset()
    }
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setIsCompleted(false)
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

    // Update focus duration based on mode
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
      return 0
    }
    const progress = currentTime / initialTime
    return 2 * Math.PI * 45 * (1 - progress)
  }

  const weeklyData = [
    { day: 'Mon', hours: 4 },
    { day: 'Tue', hours: 5 },
    { day: 'Wed', hours: 6 },
    { day: 'Thu', hours: 7 },
    { day: 'Fri', hours: 8 },
    { day: 'Sat', hours: 6 },
    { day: 'Sun', hours: 5 }
  ]

  const maxHours = Math.max(...weeklyData.map((d) => d.hours))

  return (
    <div className=''>
      {/* Main Content */}
      <div className=' p-6'>
        {/* Metrics Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-500 mb-1'>Today's Tasks</p>
                  <p className='text-2xl font-bold'>12</p>
                  <p className='text-xs text-gray-400'>Total tasks assigned</p>
                  <p className='text-xs text-green-600 mt-1'>↗ 7% vs yesterday</p>
                </div>
                <Calendar className='w-8 h-8 text-orange-500' />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-500 mb-1'>Completion Rate</p>
                  <p className='text-2xl font-bold'>85%</p>
                  <p className='text-xs text-gray-400'>Tasks completed today</p>
                  <p className='text-xs text-green-600 mt-1'>↗ 5% vs yesterday</p>
                </div>
                <CheckCircle className='w-8 h-8 text-green-500' />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-500 mb-1'>Overdue Tasks</p>
                  <p className='text-2xl font-bold'>3</p>
                  <p className='text-xs text-gray-400'>Past deadline</p>
                  <p className='text-xs text-red-600 mt-1'>↗ 1% vs yesterday</p>
                </div>
                <AlertCircle className='w-8 h-8 text-red-500' />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-500 mb-1'>Focus Hours</p>
                  <p className='text-2xl font-bold'>6.5h</p>
                  <p className='text-xs text-gray-400'>Logged today</p>
                  <p className='text-xs text-green-600 mt-1'>↗ 10% vs yesterday</p>
                </div>
                <Timer className='w-8 h-8 text-purple-500' />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
          {/* Timer Section */}

          <div className='col-span-3 '>
            {/* Timer Mode Buttons */}
            <Card className='mb-8'>
              <CardContent className='space-y-8'>
                {/* Timer Mode Buttons */}
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                  <Button
                    variant={selectedMode === 'pomodoro' ? 'default' : 'outline'}
                    onClick={() => handleModeChange('pomodoro')}
                    className={selectedMode === 'pomodoro' ? 'bg-indigo-600 text-white' : ''}
                  >
                    Pomodoro ({focusDuration[0]}/{breakDuration[0]})
                  </Button>
                  <Button
                    variant={selectedMode === 'deep' ? 'default' : 'outline'}
                    onClick={() => handleModeChange('deep')}
                    className={selectedMode === 'deep' ? 'bg-indigo-600 text-white' : ''}
                  >
                    Deep Work (45/10)
                  </Button>
                  <Button
                    variant={selectedMode === 'marathon' ? 'default' : 'outline'}
                    onClick={() => handleModeChange('marathon')}
                    className={selectedMode === 'marathon' ? 'bg-indigo-600 text-white' : ''}
                  >
                    Marathon (60/15)
                  </Button>
                </div>

                {/* Timer Circle */}
                <div className='flex justify-center'>
                  <div className='relative w-72 h-72'>
                    <svg className='w-full h-full transform -rotate-90' viewBox='0 0 100 100'>
                      <circle cx='50' cy='50' r='45' stroke='#e5e7eb' strokeWidth='2' fill='none' />
                      <circle
                        cx='50'
                        cy='50'
                        r='45'
                        stroke={isCompleted ? '#ffffff' : '#6366f1'}
                        strokeWidth='2'
                        fill='none'
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={getCircleProgress()}
                        className='transition-all duration-1000 ease-linear'
                        strokeLinecap='round'
                      />
                    </svg>
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <span className={`text-5xl font-light ${isCompleted ? 'text-white' : 'text-indigo-600'}`}>
                        {formatTime(currentTime)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Timer Controls */}
                <div className='flex justify-center gap-4'>
                  <Button onClick={handleStart} className='bg-indigo-600 hover:bg-indigo-700 px-8'>
                    <Play className='w-4 h-4 mr-2' />
                    {isCompleted ? 'Start' : isRunning ? 'Pause' : 'Start'}
                  </Button>
                  <Button variant='outline' onClick={handleReset}>
                    <RotateCcw className='w-4 h-4 mr-2' />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Today's Schedule</CardTitle>
                <p className='text-sm text-gray-500'>Your timeline for the day.</p>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center gap-4'>
                  <div className='text-sm text-gray-500 w-16'>09:00 AM</div>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2'>
                      <span className='font-medium'>Daily Standup Meeting</span>
                      <Badge variant='secondary' className='bg-green-100 text-green-700'>
                        Meeting
                      </Badge>
                    </div>
                  </div>
                  <CheckCircle className='w-4 h-4 text-green-500' />
                </div>

                <div className='flex items-center gap-4'>
                  <div className='text-sm text-gray-500 w-16'>10:00 AM</div>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2'>
                      <span className='font-medium'>Review Q2 Project Report</span>
                      <Badge variant='secondary' className='bg-orange-100 text-orange-700'>
                        Task
                      </Badge>
                    </div>
                  </div>
                  <AlertCircle className='w-4 h-4 text-orange-500' />
                </div>

                <div className='flex items-center gap-4'>
                  <div className='text-sm text-gray-500 w-16'>11:30 AM</div>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2'>
                      <span className='font-medium'>Prepare for Client Demo</span>
                      <Badge variant='secondary' className='bg-blue-100 text-blue-700'>
                        Task
                      </Badge>
                    </div>
                  </div>
                  <Clock className='w-4 h-4 text-blue-500' />
                </div>

                <div className='flex items-center gap-4'>
                  <div className='text-sm text-gray-500 w-16'>01:00 PM</div>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2'>
                      <span className='font-medium'>Lunch Break</span>
                      <Badge variant='secondary' className='bg-gray-100 text-gray-700'>
                        Personal
                      </Badge>
                    </div>
                  </div>
                  <CheckCircle className='w-4 h-4 text-green-500' />
                </div>

                <div className='flex items-center gap-4'>
                  <div className='text-sm text-gray-500 w-16'>02:00 PM</div>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2'>
                      <span className='font-medium'>Refine UI/UX mockups</span>
                      <Badge variant='secondary' className='bg-purple-100 text-purple-700'>
                        Design
                      </Badge>
                    </div>
                  </div>
                  <Clock className='w-4 h-4 text-purple-500' />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className='space-y-6'>
            {/* Weekly Focus History */}
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

            {/* Timer Settings */}
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Timer Settings</CardTitle>
                <p className='text-sm text-gray-500'>Customize your focus and break durations</p>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div>
                  <div className='flex justify-between items-center mb-2'>
                    <span className='text-sm font-medium'>Focus Duration: {focusDuration[0]} min</span>
                  </div>
                  <Slider
                    value={focusDuration}
                    onValueChange={(value) => {
                      setFocusDuration(value)
                      // Update selected mode to custom when manually adjusting
                      if (selectedMode !== 'custom') {
                        setSelectedMode('custom')
                      }
                    }}
                    max={60}
                    min={15}
                    step={5}
                    className='w-full'
                  />
                </div>

                <div>
                  <div className='flex justify-between items-center mb-2'>
                    <span className='text-sm font-medium'>Break Duration: {breakDuration[0]} min</span>
                  </div>
                  <Slider
                    value={breakDuration}
                    onValueChange={(value) => {
                      setBreakDuration(value)
                      // Update selected mode to custom when manually adjusting
                      if (selectedMode !== 'custom') {
                        setSelectedMode('custom')
                      }
                    }}
                    max={30}
                    min={5}
                    step={5}
                    className='w-full'
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium'>Enable Notifications</span>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
              </CardContent>
            </Card>

            {/* Priority Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Priority Tasks</CardTitle>
                <p className='text-sm text-gray-500'>Urgent tasks requiring immediate attention.</p>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <Star className='w-4 h-4 text-yellow-500' />
                  <div className='flex-1'>
                    <p className='text-sm font-medium'>Finalize Q3 Budget Proposal</p>
                    <p className='text-xs text-red-600'>Today, 5 PM</p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <Star className='w-4 h-4 text-yellow-500' />
                  <div className='flex-1'>
                    <p className='text-sm font-medium'>Submit Expense Reports</p>
                    <p className='text-xs text-orange-600'>Tomorrow</p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <Star className='w-4 h-4 text-yellow-500' />
                  <div className='flex-1'>
                    <p className='text-sm font-medium'>Onboard new intern - Session 1</p>
                    <p className='text-xs text-gray-500'>Aug 25, 2024</p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <Star className='w-4 h-4 text-yellow-500' />
                  <div className='flex-1'>
                    <p className='text-sm font-medium'>Follow up with HR on policy update</p>
                    <p className='text-xs text-gray-500'>Aug 19, 2024</p>
                  </div>
                </div>

                <Button variant='link' className='text-sm text-indigo-600 p-0 h-auto'>
                  View All Priority Tasks
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Personal Notifications */}
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
      </div>
    </div>
  )
}
