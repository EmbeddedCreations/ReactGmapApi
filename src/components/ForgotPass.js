import React, { useState } from 'react';
import "./ForgotPassword.css"
import { useNavigate } from 'react-router-dom';
import smartCity from "../assets/smart-city-nagpur-logo.png";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function generateOTP() {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle password reset logic here
    console.log(`Email: ${email}, OTP: ${otp}, Password: ${password}, Confirm Password: ${confirmPassword}`);
  };

  return (
    <div className='main'>
    <div style={{display:"flex",marginTop:"50px"}}>
    <div><img className="logo" src={smartCity}/></div>
    <div className="nmc">
        Nagpur Smart & Sustainable City Development Corporation LTD
        </div> </div>   
    <div className='forgot-password'>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="otp">OTP:</label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={(event) => setOTP(event.target.value)}
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
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
    </div>
  );
};

export default ForgotPasswordPage;
