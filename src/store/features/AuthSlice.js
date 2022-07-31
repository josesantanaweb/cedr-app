import {createSlice} from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
  isAuthenticated: !AsyncStorage.getItem('token') ? false : true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
  },
})

export const {setAuthenticated} = authSlice.actions

export default authSlice.reducer
