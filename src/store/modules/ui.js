import { createSlice } from '@reduxjs/toolkit'
import { ENTITIES, MANAGEMENT_TAB_INDEXES, SCREENS } from '../../common/constants.js'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    activeScreen: SCREENS.RECIPES.value,
    activeManagementTab: MANAGEMENT_TAB_INDEXES[ENTITIES.RECIPES.value],
    activeCreateModal: null,
  },
  reducers: {
    setActiveScreen: (state, action) => {
      state.activeScreen = action.payload
    },

    setActiveManagementTab: (state, action) => {
      state.activeManagementTab = action.payload
    },

    setActiveCreateModal: (state, action) => {
      state.activeCreateModal = action.payload
    },
  },
})

export const { setActiveScreen, setActiveManagementTab, setActiveCreateModal } = uiSlice.actions

// selectors
export const selectActiveScreen = (state) => {
  return state.ui.activeScreen
}

export const selectActiveManagementTab = (state) => {
  return state.ui.activeManagementTab
}

export const selectActiveCreateModal = (state) => {
  return state.ui.activeCreateModal
}

export default uiSlice.reducer
