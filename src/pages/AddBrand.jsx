import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { addBrand, deleteBrand, getBrand } from "../Http_service/Httpservice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setBrand } from "../Store/Slices/BrandSlice";
import { Table } from "antd";

const alertcss = {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
};
const AddBrand = () => {
  const [title, settitle] = useState("");
  const [data1, setdata1] = useState([]);

  const dispatch = useDispatch();

  const columns = [
    {
      title: "No.",
      dataIndex: "key",
    },
    {
      title: "Brand",
      dataIndex: "title",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const productBrand = async (e) => {
    e.preventDefault();
    const { data } = await addBrand({ title });
    if (data.value) {
      toast.success(data.message, alertcss);
      settitle("");
    } else {
      toast.error(data.message, alertcss);
    }
  };

  const deleteitem = async (id) => {
    const { data } = await deleteBrand(id);
    if (data.value) {
      toast.success(data.message, alertcss);
      settitle("");
    } else {
      toast.error(data.message, alertcss);
    }
  };
  const brand = [];
  for (let i = 0; i < data1.length; i++) {
    brand.push({
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
      const { data } = await getBrand();
      setdata1(data);
      dispatch(setBrand(data));
    };
    getitems();
  }, []);
  return (
    <>
      <div className="p-5">
        <ToastContainer />
        <h3 style={{ color: "#fe831e" }}>Add Brand</h3>
        <form>
          <CustomInput
            label="Brand Name"
            name="title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            type="text"
          />
          <button
            onClick={productBrand}
            className="blogbtn p-2 mt-3 rounded-3 bg-success text-white fw-bold"
          >
            Add Brand
          </button>
        </form>
      </div>
      <div className="my-5 p-2">
        <h3 className="p-3">Brand List</h3>
        <div>
          {" "}
          <Table columns={columns} dataSource={brand} />
        </div>
      </div>
    </>
  );
};

export default AddBrand;
