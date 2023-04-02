import React, { useState, useEffect } from "react";
import { deleteBlogs, getBlogs } from "../Http_service/Httpservice";
import { Table } from "antd";
import { ToastContainer, toast } from "react-toastify";

const alertcss = {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
};
const bloglist = () => {
  const [data1, setdata1] = useState([]);
  const columns = [
    {
      title: "No.",
      dataIndex: "key",
    },
    {
      title: "Blog Name",
      dataIndex: "image",
    },
    {
      title: "Blog Name",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "category",
      dataIndex: "category",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const deletepage = async (id) => {
    console.log(id);
    const { data } = await deleteBlogs(id);
    if (data) {
      toast.success(data.message, alertcss);
    }
  };
  const category = [];
  for (let i = 0; i < data1.length; i++) {
    category.push({
      key: i + 1,
      image: <img src={data1[i].blogimage[0].url} alt="image" />,
      title: data1[i].title,
      description: data1[i].description,
      brand: data1[i].brand,
      category: data1[i].category,
      price: `$ ${data1[i].price}`,
      color: data1[i].color,
      quantity: data1[i].quantity,
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
      const { data } = await getBlogs();
      setdata1(data);
    };
    getitems();
  }, []);
  return (
    <div className="my-5 p-2">
      <ToastContainer />
      <h3 className="p-3">Blogs List</h3>
      <div>
        {" "}
        <Table columns={columns} dataSource={category} />
      </div>
    </div>
  );
};

export default bloglist;
