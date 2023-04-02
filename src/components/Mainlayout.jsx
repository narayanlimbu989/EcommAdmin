import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { MdDashboard, MdManageAccounts } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiFillProfile, AiOutlineBgColors } from "react-icons/ai";
import { TbDiscount2 } from "react-icons/tb";
import { BsCartCheckFill } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { FaBloggerB } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { HiTemplate } from "react-icons/hi";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../Store/Slices/AuthSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { logout } from "../Http_service/Httpservice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const { Header, Sider, Content } = Layout;

const Mainlayout = () => {
  const { user, islogin } = useSelector((state) => state.Auth);
  const [collapsed, setCollapsed] = useState(false);
  const link = useNavigate();
  const dispatch = useDispatch();

  const authenticated = () => {
    if (islogin) {
      confirmAlert({
        title: "Logout",
        message: "Are you sure you want to logout?.",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              const { data } = await logout();
              dispatch(setAuth(data));
            },
          },
          {
            label: "No",
          },
        ],
      });
    }
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo d-flex align-items-center justify-content-center">
          <h4 className="text-white text-center mb-0">Admin</h4>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              link(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <MdDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "catalog",
              icon: <AiFillProfile className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <IoMdAddCircleOutline className="fs-4" />,
                  label: " Add Product",
                },
                {
                  key: "product-list",
                  icon: <HiTemplate className="fs-4" />,
                  label: "Product List",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand",
                },
                {
                  key: "categories",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "category",
                },

                {
                  key: "color",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Color",
                },
              ],
            },
            {
              key: "orders",
              icon: <BsCartCheckFill className="fs-4" />,
              label: "Orders",
            },
            {
              key: "blogs",
              icon: <FaBloggerB className="fs-4" />,
              label: "Blogs",
              children: [
                {
                  key: "blog",
                  icon: <FaBloggerB className="fs-4" />,
                  label: " Add blog",
                },
                {
                  key: "blog-list",
                  icon: <FaBloggerB className="fs-4" />,
                  label: "Blog List",
                },
                {
                  key: "blog-categories",
                  icon: <FaBloggerB className="fs-4" />,
                  label: "Add Blog category",
                },
              ],
            },
            {
              key: "addcupon",
              icon: <TbDiscount2 className="fs-4" />,
              label: "Discount cupons",
            },
            {
              key: "updatepassword",
              icon: <MdManageAccounts className="fs-4" />,
              label: "Change password",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 0,
            background: "black",
            color: "white",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}

          <div className="me-5 d-flex align-items-center gap-1">
            <div className="dropdown">
              <AccountCircleIcon className="fs-1" />
              <p onClick={authenticated} className="mb-0 dropdown-content fs-6">
                logout
              </p>
            </div>
            <div className="d-flex flex-column justify-content-center">
              <h5 className="mb-0 fs-6">{user.username}</h5>
              <h6 className="mb-0 fs-6">{user.email}</h6>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#cccccc69",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Mainlayout;
