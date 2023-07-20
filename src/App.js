import { useJsApiLoader } from "@react-google-maps/api";
import { mapOptions } from "./components/Map/MapConfiguration";
import Records from "./components/Records/Records";
import "./App.css";
import { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import SideBar from "./components/Sidebar/SideBar";
import Map from "./components/Map/Map";
import LoginPage from "./components/Login/Login";
import RegisterPage from "./components/Register/Register";
import NotFound from "./components/404/404";

function App() {
  const { isLoaded } = useJsApiLoader({
    id: mapOptions.googleMapApiKey,
    googleMapsApiKey: mapOptions.googleMapApiKey,
  });
  const [trip, setTrip] = useState("");
  const [dist, setDist] = useState();
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
  function getTrip(trip) {
    setTrip(trip);
  }
  function getDist(d) {
    setDist(d);
  }
  const [clear, isClear] = useState(0);
  function setClear(cr) {
    isClear(1);
  }

  return (
    <div className="App">
        <Routes>
          {isAuthenticated ? (
            <>
              <Route
                path="/Map"
                element={
                  <>
                    <SideBar
                      className="sidebar"
                      trip={trip}
                      setClear={setClear}
                      dist={dist}
                      user={user}
                      onLogout={handleUserLogout}
                    />
                    <Map
                      className="map"
                      isLoaded={isLoaded}
                      getTrip={getTrip}
                      Clear={clear}
                      getDist={getDist}
                    />
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
