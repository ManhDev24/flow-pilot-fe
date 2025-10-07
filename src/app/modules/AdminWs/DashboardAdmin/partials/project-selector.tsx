import { Card } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { usePerformanceContext } from '@/app/modules/AdminWs/DashboardAdmin/context/PerformanceContext'
import { Calendar, X } from 'lucide-react'

// Các preset date ranges phổ biến
const datePresets = [
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 90 days', days: 90 },
  { label: 'This year', days: 365 }
]

export function DateRangeSelector() {
  const { fromDate, toDate, setFromDate, setToDate, setDateRange, clearDateRange, isDateRangeSet } = usePerformanceContext()

  const handlePresetClick = (days: number) => {
    const toDateValue = new Date().toISOString().split('T')[0]
    const fromDateValue = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    setDateRange(fromDateValue, toDateValue)
  }

  return (
    <Card className="p-4 mb-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-600" />
            <label className="text-sm font-medium text-gray-700">
              Filter by Date Range:
            </label>
          </div>
          {isDateRangeSet && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearDateRange}
              className="text-gray-600 hover:text-gray-800"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          {/* Date inputs */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-600">From:</label>
            <Input
              type="date"
              value={fromDate || ''}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-36"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-600">To:</label>
            <Input
              type="date"
              value={toDate || ''}
              onChange={(e) => setToDate(e.target.value)}
              className="w-36"
            />
          </div>

          {/* Preset buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Quick select:</span>
            {datePresets.map((preset) => (
              <Button
                key={preset.label}
                variant="outline"
                size="sm"
                onClick={() => handlePresetClick(preset.days)}
                className="text-xs"
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        {isDateRangeSet && (
          <div className="text-xs text-blue-600 bg-blue-50 px-3 py-2 rounded">
            Filtering data from {fromDate || 'beginning'} to {toDate || 'present'}
          </div>
        )}
      </div>
    </Card>
  )
}