import {
  GoogleMap,
  Marker,
  Polyline,
  TrafficLayer,
  HeatmapLayer,
  TransitLayer,
  BicyclingLayer,
  KmlLayer,
  StreetViewPanorama,
} from "@react-google-maps/api";
//importing images,required api to plot the maps and markers
import Type_A from "../assets/A.png";
import Type_B from "../assets/B.png";
import Type_C from "../assets/C.png";
import React, { useEffect, useState, useRef } from "react";

import "./Map.css";

const Map = (props) => {
  const { isLoaded } = props;
  const containerStyle = {
    height: "100vh",
    width: "100%",
  };
  const [coordinates, setCoordinates] = useState(null);
  const [panorama, setPanorama] = useState(null);
  const handlePanoramaLoad = (panorama) => {
    setPanorama(panorama);
  };
  // const [selectedLayer, setSelectedLayer] = useState('traffic');
  const [selctedMarker, setSelectedMarker] = useState();
  const [setCoords, setSelectedCoords] = useState([]);
  const [m_type, setM_type] = useState(null);
  const [values, setValues] = useState([]);
  const [markers, setMarker] = useState([]);
  const [checkValue, setCheckValue] = useState([]);
  const [center, setCenter] = useState({ lat:21.112709045410156, lng: 79.06546783447266 });
  const coordinates1 = [
    { lat: 40.7128, lng: -74.006 },
    { lat: 41.8781, lng: -87.6298 },
    { lat: 34.0522, lng: -118.2437 },
    { lat: 39.9526, lng: -75.1652 },
    { lat: 29.7604, lng: -95.3698 },
    { lat: 32.7157, lng: -117.1611 },
  ];
  
  const coordinates2 = [
    { lat: 51.5074, lng: -0.1278 },
    { lat: 48.8566, lng: 2.3522 },
    { lat: 40.4168, lng: -3.7038 },
    { lat: 41.3851, lng: 2.1734 },
    { lat: 52.5200, lng: 13.4050 },
    { lat: 55.7558, lng: 37.6173 },
  ];
  const [selectedOption, setSelectedOption] = useState("option1");

  const options = [
    { value: "option1", label: "Option 1", color: "#0000FF", path: setCoords },
    { value: "option2", label: "Option 2", color: "#FF0000", path: coordinates1 },
    { value: "option3", label: "Option 3", color: "#00FF00", path: coordinates2 },
  ];

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const selectedOptionData = options.find((option) => option.value === selectedOption);
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
  const handleMarkerClick = (marker) => {
    //Code to detect if marker is clicked and then add it to the array setCoords to plot the line between two markers
    setSelectedMarker(marker);
    setPanorama(null); // reset panorama when a marker is clicked

    const coordinates = {
      lat: parseFloat(marker.Latitude),
      lng: parseFloat(marker.Longitude),
    };
    setCoordinates(coordinates);
    setCenter(coordinates);
    
    //pushing cordinates/markers selected into an array(setCoords)
    if (setCoords.length < 1) {
      setSelectedCoords([...setCoords, coordinates]);
      setValues([...values, marker.MarkerID]);
      setM_type(marker.Marker_Type);
      console.log(coordinates);
    } else {
      console.log(marker.Marker_Type);
      if (m_type == marker.Marker_Type && !values.includes(marker.MarkerID)) {
        setSelectedCoords([...setCoords, coordinates]);
        setValues([...values, marker.MarkerID]);
      }
      if (values.includes(marker.MarkerID)) {
        const result = window.confirm(
          "Are you sure you want to delete this item?"
        );
        console.log(values);
        if (result === true) {
          // User clicked "OK" or "Yes"
          const findElement = "" + marker.MarkerID + "";
          const index = values.indexOf(findElement);
          DeleteClick(index);
          console.log("Item deleted.");
          console.log(values);
        } else {
          // User clicked "Cancel" or "No"
          console.log("Deletion cancelled.");
        }
      }
    }
  };
  useEffect(() => {
    var arrString = values.join("->");
    props.getTrip(arrString);
    SendDistance();
  }, [values]);
  const DeleteClick = (markerIndex) => {
    const updatedValues = [...values];
    const updatedCoords = [...setCoords];
    console.log(updatedValues);
    console.log(setCoords);
    // Remove the marker and its coordinates from the arrays
    updatedValues.splice(markerIndex, 1);

    updatedCoords.splice(markerIndex, 1);

    // Update the state with the new arrays
    setValues(updatedValues);
    setSelectedCoords(updatedCoords);
    console.log(updatedValues);
  };

  //Fetching of Data from localHost From mysql
  useEffect(() => {
    const getMarker = async () => {
      const res = await fetch(
        "https://embeddedcreation.in/deeGIS/backend/markers.php"
      );
      const getData = await res.json();
      setMarker(getData);
    };
    getMarker();
  }, []);

  //Function to see the legend checkbox
  const handleChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setCheckValue([...checkValue, value]);
    } else {
      setCheckValue(checkValue.filter((e) => e !== value));
    }
  };
  // const renderLayer = () => {
  //   switch (selectedLayer) {
  //     case 'traffic':
  //       return <TrafficLayer />;
  //     case 'transit':
  //       return <TransitLayer />;
  //     case 'bicycle':
  //       return <BicyclingLayer/>;
  //     case 'kml':
  //       return <KmlLayer/>;
  //     case 'heatmap':
  //       return <HeatmapLayer/>
  //     default:
  //       return null;
  //   }
  // };
  //Function to display cummaltative distance on console
  const SendDistance = () => {
    var d = calcute_final_dist();
    console.log("distance: - ", d);
    props.getDist(d);
  };
  const google = window.google;
  const zoom = 13;
  //Loading of Google Map
  return (
    isLoaded && (
      <div className="mapContainer">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom = {zoom}
          mapOptions
        >
          {}

          {markers.map((marker) => {
            //Conditional plotting of markers according to legend
            if (checkValue.includes(marker.Marker_Type)) {
              return (
                <div key={marker.id}>
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
                    title={marker.MarkerID +"\rAgency Name: ABC\r"+" Category: YYY\r"+" Height:XX mtr\r"+" Length:XX mtr\r"+" Breadth:XX mtrs"}
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
  strokeColor="black"
  strokeOpacity={0.8}
  strokeWeight={2}
  animateMarker
/>
          )}
          {/* {selectedOptionData && (
        <Polyline
          path={selectedOptionData.path}
          strokeColor={selectedOptionData.color}
          strokeOpacity={0.8}
          strokeWeight={2}
          animateMarker
        />
      )} */}
          {/* <TrafficLayer/> */}
          {/* <BicyclingLayer/> */}
          {/* <HeatmapLayer data={setCoords} /> */}
          {/* <KmlLayer/> */}
          {/* <TransitLayer/> */}
          {/* <StreetViewPanorama
            position={center}
      
          /> */}
          {/* {renderLayer()} */}
          {/* {selctedMarker && (
            <StreetViewPanorama
              // position={coordinates}
              // position={{ lat: 21.12079167, lng: 79.02505556}}
              visible={panorama !== null}
              onLoad={handlePanoramaLoad}
            />
          )} */}
        </GoogleMap>
        {/* Code For Legend */}
        <div id="legend">
          {/* <label htmlFor="layer-select">Select a layer:</label>
      <select id="layer-select" value={selectedLayer} onChange={handleChange}>
        <option value="traffic">Traffic</option>
        <option value="transit">Transit</option>
        <option value="heatmap">Heatmap</option>
        <option value="bicycle">Bicycling</option>
        <option value="kml">Kml</option>
      </select> */}
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
          <select value={selectedOption} onChange={handleDropdownChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
        </div>
      </div>
    )
  );
};

export default Map;
