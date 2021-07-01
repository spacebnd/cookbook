import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    activeScreen: null,
  },
  reducers: {
    setActiveScreen: (state, action) => {
      state.activeScreen = action.payload
    },
  },
})

export const { setActiveScreen } = uiSlice.actions

export default uiSlice.reducer
