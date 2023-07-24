import React from 'react'
import "./hero.css"
import { Routes, Route } from "react-router-dom"
import { Dashboard, Customers, Profile, AdminDashboard, AdminWorkforceList, AdminBookings, AllocateLabours } from '../../Pages'
import DashboardForm from '../../Pages/Dashboard/DashboardForm'
import UpdateLabourDetails from '../../Pages/UpdatelabourDetails/UpdateLabourDetails'

const Hero = ({ userRole }) => {



  return (
    <div className='DashboardHero'>
      { userRole==='"Contractor"' ? (<Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/dashboardform" element={<DashboardForm />} />
      </Routes>) : (<Routes>
        <Route path='/' element={<AdminDashboard />} />
        <Route path='/workforce-list' element={<AdminWorkforceList />} />
        <Route path='/check-bookings' element={<AdminBookings />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/update-labour-details' element={<UpdateLabourDetails />} />
        <Route path='/allocate-labours' element={<AllocateLabours />} />
      </Routes>)}
    </div>
  )
}

export default Hero