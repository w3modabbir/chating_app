import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const ActiveUserSlice = createSlice({
  name: 'activeuser',
  initialState,
  reducers: {
    activeuser: (state, action) => {
      state.value = action.payload
    },
  },
})


export const { activeuser } = ActiveUserSlice.actions

export default ActiveUserSlice.reducer