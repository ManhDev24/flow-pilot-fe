import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface PerformanceContextType {
  fromDate: string
  toDate: string
  setFromDate: (date: string | undefined) => void
  setToDate: (date: string | undefined) => void
  setDateRange: (from: string, to: string) => void
  clearDateRange: () => void
  isDateRangeSet: boolean
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined)

// Default date range (last 30 days)
const getDefaultDateRange = () => {
  const today = new Date()
  const thirtyDaysAgo = new Date(today)
  thirtyDaysAgo.setDate(today.getDate() - 30)

  return {
    fromDate: thirtyDaysAgo.toISOString().split('T')[0],
    toDate: today.toISOString().split('T')[0]
  }
}

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const defaultRange = getDefaultDateRange()
  const [fromDate, setFromDateState] = useState(defaultRange.fromDate)
  const [toDate, setToDateState] = useState(defaultRange.toDate)

  const setFromDate = (date: string | undefined) => {
    if (date) {
      setFromDateState(date)
    }
  }

  const setToDate = (date: string | undefined) => {
    if (date) {
      setToDateState(date)
    }
  }

  const setDateRange = (from: string, to: string) => {
    setFromDateState(from)
    setToDateState(to)
  }

  const clearDateRange = () => {
    const defaultRange = getDefaultDateRange()
    setFromDateState(defaultRange.fromDate)
    setToDateState(defaultRange.toDate)
  }

  const isDateRangeSet = fromDate !== '' && toDate !== ''

  return (
    <PerformanceContext.Provider
      value={{
        fromDate,
        toDate,
        setFromDate,
        setToDate,
        setDateRange,
        clearDateRange,
        isDateRangeSet
      }}
    >
      {children}
    </PerformanceContext.Provider>
  )
}

export function usePerformanceContext() {
  const context = useContext(PerformanceContext)
  if (context === undefined) {
    throw new Error('usePerformanceContext must be used within a PerformanceProvider')
  }
  return context
}
