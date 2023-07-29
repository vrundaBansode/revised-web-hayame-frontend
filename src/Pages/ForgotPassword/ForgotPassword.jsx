import React from 'react'
import "./forgotPassword.css"
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from '../../components/LandingPage/components';


const ForgotPassword = () => {

    let navigate = useNavigate();

    const handleForgetPassword = (e) => {

        fetch("http://45.127.4.151:8000/api/forgot-password", {
            method: "POST",
            body: JSON.stringify({
                "email": document.getElementById("forgot-password-username").value,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((json) => {
                alert(json["response"])
            })
    }


    return (
        <div>
            <Navbar />
            <div className="forgot-password-main" id="forgot-password-main">
                <div className="forgot-password-container">
                    <section className="forgot-password-wrapper">
                        <div className="forgot-password-heading">
                            <h1 className="text text-large">Forgot Password</h1>
                        </div>
                        <div name="forgot-password" className="forgot-password-form">
                            <div className="forgot-password-input-control">
                                <label htmlFor="forgot-password-username" className="forgot-password-input-label" hidden>Registered Email Address</label>
                                <input type="email" name="forgot-password-username" id="forgot-password-username" className="forgot-password-input-field" placeholder="Email Address" />
                            </div>

                            <div>
                                <button name="forgot-password" className="forgot-password-input-submit" style={{ "width": "150px" }} id='forgot-password-btn' onClick={handleForgetPassword}>Reset Password</button>
                            </div>

                        </div>
                    </section>
                </div>
            </div>
            <ToastContainer
                position='top-center'
                autoClose={5000}
                toastStyle={{ backgroundColor: "#212527", color: "white", borderRadius: "1rem", fontFamily: "Poppins" }}
            />
        </div>
    )

}
export default ForgotPassword