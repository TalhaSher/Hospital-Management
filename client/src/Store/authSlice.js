import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  role: "",
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    setRole: (state, action) => {
      state.role = action.payload.role;
    },
  },
});

export const { setUser, setIsLoggedIn, setRole } = authSlice.actions;

export default authSlice.reducer;
