import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/UserSlice'
// import ActiveUserSlice from './slices/ActiveUserSlice'





export const store = configureStore({
  reducer: {
    loginuserdata: userSlice,
    // activeuserdata: ActiveUserSlice,
  },
})