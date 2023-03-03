import { GoogleMap, Marker,InfoWindow,Polyline} from "@react-google-maps/api";
import Type_A from '../assets/A.png'
import Type_B from '../assets/B.png'
import Type_C from '../assets/C.png'
import React,{ useEffect, useState} from "react";
import "./Map.css"

const Map =(props) => {
    const { isLoaded } = props;
    const containerStyle ={
        with:"200px",
        height:"600px",
    };
// function sql(){
//     var mysql = require("mysql");
//     var con = mysql.createConnection({
//         host:"localhost",
//         user:"root",
//         password:"",
//         database:"mysql"
//     })
//     con.connect(function(err){
//         if(err) throw err;
//         var sql = "INSERT INTO Trip_details (Trip_date,Name,Trip,Marker_type,Total_dist) VALUES ?"
        
//     })
// }
    
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
        return d*1.6;
      }
    const calcute_final_dist = () => {
        var dist = 0;
        for(let i =0;i<setCoords.length-1;i++){
            dist += haversine_distance(setCoords[i],setCoords[i+1])
        }
        return dist.toFixed(2);
    }
    const center ={
        lat:22.11839,
        lng: 78.04667,
    };
    const dist = [];
    const [markers,setMarker] = useState([]);
    useEffect(()=>{
        const getMarker = async ()=>{
            const res = await fetch('http://localhost/gmap/markers.php')
            const getData = await res.json();
            setMarker(getData);
        }
        getMarker();
    },[])
    
    
    const [selctedMarker,setSelectedMarker] = useState([]);
    const [setCoords,setSelectedCoords] = useState([]);
    const [checkValue,setCheckValue] =  useState([]);
    const [m_type,setM_type] = useState(null);
    const [values,setValues] = useState([]);
    const [trip,set_trip] = useState("");
    const handleChange = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;
        console.log(value, checked);
    
        if (checked) {
          setCheckValue([...checkValue, value]);
        } else {
          setCheckValue(checkValue.filter((e) => e !== value));
        }
      };
    const SendDistance =()=>{
        var d = calcute_final_dist();
        console.log("distance: - ",d);
    }
    const google = window.google
    
    
    return (isLoaded  && ( <>
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={18}
        >
        
        {}
        
        {markers.map((marker) =>{
            // console.log(selctedMarker)
            if((checkValue.includes(marker.Marker_Type))){
                return(
                    <div key={marker.id}>
                        <Marker position={{lat:parseFloat(marker.Latitude),lng:parseFloat(marker.Longitude)}} options={{
                        icon:
                        marker.Marker_Type=='A'
                        ?Type_A
                        :marker.Marker_Type=='B'
                        ?Type_B:
                        marker.Marker_Type=='C'
                        ?Type_C
                        :"",
                        }}
                        onClick={()=>{
                            setSelectedMarker(marker);
                            const coordinates ={lat:parseFloat(marker.Latitude),lng:parseFloat(marker.Longitude)};
                            console.log(setCoords.length);
                            console.log(m_type);
                            if(setCoords.length<1){
                                setSelectedCoords([...setCoords,coordinates])
                                setM_type(marker.Marker_Type);

                            }else{
                                console.log(marker.Marker_Type);
                                if(m_type == marker.Marker_Type){
                                    setSelectedCoords([...setCoords,coordinates])       
                                }
                            }
                            
                        }}/>
                    </div>    
                )
            }
            
        })}
        
        {selctedMarker && (
            <Polyline
            path = {setCoords}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2} />
            
        )}
        </GoogleMap>
        <div id="legend">
        <h4>Map Legends</h4>
        <div className="style">
            <div className="para">Type A</div>
            <div><img className="marker" src={Type_A}/></div>
            <div><input id="checkbox" className="cbox" type="checkbox" value="A" onChange={handleChange}/></div>
        </div>
        <div className="style">
            <div className="para">Type B</div>
            <div><img className="marker" src={Type_B}/></div>
            <div><input id="checkbox1" className="cbox" type="checkbox" value="B" onChange={handleChange}/></div>
        </div>
        <div className="style">
            <div className="para">Type C</div>
            <div><img className="marker" src={Type_C}/></div>
            <div><input id="checkbox2" className="cbox" type="checkbox" value="C" onChange={handleChange} /></div>
        </div>
        <div>
            <button onClick={SendDistance}>Calculate Distance</button>
        </div>
    </div>
        </>
    )
    );
};

export default Map;