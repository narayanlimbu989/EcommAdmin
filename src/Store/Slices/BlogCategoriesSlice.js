import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogcategories: null,
};

export const blogcategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setblogCategory: (state, action) => {
      const data = action.payload;
      state.blogcategories = data;
    },
  },
});

export const { setblogCategory } = blogcategorySlice.actions;

export default blogcategorySlice.reducer;
