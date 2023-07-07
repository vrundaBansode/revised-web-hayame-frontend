import React from 'react'
import "./NavbarDashboard.css"
import { Link } from 'react-router-dom'

const NavbarDashboard = () => {

  const handleSandwich = () => {
    document.getElementById("navbar-dashboard-pages").classList.toggle("sandwich-toggle")
  }


  return (
    <div className='navbar-dashboard-content'>
        <div>
          {/* <img src={logo} alt='logo' className='logo' /> */}
          <strong  className='navbar-dashboard-logo' >Hayame</strong>
        </div>
        <div>
            <div style={{ color: "#212427" }} className='navbar-dashboard-sandwich' onClick={handleSandwich} >☰</div>
            <ul className='navbar-dashboard-pages' id='navbar-dashboard-pages' >
                <li><Link to="/" className='pages-links'>Home</Link></li>
                <li><Link to="/about-us" className='pages-links'>About Us</Link></li>
                <li><Link to="/login" className='pages-links'>Login</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default NavbarDashboard
