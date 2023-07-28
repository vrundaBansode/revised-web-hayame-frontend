import React from 'react'
import "./resetPassword.css"
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from '../../components/LandingPage/components';


const ResetPassword = () => {

    const navigate = useNavigate();

    const handleResetPassword = (e) => {
        let paramString = (window.location.search).split('?')[1];
        let queryString = new URLSearchParams(paramString);
        let token = ""
        for (let pair of queryString.entries()) {
            token = pair[1]
        }

        let api = "http://45.127.4.151:8000/api/reset-password/" + token;
        fetch(api, {
            method: "POST",
            body: JSON.stringify({
                "password": document.getElementById("reset-password-password").value,
                "confirm_password": document.getElementById("reset-password-confirm-password").value,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((json) => {
                alert(json["response"])
                navigate('./login');
            })
    }


    return (
        <div>
            <Navbar />
            <div className="reset-password-main" id="reset-password-main">
                <div className="reset-password-container">
                    <section className="reset-password-wrapper">
                        <div className="reset-password-heading">
                            <h1 className="text text-large">Reset Password</h1>
                        </div>
                        <form name="reset-password" className="reset-password-form">
                            <div className="reset-password-input-control">
                                <label htmlFor="reset-password-password" className="reset-password-input-label" hidden>New Password</label>
                                <input type="password" name="reset-password-password" id="reset-password-password" className="reset-password-input-field" placeholder="New Password" />
                            </div>
                            <div className="reset-password-input-control">
                                <label htmlFor="reset-password-confirm-password" className="reset-password-input-label" hidden>Confirm Password</label>
                                <input type="password" name="reset-password-confirm-password" id="reset-password-confirm-password" className="reset-password-input-field" placeholder="Confirm Password" />
                            </div>

                            <div>
                                <button type="submit" name="reset-password" className="reset-password-input-submit" style={{ "width": "150px" }} id='reset-password-btn' onClick={handleResetPassword}>Reset Password</button>
                            </div>
                        </form>
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
export default ResetPassword