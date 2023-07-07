import React from 'react'
import { Dashboard, Customers, Inventory, Orders, Profile, TC, Help } from '../../Pages'
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
import { Routes, Route } from "react-router-dom"



const AppRoutes = () => {
  return (
    <div>
      <Routes>
          {/* Add Workforce */}
          <Route path="/dashboard" element={<Dashboard />}></Route>
          {/* //History */}
          <Route path="/customers" element={<Customers />}></Route>
          {/* My Account  */}
          <Route path="/inventory" element={<Inventory />}></Route>
          <Route path="/profile" element={<Profile />} ></Route>
          <Route path="/terms" element={<TC />} ></Route>
          <Route path="/help" element={<Help />} ></Route>
          {/* <Route path="/logout" element={<Logout />} ></Route> */}
          <Route path="/orders" element={<Orders />}></Route>
      </Routes>
    </div>
  )
}

export default AppRoutes