import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    loading: false,
    error: null,
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
            state.error = null
        },
        loginSuccess: (state, action) => {
            state.loading = false
            state.currentUser = action.payload
            state.error = null
        },
        loginFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        logout: (state) => {
            state.currentUser = null
        },
    },
})

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions

export default userSlice.reducer