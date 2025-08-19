import { createSlice } from '@reduxjs/toolkit'

export const UserInfoSlice = createSlice({
  name: 'info',
  initialState: {
    value: localStorage.getItem("userInfo:") ? JSON.parse(localStorage.getItem("userInfo:")):null
  },
  reducers: {
    userDetails: (state, action) =>{
        state.value = action.payload
        
    }
  }
})

// Action creators are generated for each case reducer function
export const { userDetails } = UserInfoSlice.actions

export default UserInfoSlice.reducer