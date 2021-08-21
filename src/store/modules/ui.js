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

// selectors
export const selectActiveScreen = (state) => {
  return state.ui.activeScreen
}

export const selectActiveCreateModal = (state) => {
  return state.ui.activeCreateModal
}

export default uiSlice.reducer
