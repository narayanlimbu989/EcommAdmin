import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      const data = action.payload;
      state.categories = data;
    },
  },
});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;
