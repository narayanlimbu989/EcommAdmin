import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  islogin: false,
  user: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { userinfo } = action.payload;
      state.user = userinfo;
      if (userinfo === null) {
        state.islogin = false;
      } else {
        state.islogin = true;
      }
    },
  },
});

export const { setAuth } = AuthSlice.actions;

export default AuthSlice.reducer;
