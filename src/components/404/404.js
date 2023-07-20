import React from 'react';
import error from '../../assets/404.png'
import { Link } from 'react-router-dom';
import "./404.css"

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404: Page Not Found</h1>
      <p>Looks like you've wandered off the beaten path!</p>
      
      <img src={error} alt="Lost in the woods" />
      <p>
        Let's get you back on track. You can either go back to the homepage or
        try again later.
      </p>
      <Link to="/">Back to Homepage</Link>
    </div>
  );
};

export default NotFound;
