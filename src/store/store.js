import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './modules/ui.js'
import entitiesReducer from './modules/entities.js'

export default configureStore({
  reducer: {
    ui: uiReducer,
    entities: entitiesReducer,
  },
})
