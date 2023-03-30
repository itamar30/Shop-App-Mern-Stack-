import { createSlice } from "@reduxjs/toolkit";

export const mobileSlice = createSlice({
  name: "mobile",
  initialState: {
    firstRender: true,
  },
  reducers: {
    showMsg: (state) => {
      state.firstRender = true;
    },
    dontShowMsg: (state) => {
      state.firstRender = false;
    },
  },
});

export const { showMsg, dontShowMsg } = mobileSlice.actions;

export default mobileSlice.reducer;
