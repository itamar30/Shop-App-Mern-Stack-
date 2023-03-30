import { createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    isOn: false,
  },
  reducers: {
    showNavbar: (state) => {
      state.isOn = true;
      console.log("run");
    },
    dontShowNavbar: (state) => {
      state.isOn = false;
    },
  },
});

export const { showNavbar, dontShowNavbar } = navbarSlice.actions;

export default navbarSlice.reducer;
