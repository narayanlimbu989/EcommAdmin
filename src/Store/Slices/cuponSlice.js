import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cupon: null,
};

export const cuponSlice = createSlice({
  name: "cupons",
  initialState,
  reducers: {
    setCupon: (state, action) => {
      const data = action.payload;
      state.cupon = data;
    },
  },
});

export const { setCupon } = cuponSlice.actions;

export default cuponSlice.reducer;
