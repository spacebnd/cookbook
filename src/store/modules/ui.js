import { createSlice } from '@reduxjs/toolkit'
import { SCREENS } from '../../common/constants.js'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    activeScreen: SCREENS.RECIPES.value,
  },
  reducers: {
    setActiveScreen: (state, action) => {
      state.activeScreen = action.payload
    },
  },
})

export const { setActiveScreen } = uiSlice.actions

export default uiSlice.reducer
