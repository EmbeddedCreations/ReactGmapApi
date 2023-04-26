import React, { useState,useEffect } from 'react';
import "./Login.css"
import { useNavigate } from 'react-router-dom';

const LoginPage = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [credentials,setCredentials] = useState('');


  useEffect(() => {
    const getCredentials = async () => {
      const res = await fetch(
        "http://localhost/login.php"
      );
      const getData = await res.json();
      setCredentials(getData);  
    };
    getCredentials();
  }, []);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log(`Username: ${username}, Password: ${password}`);
    if(username === '' || password === ''){
      window.alert("Please Enter All The Credentials Properly");
    }
    const creds = credentials.find(credentials => credentials.UserName === username);
    console.log(creds);
    if(creds === undefined){
      // I want to route to /Map  while also sending a prop whose value would be creds.Type using link
      window.alert("UserName Does not Exists");
    }else{
      if(creds.Password === password){
        props.onLogin(creds.Type);
        window.alert("Succesful Login");
      }else{
        window.alert("Incorrect password");
      }
    }
  };

  return (
    
    <div className='login'>
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
         
          <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginPage;
