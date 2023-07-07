import React from 'react'
import { Navbar, Hero, MainContent, Footer } from "./components"
import "./landingpage.css"


const LandingPage = () => {
  return (
    <div className='landingPage'>
        <Navbar />
        <Hero />
        <MainContent />
        <Footer />
    </div>
  )
}

export default LandingPage