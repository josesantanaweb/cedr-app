import {configureStore} from '@reduxjs/toolkit'
import authReducer from './features/AuthSlice'
import mispartiturasReducer from './features/MispartiturasSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mispartituras: mispartiturasReducer,
  },

  devTools: true,
})
