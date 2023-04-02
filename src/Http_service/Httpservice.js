import axios from "axios";

const base_url = "http://localhost:8000";
const api = axios.create({
  baseURL: base_url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const apiImageupload = axios.create({
  baseURL: base_url,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});
// post https
export const userlogin = (data) => api.post("/user/adminlogin", data);
export const addBrand = (data) => api.post("/brand", data);
export const addProduct = (data) => api.post("/product", data);
export const addBlogs = (data) => api.post("/blog", data);
export const addCategory = (data) => api.post("/productcategory", data);
export const addColor = (data) => api.post("/color", data);
export const addblogcategory = (data) => api.post("/blogcategory", data);
export const adddiscountcupon = (data) => api.post("/cupon", data);


export const logout = () => api.post("/user/logout");
export const uploadImage = (data) => apiImageupload.post("/upload", data);

// get https
export const getBrand = () => api.get("/brand");
export const getColor = () => api.get("/color");
export const getCategory = () => api.get("/productcategory");
export const getBlogCategory = () => api.get("/blogcategory");
export const getBlogs = () => api.get("/blog");
export const getProducts = () => api.get("/product");
export const getOrders = () => api.get("/user/orders");
export const getdiscountcupon = () => api.get("/cupon");


// delete https
export const deleteBlogCategory = (data) => api.delete(`/blogcategory/${data}`);
export const deleteBrand = (data) => api.delete(`/brand/${data}`);
export const deleteCategory = (data) => api.delete(`/productcategory/${data}`);
export const deleteColor = (data) => api.delete(`/color/${data}`);
export const deleteProduct = (data) => api.delete(`/product/${data}`);
export const deleteBlogs = (data) => api.delete(`/blog/${data}`);
export const deleteImages = (data) => api.delete(`/upload/delete/${data}`);
export const deleteCupon = (data) => api.delete(`/cupon/${data}`);


// put https
export const changepassword = (data) => api.put("/user/changepassword", data);
export const addcupontoproduct = (data) => api.put("/product/addcupon", data);
export const removecuponfromproduct = (data) => api.put("/product/removecupon", data);


api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const orginalRequest = error.config;
    if (
      error.response.status === 401 &&
      orginalRequest &&
      !orginalRequest._isRetry
    ) {
      orginalRequest._isRetry = true;
      try {
        await axios.get(`${base_url}/user/refresh`, {
          withCredentials: true,
        });
        return api.request(orginalRequest);
      } catch (error) {
        console.log(error.message);
      }
    }
    throw error;
  }
);
