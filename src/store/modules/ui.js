import { createSlice } from '@reduxjs/toolkit'
import { ENTITIES, MANAGEMENT_TAB_INDEXES, SCREENS } from '../../common/constants.js'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isLoading: true,
    deviceInfo: null,
    activeScreen: SCREENS.RECIPES.value,
    activeManagementTab: MANAGEMENT_TAB_INDEXES[ENTITIES.RECIPES.value],
    activeCreateModal: null,
    editableEntity: null,
    statusAlert: {
      message: null,
      type: null,
    },
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },

    setDeviceData: (state, action) => {
      state.deviceInfo = action.payload
    },

    setActiveScreen: (state, action) => {
      state.activeScreen = action.payload
    },

    setActiveManagementTab: (state, action) => {
      state.activeManagementTab = action.payload
    },

    setActiveCreateModal: (state, action) => {
      state.activeCreateModal = action.payload
    },

    setEditableEntity: (state, action) => {
      state.editableEntity = action.payload
    },

    setStatusAlert: (state, action) => {
      state.statusAlert = action.payload
    },
  },
})

export const {
  setIsLoading,
  setDeviceData,
  setActiveScreen,
  setActiveManagementTab,
  setActiveCreateModal,
  setEditableEntity,
  setStatusAlert,
} = uiSlice.actions

// selectors
export const selectIsLoading = (state) => {
  return state.ui.isLoading
}

export const selectIsDesktop = (state) => {
  return state.ui.deviceInfo?.platform?.type === 'desktop'
}

export const selectActiveScreen = (state) => {
  return state.ui.activeScreen
}

export const selectActiveManagementTab = (state) => {
  return state.ui.activeManagementTab
}

export const selectActiveCreateModal = (state) => {
  return state.ui.activeCreateModal
}

export const selectEditableEntity = (state) => {
  return state.ui.editableEntity
}

export const selectStatusAlert = (state) => {
  return state.ui.statusAlert
}

export default uiSlice.reducer
