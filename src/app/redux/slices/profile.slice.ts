import type { IProfile, IProfileState } from "@/app/models";
import { getLocalStorage } from "@/app/utils";
import { createSlice } from "@reduxjs/toolkit";

const profileLocalStorage = getLocalStorage('profile');

const initialState: IProfileState = {
  currentProfile: profileLocalStorage || null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: { payload: IProfile }) => {
      state.currentProfile = action.payload;
    },
    removeProfile: (state) => {
      state.currentProfile = null;
    },
  },
})

export const { setProfile, removeProfile } = profileSlice.actions;
export default profileSlice;