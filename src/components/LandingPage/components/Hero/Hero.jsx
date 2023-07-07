import React  from 'react'
import { useNavigate } from "react-router-dom";
import "./hero.css"

const Hero = () => {

  let navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login")
  }

  return (
    <div className='bg-img'>
        {/* <button className='hero-btn' onClick={handleGetStarted} >Get Started</button> */}
        <div className='hero-card-bg'>
            <div className='hero-card'>
                <h1>Get your work done with <span>Flexible Workforce</span></h1>
                <p><strong>Hayame</strong> bridges the gap between individuals or businesses and staff. We help you hire staff whenever and wherever needed.</p>
            </div>
        </div>
    </div>
  )
}

export default Hero