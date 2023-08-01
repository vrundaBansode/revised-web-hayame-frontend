import React from 'react'
import { useNavigate, Link, redirect } from 'react-router-dom'

const Logout = () => {

    let navigate = useNavigate();

    localStorage.clear();
    navigate('/login');
    // redirect('/login');


    return (
        <div>Logging Out....</div>
    )

}
export default Logout