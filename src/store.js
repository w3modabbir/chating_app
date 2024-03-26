import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/UserSlice'
import  activeUserSlice from './slices/ActiveUserSlice'



export const store = configureStore({
  reducer: {
    loginuserdata: userSlice,
    activeuserdata: activeUserSlice,
  },
})