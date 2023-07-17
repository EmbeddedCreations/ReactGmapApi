import React, { useState, useEffect } from "react";
import "./Login.css";
import smartCity from "../assets/smart-city-nagpur-logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    const getCredentials = async () => {
      const res = await fetch("https://embeddedcreation.in/deeGIS/backend/login.php");
      const getData = await res.json();
      setCredentials(getData);
    };
    getCredentials();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Form validations
    // const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{3,}$/;
    // const passwordRegex = /^[a-zA-Z0-9]{4,}$/;

    // if (!username.match(usernameRegex)) {
    //   setErrorMessage(
    //     "Username should be at least 4 characters long, starting with alphabets and alphanumeric"
    //   );
    //   return;
    // }

    // if (!password.match(passwordRegex)) {
    //   setErrorMessage("Password should be at least 4 characters long");
    //   return;
    // }

    // Handle login logic here
    console.log(`Username: ${username}, Password: ${password}`);

    if (username === "" || password === "") {
      window.alert("Please Enter All The Credentials Properly");
    }
    const creds = credentials.find((credentials) => credentials.UserName === username);
    console.log(creds);
    if (creds === undefined) {
      // I want to route to /Map  while also sending a prop whose value would be creds.Type using link
      window.alert("UserName Does not Exists");
    } else {
      if (creds.Password === password) {
        props.onLogin(creds.Type);
        window.alert("Succesful Login");
      } else {
        window.alert("Incorrect password");
      }
    }

    // Clear form inputs and error message
    setUsername("");
    setPassword("");
    setErrorMessage("");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
    setErrorMessage("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="main">
      <div className="login-container">
        <img className="logo" src={smartCity} alt="Smart City Logo" />
        <div className="nmc">
          Nagpur Smart & Sustainable City Development Corporation LTD
        </div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
              <div
                className="eye-icon"
                onClick={togglePasswordVisibility}
                style={{ visibility: password ? "visible" : "hidden" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <button type="submit">Log In</button>
          <div className="forgot-password">Forgot Password?</div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
