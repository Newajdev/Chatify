import { configureStore } from '@reduxjs/toolkit'
import  UserInfoSlice  from './slice/user/UserInfoSlice'

export default configureStore({
  reducer: {
    activeUser: UserInfoSlice
  }
})