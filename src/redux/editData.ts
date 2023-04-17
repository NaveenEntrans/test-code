import { createSlice } from "@reduxjs/toolkit";

export const editSlice = createSlice({
  name: "editData",

  initialState: {
    editData: null,
  },
  reducers: {
    setEditData: (state, action) => {
      state.editData = action.payload;
    },
  },
});

export const { setEditData } = editSlice.actions;
export default editSlice.reducer;
