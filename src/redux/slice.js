import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    refresh: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setUser: (state,action) =>{
            state.user = action.payload
        },
        reset: () => initialState,
    }
})

export const { setUser, reset } = authSlice.actions

export default authSlice.reducer