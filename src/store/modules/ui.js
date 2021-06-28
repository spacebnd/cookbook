import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDrawerOpen: false,
  },
  reducers: {
    setIsDrawerOpen: (state, action) => {
      state.isDrawerOpen = action.payload
    },
  },
})

export const { setIsDrawerOpen } = uiSlice.actions

export default uiSlice.reducer
