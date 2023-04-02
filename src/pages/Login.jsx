import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import { userlogin } from "../Http_service/Httpservice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAuth } from "../Store/Slices/AuthSlice";

const alertcss = {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
};
const Login = () => {
  const dispatch = useDispatch();
  const link = useNavigate();
  const [datas, setdatas] = useState({
    username: "",
    password: "",
  });
  const takedata = (e) => {
    setdatas((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };
  const login = async (e) => {
    e.preventDefault();
    const { data } = await userlogin(datas);
    if (data.authenticate) {
      toast.success(data.message, alertcss);
      dispatch(setAuth(data));
      link("/admin");
    } else {
      toast.error(data.message, alertcss);
    }
  };
  return (
    <div
      className="login-sec py-5 d-flex flex-column align-items-center justify-content-center"
      style={{ background: "#fea41e" }}
    >
      <ToastContainer />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h1 className="mb-5">EasyShop</h1>
        <h4>Sign In</h4>
        <form>
          <CustomInput
            type="text"
            name="username"
            value={datas.username}
            onChange={takedata}
            label="username"
          />
          <CustomInput
            type="password"
            name="password"
            value={datas.password}
            onChange={takedata}
            label="password"
          />
          <p
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => link("/forgotpassword")}
          >
            Forgot password?
          </p>
          <button onClick={login} className="loginbtn">
            sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
