import React from "react";
import "./verifyUser.css";
import { Link, useNavigate } from "react-router-dom";

const VerifyUser = () => {

  const navigate = useNavigate();

  const verifyUserBackend = () => {
    let paramString = (window.location.search).split('?')[1];
    let queryString = new URLSearchParams(paramString);
    let user = ""
    for (let pair of queryString.entries()) {
      user = pair[1]
    }

    let api = "http://45.127.4.151:8000/api/verify-user/" + user;
    console.log(api);

    fetch(api, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      });


  }

  verifyUserBackend();


  return (
    <div className="verify-user-card">
      <h3>You're verified now! 🎉</h3>
      <Link to="/login" className="login-href">
        Login
      </Link>
    </div>
  );
};

export default VerifyUser;
