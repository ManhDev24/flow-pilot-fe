import type { IRoleState } from "@/app/models";
import { getLocalStorage } from "@/app/utils";
import { createSlice } from "@reduxjs/toolkit";

const roleLocalStorage = getLocalStorage('role');

const initialState: IRoleState = {
  currentRole: roleLocalStorage,
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRole: (state, action: { payload: string }) => {
      state.currentRole = action.payload;
    },
    removeRole: (state) => {
      state.currentRole = '';
    },
  },
})

export const { setRole, removeRole } = roleSlice.actions;
export default roleSlice;