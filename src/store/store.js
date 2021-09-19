import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './modules/ui.js'
import entitiesReducer from './modules/entities.js'
import authReducer from './modules/auth.js'

export default configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    entities: entitiesReducer,
  },
})
