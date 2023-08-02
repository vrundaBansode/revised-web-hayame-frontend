import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleSandwich = () => {
    if (document.getElementById("navbar-links").style.display == "none") {
      document.getElementById("navbar-links").style.display = "block";
    } else {
      document.getElementById("navbar-links").style.display = "none";
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <h3 className="navbar-logo">Hayame</h3>

        <div className="navbar-sandwich" onClick={handleSandwich}>
          ☰
        </div>
      </div>

      <ul className="navbar-links" id="navbar-links">
        <li>
          <Link
            style={{ color: "#17262B", textDecoration: "underline" }}
            to="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            style={{ color: "#17262B", textDecoration: "underline" }}
            to="/about-us"
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            style={{ color: "#17262B", textDecoration: "underline" }}
            to="/login"
          >
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
