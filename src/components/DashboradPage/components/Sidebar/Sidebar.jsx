import React, { useState } from "react";
import "./sidebar.css";
import { Menu, Layout, Image } from "antd";
// import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom";
import { logo, leftarrow } from "../../../../assets";
import LandingPage from "../../../LandingPage/LandingPage";
import About from "../../../../Pages/About/About";

const Sidebar = ({ userRole }) => {
  // const location = useLocation()
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(true);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div className="Sidebar">
      {showMenu ? (
        <Layout.Sider>
          <div className="sidebar-menu">
            <div className="sider">
              <div className="sider-logo">
                <img src={logo} />
              </div>
              <div className="sider-arrow">
                <img src={leftarrow} onClick={toggleMenu} />
              </div>
            </div>
            {userRole === '"Contractor"' ? (
              <Menu
                className="sidebar-antd-menu"
                theme="dark"
                mode="inline"
                onClick={(item) => {
                  navigate(item.key);
                }}
                items={[
                  {
                    label: "Home",
                    key: "/",
                    // icon: <AppstoreOutlined />,
                    // style: { margin: "1.5rem 0.5rem 1.5rem 0",
                    //         width: "max-content",
                    //       },
                    className: "sidebar-menu-item",
                  },
                  {
                    label: "Dashboard",
                    key: "./",
                    // icon: <AppstoreOutlined />,
                    // style: { margin: "1.5rem 0.5rem 1.5rem 0",
                    //         width: "max-content",
                    //       },
                    className: "sidebar-menu-item",
                  },
                  {
                    label: "My Account",
                    key: "./inventory",
                    // icon: <ShopOutlined />,
                    // style: {margin: "1.5rem 0.5rem 1.5rem 0",
                    //         cursor:"pointer"
                    //       },
                    children: [
                      {
                        label: "Profile",
                        key: "./profile",
                        // icon: <ShopOutlined />
                      },
                      {
                        label: "Logout",
                        key: "/logout",
                        // icon: <ShopOutlined />
                      },
                    ],
                    className: "sidebar-menu-item",
                  },
                  {
                    label: "Bookings",
                    key: "./customers",
                    // icon: <UserOutlined />,
                    // style: {margin: "1.5rem 0.5rem 1.5rem 0",
                    //         width: "max-content",
                    //       },
                    className: "sidebar-menu-item",
                  },
                  {
                    label: "About Us",
                    key: "/about-us",
                    // icon: <AppstoreOutlined />,
                    // style: { margin: "1.5rem 0.5rem 1.5rem 0",
                    //         width: "max-content",
                    //       },
                    className: "sidebar-menu-item",
                  },
                ]}
              ></Menu>
            ) : (
              <Menu
                className="sidebar-antd-menu"
                theme="dark"
                mode="inline"
                onClick={(item) => {
                  navigate(item.key);
                }}
                // className="sidebar-menu"

                items={[
                  {
                    label: "Home",
                    key: "/",
                    // icon: <AppstoreOutlined />,
                    // style: { margin: "1.5rem 0.5rem 1.5rem 0",
                    //         width: "max-content",
                    //       },
                    className: "sidebar-menu-item",
                  },
                  {
                    label: "Add Workforce",
                    key: "./",
                    // icon: <AppstoreOutlined />,
                    // style: { margin: "1.5rem 0.5rem 1.5rem 0",
                    //         width: "max-content",
                    //       },
                    className: "sidebar-menu-item",
                  },
                  {
                    label: "My Account",
                    key: "./inventory",
                    // icon: <ShopOutlined />,
                    // style: {margin: "1.5rem 0.5rem 1.5rem 0",
                    //         cursor:"pointer"
                    //       },
                    children: [
                      {
                        label: "Profile",
                        key: "./profile",
                        // icon: <ShopOutlined />
                      },
                      // {
                      //   label: "T&C",
                      //   key: "./terms",
                      //   // icon: <ShopOutlined />
                      // },
                      // {
                      //   label: "Help",
                      //   key: "./help",
                      //   // icon: <ShopOutlined />
                      // },
                      {
                        label: "Logout",
                        key: "/logout",
                        // icon: <ShopOutlined />
                      },
                    ],
                    className: "sidebar-menu-item",
                  },
                  {
                    label: "Chech Bookings",
                    key: "./check-bookings",
                    // icon: <UserOutlined />,
                    // style: {margin: "1.5rem 0.5rem 1.5rem 0",
                    //         width: "max-content",
                    //       },
                    className: "sidebar-menu-item",
                  },
                  {
                    label: "Workforce List",
                    key: "./workforce-list",
                    // icon: <UserOutlined />,
                    // style: {margin: "1.5rem 0.5rem 1.5rem 0",
                    //         width: "max-content",
                    //       },
                    className: "sidebar-menu-item",
                  },
                  {
                    label: "About Us",
                    key: "/about-us",
                    // icon: <AppstoreOutlined />,
                    // style: { margin: "1.5rem 0.5rem 1.5rem 0",
                    //         width: "max-content",
                    //       },
                    className: "sidebar-menu-item",
                  },
                ]}
              ></Menu>
            )}
          </div>
        </Layout.Sider>
      ) : (
        <div className="closedSidebar">
          {/* <Layout.Sider style={{ backgroundColor: "#212427", height: "100vh", maxWidth: "min-content" }}> */}

          <div
            className="closedSidebarArrow"
            style={{ border: "solid 3.5px #17262B" }}
          >
            <img
              src={leftarrow}
              style={{ transform: "rotate(180deg)" }}
              onClick={toggleMenu}
            />
          </div>
          {/* </Layout.Sider> */}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
