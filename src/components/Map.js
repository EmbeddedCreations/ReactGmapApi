import { GoogleMap, Marker,InfoWindow} from "@react-google-maps/api";
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

    const center ={
        lat:22.11839,
        lng: 78.04667,
    };
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
    const [checkValue,setCheckValue] = useState([]);
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
      
    const google = window.google
    
    
    return (isLoaded  && ( <>
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={18}
        >
        
        {}
        
        {markers.map((marker) =>{
            console.log(selctedMarker)
            if((checkValue.includes('A')) && marker.Marker_Type == 'A'){
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
                        }}/>
                    </div>    
                )
            }
            if((checkValue.includes('B')) && marker.Marker_Type == 'B'){
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
                        }}/>
                    </div>
                    
                )}
                if((checkValue.includes('C')) && marker.Marker_Type == 'C'){
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
                            }}/>
                        </div>
                        
                    )}
        })}
        
        {/* {selctedMarker && (
            <InfoWindow
                position={{lat:parseFloat(selctedMarker.Latitude),lng:parseFloat(selctedMarker.Longitude)}}
                onCloseClick={()=>{
                    setSelectedMarker(null);
                }}
            >
                <div>
                    {selctedMarker.MarkerID}
                </div>
            </InfoWindow>
        )} */}
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
    </div>
        </>
    )
    );
};

export default Map;