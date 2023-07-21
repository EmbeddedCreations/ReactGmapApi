import Records from "./components/Records/Records";
import "./App.css";
import { useState,useEffect } from "react";
import {  Routes, Route ,useNavigate,Navigate} from "react-router-dom";
import LoginPage from "./components/Login/Login";
import RegisterPage from "./components/Register/Register";
import NotFound from "./components/404/404";
import Home from "./components/Home/Home";


function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const[user,setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth) {
      setIsAuthenticated(JSON.parse(storedAuth));
    }
  }, []);
  
  function handleUserLogin(user) {
    setUser(user);
    console.log(user);
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', true);
    if(user === "Admin"){
      navigate("/Home/Admin");
    }else{
      navigate("/Home/User");
    }
    
  }
  const handleUserLogout = () => {
    setUser(null);
    window.alert("You have been logged out successfully.");
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate("/login");
  };
 
  return (
    <div className="App">
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/Home/User" element={<Home className="Home" user="User" UserLogout={handleUserLogout} />}
            />
            {user === 'Admin' && (
              <>
                <Route path="/Home/Admin" element={<Home className="Home" user="Admin" UserLogout={handleUserLogout} />} />
                <Route path="/records" element={<Records />} />
              </>
            )}
            <Route path="/" element={<Navigate to={user === 'Admin' ? '/Home/Admin' : '/Home/User'} />} />
          </>
        ) : (
          <>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage onLogin={handleUserLogin} />} />
          </>
        )}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/notfound" element={<NotFound />} />
        
        <Route path="*" element={<Navigate to="/notfound" />} />
      </Routes>
    </div>
  );
};

export default App;
