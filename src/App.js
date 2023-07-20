import Records from "./components/Records/Records";
import "./App.css";
import { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import LoginPage from "./components/Login/Login";
import RegisterPage from "./components/Register/Register";
import NotFound from "./components/404/404";
import Home from "./components/Home/Home";


function App() {
  
  
  const[user,setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth) {
      setIsAuthenticated(JSON.parse(storedAuth));
    }
  }, []);

  function handleUserLogin(user) {
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', true);
  }
  const handleUserLogout = () => {
    setUser(null);
    window.alert("You have been logged out successfully.");
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };
  
  return (
    <div className="App">
        <Routes>
          {isAuthenticated ? (
            <>
              <Route
                path="/Map"
                element={
                  <>
                    <Home
                    className="Home"
                    user={user}
                    UserLogout={handleUserLogout}/>
                  </>
                }
              />
              <Route path="/Records" element={<Records />} />
            </>
          ) : (
            <Route
              path="/"
              element={<LoginPage onLogin={handleUserLogin} />}
            />
          )}
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/" element={<Navigate to="/Map" replace />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
    </div>
  );
}

export default App;
