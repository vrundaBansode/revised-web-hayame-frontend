import React from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
// import Login from '../Login/Login'
import { Navbar } from "../../components/LandingPage/components";

const Register = () => {
  const navigate = useNavigate();

  let user = {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
    phone: "",
    skills: "Contractor",
    user_role: "Contractor",
  };

  const validateForm = () => {
    // Check if the Email is an Empty string or not.
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let msg = "";

    if (email.length === 0) {
      msg = "Invalid Form, Email Address can not be empty";
      return msg;
    }

    // check if the password follows constraints or not.

    // if password length is less than 8 characters, alert invalid form.

    if (password.length < 8) {
      msg =
        "Invalid Form, Password must contain greater than or equal to 8 characters.";
      return msg;
    }

    // variable to count upper case characters in the password.
    let countUpperCase = 0;
    // variable to count lowercase characters in the password.
    let countLowerCase = 0;
    // variable to count digit characters in the password.
    let countDigit = 0;
    // variable to count special characters in the password.
    let countSpecialCharacters = 0;

    for (let i = 0; i < password.length; i++) {
      const specialChars = [
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
        "_",
        "-",
        "+",
        "=",
        "[",
        "{",
        "]",
        "}",
        ":",
        ";",
        "<",
        ">",
      ];

      if (specialChars.includes(password[i])) {
        // this means that the character is special, so increment countSpecialCharacters
        countSpecialCharacters++;
      } else if (!isNaN(password[i] * 1)) {
        // this means that the character is a digit, so increment countDigit
        countDigit++;
      } else {
        if (password[i] == password[i].toUpperCase()) {
          // this means that the character is an upper case character, so increment countUpperCase
          countUpperCase++;
        }
        if (password[i] == password[i].toLowerCase()) {
          // this means that the character is lowercase, so increment countUpperCase
          countLowerCase++;
        }
      }
    }

    if (countLowerCase == 0) {
      // invalid form, 0 lowercase characters
      msg = "Invalid Form, 0 lower case characters in password";
      return msg;
    }

    if (countUpperCase == 0) {
      // invalid form, 0 upper case characters
      msg = "Invalid Form, 0 upper case characters in password";
      return msg;
    }

    if (countDigit == 0) {
      // invalid form, 0 digit characters
      msg = "Invalid Form, 0 digit characters in password";
      return msg;
    }

    if (countSpecialCharacters == 0) {
      // invalid form, 0 special characters characters
      msg = "Invalid Form, 0 special characters in password";
      return msg;
    }

    return msg;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    document.getElementById("register-btn").disable = true;

    user = {
      username: document.getElementById("email").value,
      first_name: document.getElementById("firstName").value,
      last_name: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      password2: document.getElementById("cpassword").value,
      phone: document.getElementById("phone_number").value,
    };

    // console.log(user);

    let msg = validateForm();

    if (msg == "") {
      fetch("http://45.127.4.151:8000/api/register", {
        method: "POST",
        body: JSON.stringify({
          username: document.getElementById("email").value,
          first_name: document.getElementById("firstName").value,
          last_name: document.getElementById("lastName").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
          password2: document.getElementById("cpassword").value,
          phone: document.getElementById("phone_number").value,
          user_role: "Contractor",
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.response === undefined) {
            //unsuccessful registration
          } else {
            // setSuccessfulSignUp(true)
            // window.location.href="/login"
            console.log(json.response);
            navigate("/login");
          }
        });
    } else {
      alert(msg);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="register-main">
        <div className="register-container">
          <section className="register-wrapper">
            <div className="register-heading">
              <h1 className="register-header-text">Sign Up</h1>
            </div>
            <form name="signin" className="register-form">
              {/* <div className="register-username"> */}
              <div className="register-input-control">
                <label htmlFor="firstName" className="register-input-label">
                  First Name
                </label>
                <input
                  required
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="register-input-field firstName"
                  placeholder="First Name"
                />
              </div>
              <div className="register-input-control">
                <label htmlFor="lastName" className="register-input-label">
                  Last Name
                </label>
                <input
                  required
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="register-input-field lastName"
                  placeholder="Last Name"
                />
              </div>
              {/* </div> */}
              <div className="register-input-control">
                <label htmlFor="email" className="register-input-label">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  className="register-input-field"
                  placeholder="Email Address"
                />
              </div>
              <div className="register-input-control">
                <label htmlFor="number" className="register-input-label">
                  Phone Number
                </label>
                <input
                  required
                  type="tel"
                  name="number"
                  id="phone_number"
                  className="register-input-field"
                  placeholder="Enter your Phone Number"
                />
              </div>
              <div className="register-input-control">
                <label htmlFor="password" className="register-input-label">
                  Password
                </label>
                <input
                  required
                  type="password"
                  name="password"
                  id="password"
                  className="register-input-field"
                  placeholder="Password"
                />
              </div>
              <div className="register-input-control">
                <label htmlFor="cpassword" className="register-input-label">
                  Confirm Password
                </label>
                <input
                  required
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  className="register-input-field"
                />
              </div>
              <div className="register-input-control">
                {/* <input type="submit" name="submit" className="input-submit" value={<Link to="/login" >Submit</Link>} onClick={handleRegister}/> */}
                <button
                  type="submit"
                  name="submit"
                  className="register-input-submit"
                  id="register-btn"
                  onClick={handleRegister}
                >
                  <p
                    style={{
                      color: "#fff8d1",
                      textDecoration: "none",
                      margin: 0,
                    }}
                  >
                    Register
                  </p>
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Register;
