import { createSlice } from '@reduxjs/toolkit'
import { SCREENS } from '../../common/constants.js'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    activeScreen: SCREENS.RECIPES.value,
    activeCreateModal: null,
  },
  reducers: {
    setActiveScreen: (state, action) => {
      state.activeScreen = action.payload
    },

    setActiveCreateModal: (state, action) => {
      state.activeCreateModal = action.payload
    },
  },
})

export const { setActiveScreen, setActiveCreateModal } = uiSlice.actions

export default uiSlice.reducer
