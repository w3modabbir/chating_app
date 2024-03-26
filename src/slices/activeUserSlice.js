import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
//   value: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
}

export const activeUserSlice = createSlice({
  name: 'activeuser',
  initialState,
  reducers: {
    activeuser: (state, action) => {
      state.value = action.payload
    },
  },
})


export const { activeuser } = activeUserSlice.actions

export default activeUserSlice.reducer