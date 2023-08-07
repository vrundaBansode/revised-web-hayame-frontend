import React from "react";
import { NavbarDashboard } from "../LandingPage/components";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/Footer";
import { Space } from "antd";
import "./dashboardPage.css";

const DashboardPage = () => {
  // localStorage.setItem("user_role", "admin")
  let user_role = localStorage.getItem("user_role");

  return (
    <div className="DashboardPage">
      <Header />
      <div className="DashboardPageContent">
        <Sidebar userRole={user_role} />
        <Hero userRole={user_role} />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default DashboardPage;
