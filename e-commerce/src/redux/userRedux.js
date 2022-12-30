import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
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
      state.isFetching = false;
      state.currentUser = action.payload;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});
export default userSlice.reducer;
export const { loginStart, loginFailure, loginSuccess } = userSlice.actions;
