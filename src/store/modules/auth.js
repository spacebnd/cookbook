import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isUserAuth: false,
  },
  reducers: {
    setIsUserAuth: (state, action) => {
      state.isUserAuth = action.payload
    },
  },
})

export const { setIsUserAuth } = authSlice.actions

// selectors
export const selectIsUserAuth = (state) => {
  return state.auth.isUserAuth
}

export default authSlice.reducer
