import React from 'react'
import { useJsApiLoader } from "@react-google-maps/api";
import { mapOptions } from "../Map/MapConfiguration";
import SideBar from '../Sidebar/SideBar'
import Map from '../Map/Map'
import { useState} from "react";
import './Home.css'

function Home(props) {
    const [trip, setTrip] = useState("");
    const [dist, setDist] = useState();
    const [clear, isClear] = useState(0);
    const { isLoaded } = useJsApiLoader({
        id: mapOptions.googleMapApiKey,
        googleMapsApiKey: mapOptions.googleMapApiKey,
      });
    function getTrip(trip) {
        setTrip(trip);
      }
      function getDist(d) {
        setDist(d);
      }
      
      function setClear(cr) {
        isClear(1);
      }
    
  return (
    <div className='home-container'>
        <SideBar
        className="sidebar"
        trip={trip}
        setClear={setClear}
        dist={dist}
        user={props.user}
        onLogout={props.UserLogout}/>
        <Map
        className="map"
        isLoaded={isLoaded}
        getTrip={getTrip}
        Clear={clear}
        getDist={getDist}/>
    </div>
  )
}

export default Home
