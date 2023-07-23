import React from "react";
import "./verifyUser.css";

const VerifyUser = () => {
  return (
    <div className="verify-user-card">
      <h3>You're verified now! 🎉</h3>
      <a href="./login" className="login-href">
        Login
      </a>
    </div>
  );
};

export default VerifyUser;
