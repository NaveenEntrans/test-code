import { createSlice } from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
    name: "authenticationData",
  
    initialState: {
        authenticationData: false,
    },
    reducers: {
        setAuthenticationData: (state, action) => {
        state.authenticationData = action.payload;
      },
    },
  });
  
  export const { setAuthenticationData } = authenticationSlice.actions;
  export default authenticationSlice.reducer;