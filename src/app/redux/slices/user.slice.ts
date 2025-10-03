import type { IUserState, IUserStatePayload } from '@/app/models'
import { getLocalStorage } from '@/app/utils';
import { createSlice } from '@reduxjs/toolkit'

const userLocalStorage = getLocalStorage('user');

const initialState: IUserState = {
  currentUser: userLocalStorage || null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: { payload: IUserStatePayload }) => {
      state.currentUser = action.payload
    },
    removeUser: (state) => {
      state.currentUser = null
    }
  }
})
export const { setUser, removeUser } = userSlice.actions
export default userSlice
