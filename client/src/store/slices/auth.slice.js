import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload.currentUser
        },
    },
})

// Action creators are generated for each case reducer function
export const { setCurrentUser } = authSlice.actions

export default authSlice.reducer