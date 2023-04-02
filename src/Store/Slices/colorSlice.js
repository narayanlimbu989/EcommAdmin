import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  color: null,
};

export const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setcolor: (state, action) => {
      const data = action.payload;
      state.color = data;
    },
  },
});

export const { setcolor } = colorSlice.actions;

export default colorSlice.reducer;
