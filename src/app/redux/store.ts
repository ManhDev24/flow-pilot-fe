import { combineReducers } from 'redux'
import userSlice from './slices/user.slice'
import { configureStore } from '@reduxjs/toolkit'
import roleSlice from './slices/role.slice'
import timerSlice from './slices/timer.slice'
import profileSlice from './slices/profile.slice'

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [roleSlice.name]: roleSlice.reducer,
  [timerSlice.name]: timerSlice.reducer,
  [profileSlice.name]: profileSlice.reducer
})

const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.VITE_NODE_ENV === 'development'
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
