import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import Dropzone from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addProduct,
  getBrand,
  getCategory,
  getColor,
  uploadImage,
} from "../Http_service/Httpservice";
import { setImages } from "../Store/Slices/imageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const alertcss = {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
};
const Addproduct = () => {
  const [isloading, setisloading] = useState(false);
  const [imgloading, setimgloading] = useState(false);
  const [color, setcolor] = useState([]);
  const [brand, setbrand] = useState([]);
  const [category, setcategory] = useState([]);

  const dispatch = useDispatch();
  const link = useNavigate();
  const { images } = useSelector((state) => state.image);
  const [data, setdata] = useState({
    productimage: null,
    title: "",
    price: "",
    quantity: "",
    category: "",
    brand: "",
    color: "",
    description: "",
  });
  const img = [];
  images?.map((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  const collectdata = (e) => {
    setdata((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };
  const postdata = async (e) => {
    e.preventDefault();
    setisloading(true);
    data.productimage = img;
    if (
      !data.title ||
      !data.price ||
      !data.description ||
      !data.productimage ||
      !data.quantity ||
      !data.category ||
      !data.brand ||
      !data.color
    )
      return toast.error("please fill all Data", alertcss);

    try {
      const res = await addProduct(data);
      if (res.data) {
        toast.success(res.data.message, alertcss);
        link("/admin/product-list");
        dispatch(setImages(null));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisloading(false);
    }
  };

  useEffect(() => {
    const colorlist = async () => {
      const { data } = await getColor();
      setcolor(data);
    };
    const brandlist = async () => {
      const { data } = await getBrand();
      setbrand(data);
    };
    const categorylist = async () => {
      const { data } = await getCategory();
      setcategory(data);
    };
    colorlist();
    brandlist();
    categorylist();
  }, []);

  const acceptedFiles = async (data1) => {
    setimgloading(true);
    const formData = new FormData();
    data1.map((file) => {
      formData.append("images", file);
    });
    try {
      const { data } = await uploadImage(formData);
      dispatch(setImages(data));
    } catch (error) {
      toast.error(error, alertcss);
    } finally {
      setimgloading(false);
    }
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <h3 className="mb-4" style={{ color: "#fe831e" }}>
        Add product
      </h3>
      <div>
        <div className="py-5 bg-white">
          <Dropzone onDrop={acceptedFiles}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        {imgloading ? (
          <p>loading...</p>
        ) : (
          <div className="imgsec p-3 d-flex gap-3 flex-wrap">
            {images &&
              images.map((image, i) => {
                return (
                  <img key={i} src={image.url} alt="images" width="200px" />
                );
              })}
          </div>
        )}
        <form className="d-flex flex-column gap-2">
          <CustomInput
            type="text"
            name="title"
            max="30"
            value={data.title}
            onChange={collectdata}
            label="product Title"
          />
          <CustomInput
            type="Number"
            name="price"
            value={data.price}
            onChange={collectdata}
            label="Price"
          />
          <CustomInput
            type="Number"
            name="quantity"
            value={data.quantity}
            onChange={collectdata}
            label="Qty"
          />

          <select
            className="form-control form-select"
            value={data.brand}
            onChange={collectdata}
            name="brand"
          >
            <option value="" className="text-danger">
              --Please choose product Brand--
            </option>

            {brand.map((item, i) => {
              return (
                <option key={i} value={item.title}>
                  {item.title}
                </option>
              );
            })}
          </select>
          <select
            className="form-control form-select"
            value={data.category}
            onChange={collectdata}
            name="category"
          >
            <option value="" className="text-danger">
              --Please choose product category--
            </option>
            {category.map((item, i) => {
              return (
                <option key={i} value={item.title}>
                  {item.title}
                </option>
              );
            })}
          </select>

          <select
            className="form-control form-select"
            value={data.color}
            onChange={collectdata}
            name="color"
          >
            <option value="" className="text-danger">
              --Please choose product color--
            </option>

            {color.map((item, i) => {
              return (
                <option key={i} value={item.title}>
                  {item.title}
                </option>
              );
            })}
          </select>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            placeholder="Description"
            value={data.description}
            onChange={collectdata}
            name="description"
            rows="10"
          ></textarea>
          {isloading ? (
            <button
              style={{ cursor: "not-allowed" }}
              className="blogbtn p-2 mt-3 rounded-3 bg-success text-white fw-bold"
            >
              loading
            </button>
          ) : (
            <button
              type="submit"
              onClick={postdata}
              className="blogbtn p-2 mt-3 rounded-3 bg-success text-white fw-bold"
            >
              Add product
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
