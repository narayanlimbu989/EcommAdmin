import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/AuthSlice";
import blogcategorySlice from "./Slices/BlogCategoriesSlice";
import CategoriesSlice from "./Slices/CategoriesSlice";
import BrandSlice from "./Slices/BrandSlice";
import colorSlice from "./Slices/colorSlice";
import imageSlice from "./Slices/imageSlice";
import blogimageSlice from "./Slices/blogimageSlice";
import cuponSlice from "./Slices/cuponSlice";

export const store = configureStore({
  reducer: {
    Auth: AuthSlice,
    blogcategory: blogcategorySlice,
    category: CategoriesSlice,
    brand: BrandSlice,
    color: colorSlice,
    image: imageSlice,
    blogimage: blogimageSlice,
    cuponlist: cuponSlice,
  },
});
