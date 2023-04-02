import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Upatepassword from "./pages/Updatepassword";
import Mainlayout from "./components/Mainlayout";
import Dashboard from "./pages/Dashboard";
import Addblogs from "./pages/Addblogs";
import Addproduct from "./pages/Addproduct";
import AddBrand from "./pages/AddBrand";
import AddCategory from "./pages/Addcategory";
import AddColor from "./pages/Addcolor";
import AddBlogCategory from "./pages/Addblogcategory";
import Productlist from "./pages/product-list";
import Bloglist from "./pages/blog-list";
import { useSelector } from "react-redux";
import Orderlist from "./pages/Order-list";
import { useRefresh } from "./Hook/useRefresh";
import Addcupons from "./pages/AddCupons";
function App() {
  const { loading } = useRefresh();
  return loading ? (
    <p>loading...</p>
  ) : (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Guestarea>
              {" "}
              <Login />
            </Guestarea>
          }
        />
        <Route
          path="/forgotpassword"
          element={
            <Guestarea>
              <Forgotpassword />
            </Guestarea>
          }
        />
        <Route
          path="/admin"
          element={
            <Protectedarea>
              <Mainlayout />
            </Protectedarea>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="blog" element={<Addblogs />} />
          <Route path="product" element={<Addproduct />} />
          <Route path="brand" element={<AddBrand />} />
          <Route path="updatepassword" element={<Upatepassword />} />
          <Route path="categories" element={<AddCategory />} />
          <Route path="color" element={<AddColor />} />
          <Route path="blog-categories" element={<AddBlogCategory />} />
          <Route path="product-list" element={<Productlist />} />
          <Route path="blog-list" element={<Bloglist />} />
          <Route path="orders" element={<Orderlist />} />
          <Route path="addcupon" element={<Addcupons />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const Guestarea = ({ children }) => {
  const { islogin } = useSelector((state) => state.Auth);
  if (islogin) {
    return <Navigate to="/admin" />;
  }
  return children;
};

const Protectedarea = ({ children }) => {
  const { islogin } = useSelector((state) => state.Auth);
  if (!islogin) {
    return <Navigate to="/" />;
  }
  return children;
};

export default App;
