import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import {
  adddiscountcupon,
  deleteCupon,
  getdiscountcupon,
} from "../Http_service/Httpservice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
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
const Addcupons = () => {
  const brand = [];
  const { cupon } = useSelector((state) => state.cuponlist);

  const [cupons, setcupon] = useState({
    discountname: "",
    discountnum: "",
    discountexpiry: "",
  });
  const dispatch = useDispatch();

  for (let i = 0; i < cupon?.length; i++) {
    brand.push({
      key: i + 1,
      title: cupon[i].discountname,
      discount: `${cupon[i].discountnum} %`,
      date: (
        <p>
          {new Date(cupon[i].discountexpiry).getTime() >
          new Date().getTime() ? (
            <span>{cupon[i].discountexpiry}</span>
          ) : (
            <span className="text-danger">Expire</span>
          )}
        </p>
      ),
      action: (
        <p
          className="delete mb-0"
          onClick={() => deleteitem(cupon[i]._id)}
          style={{ cursor: "pointer" }}
        >
          Delete
        </p>
      ),
    });
  }

  const columns = [
    {
      title: "No.",
      dataIndex: "key",
    },
    {
      title: "cupon Name",
      dataIndex: "title",
    },
    {
      title: "cupon Discount",
      dataIndex: "discount",
    },
    {
      title: "cupon ExpireIn",
      dataIndex: "date",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const savecupon = (e) => {
    setcupon((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  const productBrand = async (e) => {
    e.preventDefault();
    if (!cupons.discountname || !cupons.discountnum || !cupons.discountexpiry)
      return toast.error("All field required", alertcss);
    if (cupons.discountnum < 100) {
      if (new Date(cupons.discountexpiry) < new Date()) {
        toast.error(
          "Date should be always greater then current date",
          alertcss
        );
      } else {
        const { data } = await adddiscountcupon(cupons);
        if (data) {
          toast.success(data.message, alertcss);
        }
      }
    } else {
      toast.error("Discount percentage should be less then 100.", alertcss);
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await getdiscountcupon();
      dispatch(setCupon(data));
    })();
  }, []);

  const deleteitem = async (id) => {
    const { data } = await deleteCupon(id);
    if (data) {
      toast.success(data.message, alertcss);
    } else {
      toast.error(data.message, alertcss);
    }
  };

  return (
    <>
      <div className="p-5">
        <ToastContainer />
        <h3 style={{ color: "#fe831e" }}>Add Cupons</h3>
        <form>
          <CustomInput
            label="Cupon Name"
            name="discountname"
            value={cupons.discountname}
            onChange={savecupon}
            type="text"
          />
          <CustomInput
            label="Discount percentage"
            name="discountnum"
            value={cupons.discountnum}
            onChange={savecupon}
            type="Number"
          />
          <CustomInput
            label="Expiry time"
            name="discountexpiry"
            value={cupons.discountexpiry}
            onChange={savecupon}
            type="date"
          />
          <button
            onClick={productBrand}
            className="blogbtn p-2 mt-3 rounded-3 bg-success text-white fw-bold"
          >
            Add cupon
          </button>
        </form>
      </div>
      <div className="my-5 p-2">
        <h3 className="p-3">Cupons List</h3>
        <div>
          {" "}
          <Table columns={columns} dataSource={brand} />
        </div>
      </div>
    </>
  );
};

export default Addcupons;
