import React, { useState, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import {
  addblogcategory,
  deleteBlogCategory,
  getBlogCategory,
} from "../Http_service/Httpservice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table } from "antd";
import { useDispatch } from "react-redux";
import { setblogCategory } from "../Store/Slices/BlogCategoriesSlice";

const alertcss = {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
};
const AddBlogCategory = () => {
  const [title, settitle] = useState("");
  const [data1, setdata1] = useState([]);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "No.",
      dataIndex: "key",
    },
    {
      title: "Categories",
      dataIndex: "title",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const productBrand = async (e) => {
    e.preventDefault();
    const { data } = await addblogcategory({ title });
    if (data.value) {
      toast.success(data.message, alertcss);
      settitle("");
    } else {
      toast.error(data.message, alertcss);
    }
  };

  const deletepage = async (id) => {
    const { data } = await deleteBlogCategory(id);
    if (data.value) {
      toast.success(data.message, alertcss);
      settitle("");
    } else {
      toast.error(data.message, alertcss);
    }
  };
  const category = [];
  for (let i = 0; i < data1.length; i++) {
    category.push({
      key: i + 1,
      title: data1[i].title,
      action: (
        <p
          className="delete mb-0"
          onClick={() => deletepage(data1[i]._id)}
          style={{ cursor: "pointer" }}
        >
          Delete
        </p>
      ),
    });
  }

  useEffect(() => {
    const getitems = async () => {
      const { data } = await getBlogCategory();
      setdata1(data);
      dispatch(setblogCategory(data));
    };
    getitems();
  }, []);
  return (
    <>
      <div className="p-5">
        <ToastContainer />
        <h3 style={{ color: "#fe831e" }}>Add Blog Category</h3>
        <form action="">
          <CustomInput
            label="Blog Category Name"
            name="title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            type="text"
          />
          <button
            onClick={productBrand}
            className="blogbtn p-2 mt-3 rounded-3 bg-success text-white fw-bold"
          >
            Add Blog Category
          </button>
        </form>
      </div>
      <div className="my-5 p-2">
        <h3 className="p-3">Blogs Categories List</h3>
        <div>
          {" "}
          <Table columns={columns} dataSource={category} />
        </div>
      </div>
    </>
  );
};

export default AddBlogCategory;
