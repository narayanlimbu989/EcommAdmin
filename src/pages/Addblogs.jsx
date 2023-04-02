import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import Dropzone from "react-dropzone";
import { addBlogs, getBlogCategory } from "../Http_service/Httpservice";
import { uploadImage } from "../Http_service/Httpservice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { setblogImages } from "../Store/Slices/blogimageSlice";

const alertcss = {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
};
const Addblogs = () => {
  const [data1, setdata1] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [imgloading, setimgloading] = useState(false);

  const [data, setdata] = useState({
    blogimage: null,
    title: "",
    category: "",
    description: "",
  });
  const dispatch = useDispatch();
  const { blogimages } = useSelector((state) => state.blogimage);
  const img = [];
  blogimages?.forEach((i) => {
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
    data.blogimage = img;
    if (!data.title || !data.description || !data.blogimage || !data.category)
      return toast.error("please fill all Data", alertcss);
    const res = await addBlogs(data);
    if (res.data) {
      toast.success(res.data.message, alertcss);
      data.description = "";
      data.title = "";
      data.category = "";

      dispatch(setblogImages(null));
      setisloading(false);
    }
  };
  useEffect(() => {
    const getitems = async () => {
      const { data } = await getBlogCategory();
      setdata1(data);
    };
    getitems();
  }, []);

  const acceptedFiles = async (files) => {
    setimgloading(true);
    const formData = new FormData();
    files.map((file) => {
      formData.append("images", file);
    });
    try {
      const { data } = await uploadImage(formData);
      dispatch(setblogImages(data));
    } catch (error) {
      console.log(error);
    } finally {
      setimgloading(false);
    }
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <h3 className="mb-4" style={{ color: "#fe831e" }}>
        Add Blogs
      </h3>
      <div>
        <form className="d-flex flex-column gap-2">
          <div className="py-5 bg-white">
            <Dropzone onDrop={acceptedFiles}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          {imgloading ? (
            <p>loading...</p>
          ) : (
            <div className="imgsec p-3 d-flex gap-3 flex-wrap">
              {blogimages &&
                blogimages.map((image, i) => {
                  return (
                    <img key={i} src={image.url} alt="images" width="200px" />
                  );
                })}
            </div>
          )}

          <CustomInput
            type="text"
            label="Enter Blog Title"
            name="title"
            value={data.title}
            onChange={collectdata}
          />
          <select
            className="form-control form-select"
            value={data.category}
            onChange={collectdata}
            name="category"
          >
            <option value="" className="text-danger">
              --Please choose product category--
            </option>
            {data1.map((item, i) => {
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
            name="description"
            rows="10"
            value={data.description}
            onChange={collectdata}
          ></textarea>
          {isloading ? (
            <button
              type="submit"
              style={{ cursor: "not-allowed" }}
              className="blogbtn p-2 mt-3 rounded-3 bg-success text-white fw-bold"
            >
              loading...
            </button>
          ) : (
            <button
              type="submit"
              onClick={postdata}
              className="blogbtn p-2 mt-3 rounded-3 bg-success text-white fw-bold"
            >
              Add Blog
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Addblogs;
