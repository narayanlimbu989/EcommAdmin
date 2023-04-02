import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogimages: null,
};

export const blogimageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setblogImages: (state, action) => {
      const data = action.payload;
      state.blogimages = data;
    },
  },
});

export const { setblogImages } = blogimageSlice.actions;

export default blogimageSlice.reducer;
