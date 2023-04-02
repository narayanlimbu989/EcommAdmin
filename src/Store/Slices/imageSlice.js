import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: null,
};

export const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setImages: (state, action) => {
      const data = action.payload;
      state.images = data;
    },
  },
});

export const { setImages } = imageSlice.actions;

export default imageSlice.reducer;
