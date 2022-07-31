import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  mispartituras: [],
}

export const mispartiturasSlice = createSlice({
  name: 'mispartituras',
  initialState,
  reducers: {
    setMispartituras: (state, action) => {
      state.mispartituras = action.payload
    },
  },
})

export const {setMispartituras} = mispartiturasSlice.actions

export default mispartiturasSlice.reducer
