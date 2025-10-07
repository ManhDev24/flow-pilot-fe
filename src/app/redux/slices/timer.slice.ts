import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface TimerState {
  currentTime: number
  initialTime: number
  isRunning: boolean
  isCompleted: boolean
  isBreakMode: boolean
  selectedMode: string
  focusDuration: number[]
  breakDuration: number[]
  focusStartTime: number | null
  isVisible: boolean // For global widget visibility
}

const initialState: TimerState = {
  currentTime: 25 * 60, // 25 minutes in seconds
  initialTime: 25 * 60,
  isRunning: false,
  isCompleted: false,
  isBreakMode: false,
  selectedMode: 'pomodoro',
  focusDuration: [25],
  breakDuration: [5],
  focusStartTime: null,
  isVisible: false
}

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload
    },
    setInitialTime: (state, action: PayloadAction<number>) => {
      state.initialTime = action.payload
    },
    setIsRunning: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload
      // Show widget when timer starts, hide when stops
      state.isVisible = action.payload
    },
    setIsCompleted: (state, action: PayloadAction<boolean>) => {
      state.isCompleted = action.payload
      if (action.payload) {
        state.isVisible = false
      }
    },
    setIsBreakMode: (state, action: PayloadAction<boolean>) => {
      state.isBreakMode = action.payload
    },
    setSelectedMode: (state, action: PayloadAction<string>) => {
      state.selectedMode = action.payload
    },
    setFocusDuration: (state, action: PayloadAction<number[]>) => {
      state.focusDuration = action.payload
    },
    setBreakDuration: (state, action: PayloadAction<number[]>) => {
      state.breakDuration = action.payload
    },
    setFocusStartTime: (state, action: PayloadAction<number | null>) => {
      state.focusStartTime = action.payload
    },
    setTimerVisible: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload
    },
    decrementTime: (state) => {
      if (state.currentTime > 0) {
        state.currentTime -= 1
      }
      if (state.currentTime === 0) {
        state.isRunning = false
        state.isCompleted = true
        state.isVisible = false
      }
    },
    resetTimer: (state) => {
      state.isRunning = false
      state.isCompleted = false
      state.isBreakMode = false
      state.focusStartTime = null
      state.isVisible = false
      const newTime =
        state.selectedMode === 'pomodoro'
          ? state.focusDuration[0] * 60
          : state.selectedMode === 'deep'
            ? 45 * 60
            : state.selectedMode === 'marathon'
              ? 60 * 60
              : state.focusDuration[0] * 60
      state.currentTime = newTime
      state.initialTime = newTime
    },
    changeModeAndReset: (
      state,
      action: PayloadAction<{
        mode: string
        focusDuration: number[]
        breakDuration: number[]
      }>
    ) => {
      const { mode, focusDuration, breakDuration } = action.payload
      state.selectedMode = mode
      state.focusDuration = focusDuration
      state.breakDuration = breakDuration
      state.isRunning = false
      state.isCompleted = false
      state.isVisible = false

      const newTime = focusDuration[0] * 60
      state.currentTime = newTime
      state.initialTime = newTime
    }
  }
})

export const {
  setCurrentTime,
  setInitialTime,
  setIsRunning,
  setIsCompleted,
  setIsBreakMode,
  setSelectedMode,
  setFocusDuration,
  setBreakDuration,
  setFocusStartTime,
  setTimerVisible,
  decrementTime,
  resetTimer,
  changeModeAndReset
} = timerSlice.actions

export default timerSlice
