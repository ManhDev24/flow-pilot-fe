import { getLocalStorage } from "@/app/utils";
import { createSlice } from "@reduxjs/toolkit";

const roleLocalStorage = getLocalStorage('role');

const initialState = {
    currentRole: roleLocalStorage || null,
};


const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        setRole: (state, action) => {
            state.currentRole = action.payload;
        },
        removeRole: (state) => {
            state.currentRole = null;
        },
    },
})

export const { setRole, removeRole } = roleSlice.actions;
export default roleSlice;