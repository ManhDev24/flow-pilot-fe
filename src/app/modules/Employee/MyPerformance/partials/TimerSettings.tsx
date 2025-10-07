import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Slider } from '@/app/components/ui/slider'

interface TimerSettingsProps {
  focusDuration: number[]
  breakDuration: number[]
  selectedMode: string
  onFocusDurationChange: (value: number[]) => void
  onBreakDurationChange: (value: number[]) => void
  onModeChange: (mode: string) => void
}

export function TimerSettings({
  focusDuration,
  breakDuration,
  selectedMode,
  onFocusDurationChange,
  onBreakDurationChange,
  onModeChange
}: TimerSettingsProps) {
  const handleFocusDurationChange = (value: number[]) => {
    onFocusDurationChange(value)
    if (selectedMode !== 'custom') {
      onModeChange('custom')
    }
  }

  const handleBreakDurationChange = (value: number[]) => {
    onBreakDurationChange(value)
    if (selectedMode !== 'custom') {
      onModeChange('custom')
    }
  }

  return (
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
            onValueChange={handleFocusDurationChange}
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
            onValueChange={handleBreakDurationChange}
            max={30}
            min={5}
            step={5}
            className='w-full'
          />
        </div>
      </CardContent>
    </Card>
  )
}
