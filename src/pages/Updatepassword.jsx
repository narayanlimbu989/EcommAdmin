import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import { changepassword } from "../Http_service/Httpservice";

const Updatepassword = () => {
  const [data1, setdata] = useState({
    currentpassword: "",
    newpassword: "",
    confirmpassword: "",
  });
  const submitdata = (e) => {
    setdata((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };
  const postdata = async (e) => {
    e.preventDefault();
    const { data } = await changepassword(data1);
    console.log(data);
  };
  return (
    <div className="login-sec py-5" style={{ background: "#fea41e" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h4>Update password</h4>
        <p>!please Enter your current password currectly</p>
        <form>
          <CustomInput
            type="password"
            name="currentpassword"
            value={data1.currentpassword}
            onChange={submitdata}
            label="Current password"
          />
          <CustomInput
            type="password"
            name="newpassword"
            value={data1.newpassword}
            onChange={submitdata}
            label="New password"
          />
          <CustomInput
            type="password"
            name="confirmpassword"
            value={data1.confirmpassword}
            onChange={submitdata}
            label="confirm password"
          />
          <button onClick={postdata} className="loginbtn">
            Change password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Updatepassword;
