import React from "react";
import CustomInput from "../components/CustomInput";

const Forgotpassword = () => {
  return (
    <div className="login-sec py-5" style={{ background: "#fea41e" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h4>Reset password</h4>
        <p>please Enter your Register Email Address</p>
        <form action="">
          <CustomInput type="text" _id="user" label="Email Address" />
          <button className="loginbtn">Reset password</button>
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword;
