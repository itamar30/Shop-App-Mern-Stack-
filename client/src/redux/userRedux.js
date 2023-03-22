import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const userRedux = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.error = false;

      state.isFetching = false;
      state.currentUser = action.payload;

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Successfully Loged in as ${
          state.currentUser?.isAdmin ? "Admin" : "Regular user"
        }`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    },
    logOut: (state, action) => {
      state.currentUser = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logOut } =
  userRedux.actions;
export default userRedux.reducer;
