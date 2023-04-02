import React, { useState, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import {
  addCategory,
  deleteCategory,
  getCategory,
} from "../Http_service/Httpservice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table } from "antd";
import { useDispatch } from "react-redux";
import { setCategory } from "../Store/Slices/CategoriesSlice";

const alertcss = {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
};
const AddCategory = () => {
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
    const { data } = await addCategory({ title });
    if (data.value) {
      toast.success(data.message, alertcss);
      settitle("");
    } else {
      toast.error(data.message, alertcss);
    }
  };

  const deleteitem = async (id) => {
    const { data } = await deleteCategory(id);
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
          onClick={() => deleteitem(data1[i]._id)}
          style={{ cursor: "pointer" }}
        >
          Delete
        </p>
      ),
    });
  }
  useEffect(() => {
    const getitems = async () => {
      const { data } = await getCategory();
      setdata1(data);
      dispatch(setCategory(data));
    };
    getitems();
  }, []);
  return (
    <>
      <div className="p-5">
        <ToastContainer />
        <h3 style={{ color: "#fe831e" }}>Add Category</h3>
        <form action="">
          <CustomInput
            label="Category Name"
            name="title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            type="text"
          />
          <button
            onClick={productBrand}
            className="blogbtn p-2 mt-3 rounded-3 bg-success text-white fw-bold"
          >
            Add Category
          </button>
        </form>
      </div>
      <div className="my-5 p-2">
        <h3 className="p-3">Categories List</h3>
        <div>
          {" "}
          <Table columns={columns} dataSource={category} />
        </div>
      </div>
    </>
  );
};

export default AddCategory;
