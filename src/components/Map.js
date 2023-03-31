import {
  GoogleMap,
  Marker,
  Polyline,
} from "@react-google-maps/api";
// import { Easing, Tween, update } from "@tweenjs/tween.js";
//importing images,required api to plot the maps and markers
import Type_A from "../assets/A.png";
import Type_B from "../assets/B.png";
import Type_C from "../assets/C.png";
import React, { useEffect, useState } from "react";
import "./Map.css";

const Map = (props) => {
  const { isLoaded } = props;
  const containerStyle = {
    height: "100vh",
    width: "100%",
  };
  const [showRightMenu, setShowRightMenu] = useState(false);
  const [postion, setPosition] = useState({ x: 0, y: 0 });

  const [selctedMarker, setSelectedMarker] = useState([]);
  const [setCoords, setSelectedCoords] = useState([]);
  const [m_type, setM_type] = useState(null);
  const [values, setValues] = useState([]);
  const [trip, set_trip] = useState("");
  const [markers, setMarker] = useState([]);
  const [checkValue, setCheckValue] = useState([]);
  //Function To calculate Distance between two markers
  function haversine_distance(mk1, mk2) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

    var d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2)
        )
      );
    return d * 1.6;
  }
  // Calculating the cumalative Distance of all the markers Selected
  const calcute_final_dist = () => {
    var dist = 0;
    for (let i = 0; i < setCoords.length - 1; i++) {
      dist += haversine_distance(setCoords[i], setCoords[i + 1]);
    }
    return dist.toFixed(2);
  };

  const center = {
    lat: 22.11839,
    lng: 78.04667,
  };


  const handleMarkerClick = (marker) => {
    //Code to detect if marker is clicked and then add it to the array setCoords to plot the line between two markers
    setSelectedMarker(marker);
    

    const coordinates = {
      lat: parseFloat(marker.Latitude),
      lng: parseFloat(marker.Longitude),
    };
    // console.log(setCoords.length);
    // console.log(m_type);

    //pushing cordinates/markers selected into an array(setCoords)
    if (setCoords.length < 1) {
      setSelectedCoords([...setCoords, coordinates]);
      setValues([...values,marker.MarkerID]);
      setM_type(marker.Marker_Type);
      set_trip(trip + marker.MarkerID);
      // console.log(trip);
      // props.getTrip(trip);
    } else {
      console.log(marker.Marker_Type);
      if (m_type == marker.Marker_Type && !trip.includes(marker.MarkerID)) {
        setSelectedCoords([...setCoords, coordinates]);
        setValues([...values,JSON.stringify(marker.MarkerID)]);
        // console.log(trip);
        set_trip(trip + "->" + marker.MarkerID);
        // props.getTrip(trip);
      }if(trip.includes(marker.MarkerID)){
        console.log(trip);
        console.log(setCoords);
        console.log(values);
        console.log(JSON.stringify(marker.MarkerID));
       console.log(values.findIndex(JSON.stringify(marker.MarkerID)));
        console.log("adrak")
        
        console.log("lasan");
      }
    }
  };
  useEffect(()=>{
    props.getTrip(trip);
  },[trip])
  // const handleMarkerDoubleClick = (markerIndex) => {
  //   console.log(selctedMarker);
  //   console.log(markerIndex);
  //   console.log(setCoords);
  //   // const updatedMarkers = [...selctedMarker];
  //   const updatedCoords = [...setCoords];
  //   // console.log(markerIndex);
  //   // console.log(updatedMarkers);
  //   // Remove the marker and its coordinates from the arrays
  //   // updatedMarkers.splice(markerIndex, 1);
  //   updatedCoords.splice(markerIndex, 1);

  //   // Update the state with the new arrays
  //   // setSelectedMarker(updatedMarkers);
  //   setSelectedCoords(updatedCoords);
  //   console.log(updatedCoords);
  //   console.log("executed sucessfully");
  // };

  //Fetching of Data from localHost From mysql
  useEffect(() => {
    const getMarker = async () => {
      const res = await fetch("http://localhost/gmap/markers.php");
      const getData = await res.json();
      setMarker(getData);
    };
    getMarker();
  }, []);

  //Function to see the legend checkbox
  const handleChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    //console.log(value, checked);

    if (checked) {
      setCheckValue([...checkValue, value]);
    } else {
      setCheckValue(checkValue.filter((e) => e !== value));
    }
  };

 
  //Function to display cummaltative distance on console
  const SendDistance = () => {
    var d = calcute_final_dist();
    console.log("distance: - ", d);
    props.getDist(d);
  };
  const google = window.google;

  //Loading of Google Map
  return (
    isLoaded && (
      <div className="mapContainer">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={18}
          mapOptions
          // mapId={'11591122c5fe6d88'}
        >
          {}

          {markers.map((marker) => {
            //Conditional plotting of markers according to legend
            if (checkValue.includes(marker.Marker_Type)) {
              return (
                <div  key={marker.id}>
                  <Marker
                    position={{
                      lat: parseFloat(marker.Latitude),
                      lng: parseFloat(marker.Longitude),
                    }}
                    options={{
                      icon:
                        marker.Marker_Type == "A"
                          ? Type_A
                          : marker.Marker_Type == "B"
                          ? Type_B
                          : marker.Marker_Type == "C"
                          ? Type_C
                          : "",
                    }}
                    title={marker.MarkerID}                    
                    onClick={() => handleMarkerClick(marker)}
                  />
                </div>
              );
            }

            if (props.Clear == 1) {
              props.getTrip("");
            }
          })}

          {/* Code to Deploy Polyline */}
          {selctedMarker && (
            <Polyline
              path={setCoords}
              strokeColor="#0000FF"
              strokeOpacity={0.8}
              strokeWeight={2}
            />
          )}
          
        </GoogleMap>
        {/* Code For Legend */}
        <div id="legend">
          <h4>Map Legends</h4>
          <div className="style">
            <div className="para">Type A</div>
            <div>
              <img className="marker" src={Type_A} />
            </div>
            <div>
              <input
                id="checkbox"
                className="cbox"
                type="checkbox"
                value="A"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="style">
            <div className="para">Type B</div>
            <div>
              <img className="marker" src={Type_B} />
            </div>
            <div>
              <input
                id="checkbox1"
                className="cbox"
                type="checkbox"
                value="B"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="style">
            <div className="para">Type C</div>
            <div>
              <img className="marker" src={Type_C} />
            </div>
            <div>
              <input
                id="checkbox2"
                className="cbox"
                type="checkbox"
                value="C"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button onClick={SendDistance}>Calculate Distance</button>
          </div>
        </div>
      </div>
    )
  );
};

export default Map;
