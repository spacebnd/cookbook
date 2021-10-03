import { configureStore } from '@reduxjs/toolkit'
import entitiesReducer from './modules/entities.js'
import authReducer from './modules/auth.js'
import uiReducer from './modules/ui.js'
import LogRocket from 'logrocket'

const middlewares = [LogRocket.reduxMiddleware()]

export default configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    entities: entitiesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares),
})
