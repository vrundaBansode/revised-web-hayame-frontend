import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleSandwich = () => {
    document.getElementById("navbar-pages").classList.toggle("sandwich-toggle");
  };

  return (
    <div className="navbar-content">
      <div>
        {/* <img src={logo} alt='logo' className='logo' /> */}
        <h3 className="navbar-logo">
          <strong>Hayame</strong>
        </h3>
      </div>
      <div>
        <div
          style={{ color: "#212427" }}
          className="navbar-sandwich"
          onClick={handleSandwich}
        >
          ☰
        </div>
        <ul className="navbar-pages" id="navbar-pages">
          <li>
            <Link to="/" className="pages-links">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about-us" className="pages-links">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/login" className="pages-links">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
