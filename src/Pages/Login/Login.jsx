import React from "react";
import "./login.css";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "../../components/LandingPage/components";

const Login = () => {
  let navigate = useNavigate();

  const loginNotification = (msg) => toast(msg);

  const validateForm = () => {
    // Check if the Email is an Empty string or not.
    let email = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    if (email.length === 0) {
      loginNotification("Invalid Form, Email Address can not be empty");
      return;
    }

    // check if the password follows constraints or not.

    // if password length is less than 8 characters, alert invalid form.

    // if (password.length < 8) {
    //   loginNotification(
    //     'Invalid Form, Password must contain greater than or equal to 8 characters.',
    //   )
    //   return
    // }

    // variable to count upper case characters in the password.
    let countUpperCase = 0;
    // variable to count lowercase characters in the password.
    let countLowerCase = 0;
    // variable to count digit characters in the password.
    let countDigit = 0;
    // variable to count special characters in the password.
    let countSpecialCharacters = 0;

    // for (let i = 0; i < password.length; i++) {
    //   const specialChars = [
    //     '!',
    //     '@',
    //     '#',
    //     '$',
    //     '%',
    //     '^',
    //     '&',
    //     '*',
    //     '(',
    //     ')',
    //     '_',
    //     '-',
    //     '+',
    //     '=',
    //     '[',
    //     '{',
    //     ']',
    //     '}',
    //     ':',
    //     ';',
    //     '<',
    //     '>',
    //   ]

    //   if (specialChars.includes(password[i])) {
    //     // this means that the character is special, so increment countSpecialCharacters
    //     countSpecialCharacters++
    //   } else if (!isNaN(password[i] * 1)) {
    //     // this means that the character is a digit, so increment countDigit
    //     countDigit++
    //   } else {
    //     if (password[i] == password[i].toUpperCase()) {
    //       // this means that the character is an upper case character, so increment countUpperCase
    //       countUpperCase++
    //     }
    //     if (password[i] == password[i].toLowerCase()) {
    //       // this means that the character is lowercase, so increment countUpperCase
    //       countLowerCase++
    //     }
    //   }
    // }

    // if (countLowerCase == 0) {
    //   // invalid form, 0 lowercase characters
    //   loginNotification('Invalid Form, 0 lower case characters in password')
    //   return
    // }

    // if (countUpperCase == 0) {
    //   // invalid form, 0 upper case characters
    //   loginNotification('Invalid Form, 0 upper case characters in password')
    //   return
    // }

    // if (countDigit == 0) {
    //   // invalid form, 0 digit characters
    //   loginNotification('Invalid Form, 0 digit characters in password')
    //   return
    // }

    // if (countSpecialCharacters == 0) {
    //   // invalid form, 0 special characters characters
    //   loginNotification('Invalid Form, 0 special characters in password')
    //   return
    // }

    // if all the conditions are valid, this means that the form is valid

    // loginNotification('Form is valid')
  };

  const handleLogin = (e) => {
    // loginNotification("login clicked!")

    // validateForm()

    e.preventDefault();
    // document.querySelector("#login-main").innerHTML += (<><ToastContainer
    //     position='top-center'
    //     autoClose={false}
    //     toastStyle={{ backgroundColor:"#212527", color:"white", borderRadius:"1rem", fontFamily:"Poppins" }}
    // /></>)

    document.getElementById("login-btn").disable = true;

    fetch("http://45.127.4.151:8000/api/login", {
      method: "POST",
      body: JSON.stringify({
        username: document.getElementById("login-username").value,
        password: document.getElementById("login-password").value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.token !== undefined) {
          localStorage.setItem("Token", JSON.stringify(json.token));

          let localStorageToken = JSON.parse(localStorage.getItem("Token"));
          // console.log(typeof(localStorageToken))

          fetch("http://45.127.4.151:8000/api/user-info", {
            method: "POST",
            body: JSON.stringify({
              username: document.getElementById("login-username").value,
              password: document.getElementById("login-password").value,
            }),
            headers: {
              Authorization: "Token " + localStorageToken,
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((json) => {
              console.log(json);
              console.log(json.is_verified);
              if (json.is_verified == true) {
                localStorage.setItem("email", JSON.stringify(json.email));
                localStorage.setItem(
                  "first_name",
                  JSON.stringify(json.first_name)
                );
                localStorage.setItem(
                  "last_name",
                  JSON.stringify(json.last_name)
                );
                localStorage.setItem("phone", JSON.stringify(json.phone));
                localStorage.setItem(
                  "user_role",
                  JSON.stringify(json.user_role)
                );
                loginNotification("Login Successful!");
                navigate("/dashboard");
              } else {
                alert(
                  "Please verify your email address before trying to Log in."
                );
                navigate("/login");
              }
            });
        } else {
          // alert('Wrong username or password')
          loginNotification("Wrong username or password");
          document.getElementById("login-btn").disable = false;
        }
      });
  };

  return (
    <div>
      <Navbar />
      <div className="login-main" id="login-main">
        <div className="login-container">
          <section className="login-wrapper">
            <div className="login-heading">
              <h1 className="text text-large">Login</h1>
              <p className="text text-normal">
                New user?{" "}
                <span>
                  <Link
                    to="/register"
                    style={{ color: "#A2F1FB" }}
                    className="text text-links"
                  >
                    Create an account
                  </Link>
                </span>
              </p>
            </div>
            <form name="login" className="login-form">
              <div className="login-input-control">
                <label
                  htmlFor="login-username"
                  className="login-input-label"
                  hidden
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="login-username"
                  id="login-username"
                  className="login-input-field"
                  placeholder="Email Address"
                />
              </div>
              <div className="login-input-control">
                <label
                  htmlFor="login-password"
                  className="login-input-label"
                  hidden
                >
                  Password
                </label>
                <input
                  type="password"
                  name="login-password"
                  id="login-password"
                  className="login-input-field"
                  placeholder="Password"
                />
              </div>
              <div
                className="login-input-control"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginTop: "3rem",
                }}
              >
                <div>
                  <Link
                    to="/forgot-password"
                    className="text text-links"
                    style={{ color: "#A2F1FB" }}
                  >
                    Forgot Password
                  </Link>
                </div>
                <div>
                  {/* <input type="submit" name="login" className="input-submit" style={{ "width": "150px" }} value="Login" onClick={handleLogin} /> */}
                  <button
                    type="submit"
                    name="login"
                    className="login-input-submit"
                    style={{ width: "150px" }}
                    id="login-btn"
                    onClick={handleLogin}
                  >
                    <a href="/dashboard" style={{ color: "#E9EBF8" }}>
                      Login
                    </a>
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        toastStyle={{
          backgroundColor: "#212527",
          color: "white",
          borderRadius: "1rem",
          fontFamily: "Poppins",
        }}
      />
    </div>
  );
};
export default Login;
