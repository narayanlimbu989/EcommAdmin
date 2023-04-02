import React, { useState, useEffect } from "react";
import {
  addcupontoproduct,
  deleteProduct,
  getdiscountcupon,
  getProducts,
  removecuponfromproduct,
} from "../Http_service/Httpservice";
import { Table } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { AiFillDelete, AiFillCloseCircle } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { GrUpdate } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { setCupon } from "../Store/Slices/cuponSlice";

const alertcss = {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
};

const productlist = () => {
  const dispatch = useDispatch();
  const [data1, setdata1] = useState([]);
  const [discount, setdiscount] = useState("");
  const [productid, setproductid] = useState("");

  const [choose, setchoose] = useState(false);

  const addcupon = async (e) => {
    e.preventDefault();
    if (!discount) return toast.error("please choose value", alertcss);
    const { data } = await addcupontoproduct({ productid, discount });
    if (data) {
      toast.success("cupon added", alertcss);
      setchoose(!choose);
      setdiscount("");
      setproductid("");
    }
  };
  const getproductid = (id) => {
    setchoose(!choose);
    setproductid(id);
  };
  const closecupon = () => {
    setproductid("");
    setchoose(!choose);
  };
  const removecupon = async (id) => {
    const { data } = await removecuponfromproduct({
      productid: id,
      discount: "",
    });
    console.log(data);
    if (data) {
      toast.success("cupon remove", alertcss);
    }
  };
  useEffect(() => {
    (async () => {
      const { data } = await getdiscountcupon();
      dispatch(setCupon(data));
    })();
    const getitems = async () => {
      const { data } = await getProducts();
      setdata1(data);
    };
    getitems();
  }, []);

  const { cupon } = useSelector((state) => state.cuponlist);
  const columns = [
    {
      title: "No.",
      dataIndex: "key",
    },
    {
      title: "product image",
      dataIndex: "image",
    },
    {
      title: "product Name",
      dataIndex: "title",
    },
    {
      title: "cupons",
      dataIndex: "cupon",
    },
    {
      title: "Add/Delete/change cupons",
      dataIndex: "updatacupon",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "category",
      dataIndex: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Color",
      dataIndex: "color",
    },
    {
      title: "Qty",
      dataIndex: "quantity",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const deleteproduct = async (id) => {
    const { data } = await deleteProduct(id);
    if (data) {
      toast.success(data.message, alertcss);
    }
  };
  const category = [];
  for (let i = 0; i < data1.length; i++) {
    category.push({
      key: i + 1,
      title: data1[i].title,
      image: (
        <img src={data1[i].productimage[1].url} width="200px" alt="image" />
      ),
      cupon: (
        <p>
          {data1[i].discount ? data1[i].discount?.discountname : "No copon"}
        </p>
      ),
      updatacupon: (
        <>
          <div className="d-flex alihn-items-center gap-3">
            <p className="mb-0">
              {data1[i].discount ? (
                <GrUpdate
                  onClick={() => getproductid(data1[i]._id)}
                  style={{ cursor: "pointer" }}
                  className="fs-4"
                />
              ) : (
                <FiEdit
                  onClick={() => getproductid(data1[i]._id)}
                  style={{ cursor: "pointer" }}
                  className="fs-4"
                />
              )}
            </p>
            <p className="mb-0">
              {data1[i].discount ? (
                <AiFillDelete
                  style={{ cursor: "pointer" }}
                  onClick={() => removecupon(data1[i]._id)}
                  className="fs-4"
                />
              ) : (
                ""
              )}
            </p>
          </div>
        </>
      ),
      brand: data1[i].brand,
      category: data1[i].category,
      price: `$ ${data1[i].price}`,
      color: data1[i].color,
      quantity: data1[i].quantity,
      action: (
        <p
          className="mb-0"
          onClick={() => deleteproduct(data1[i]._id)}
          style={{ cursor: "pointer" }}
        >
          <AiFillDelete className="fs-4" />
        </p>
      ),
    });
  }

  return (
    <div className="my-5 p-2">
      <ToastContainer />
      {choose && (
        <form className="editcupon">
          <div className="d-flex align-items-center justify-content-between">
            <h3>Choose Cupon</h3>
            <AiFillCloseCircle className="fs-5" onClick={closecupon} />
          </div>
          <select
            className="form-control form-select"
            name="cupon"
            value={discount}
            onChange={(e) => setdiscount(e.target.value)}
          >
            <option value="" className="text-danger">
              --Please choose to add cupon--
            </option>
            {cupon?.map((item, i) => {
              return (
                <option key={i} value={item._id}>
                  {item.discountname}
                </option>
              );
            })}
          </select>
          <button
            onClick={addcupon}
            className="px-4 rounded bg-success text-white"
          >
            save
          </button>
        </form>
      )}
      <h3 className="p-3">Product List</h3>
      <div>
        {" "}
        <Table columns={columns} dataSource={category} />
      </div>
    </div>
  );
};

export default productlist;
