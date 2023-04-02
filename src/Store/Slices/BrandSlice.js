import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brand: null,
};

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setBrand: (state, action) => {
      const data = action.payload;
      state.brand = data;
    },
  },
});

export const { setBrand } = brandSlice.actions;

export default brandSlice.reducer;
