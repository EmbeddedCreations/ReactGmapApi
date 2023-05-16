import React, { useState, Link } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import smartCity from "../assets/smart-city-nagpur-logo.png";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log(`Username: ${username}, Password: ${password}`);
  };

  return (
    <div className="main">
      <div style={{ display: "flex", marginTop: "50px" }}>
        <div>
          <img className="logo" src={smartCity} />
        </div>
        <div className="nmc">
          Nagpur Smart & Sustainable City Development Corporation LTD
        </div>{" "}
      </div>
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {/* <Link> */}
            {" "}
            <button type="submit">Log In</button>
          {/* </Link> */}
          <div className="forgot-password">Forgot Password?</div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
