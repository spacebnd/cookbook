import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './modules/ui.js'

export default configureStore({
  reducer: {
    ui: uiReducer,
  },
})
