import { GoogleMap, Marker,InfoWindow} from "@react-google-maps/api";
import Type_A from '../assets/A.png'
import Type_B from '../assets/B.png'
import Type_C from '../assets/C.png'
import React,{useEffect, useState} from "react";
import mapStyles from "../mapStyles";
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
    
    const markers=[
        {
            name:"A1",
            type:"A",
            location:{
            lat:22.11839,
            lng: 78.04667,
            },
        },
        {
            name:"A2",
            type:"A",
            location:{
            lat:22.11842,
            lng: 78.04642,
            },  
        },
        {
            name:"A3",
            type:"A",
            location:{
            lat:22.11853,
            lng: 78.04627,
            },
        },
        {
            name:"B1",
            type:"B",
            location:{
            lat:22.11844,
            lng: 78.04673,
            },
        },
        {
            name:"B2",
            type:"B",
            location:{
            lat:22.11847,
            lng: 78.04648,
            },
        },
        {
            name:"B3",
            type:"B",
            location:{
            lat:22.11838,
            lng: 78.04544,
            },
        },
        {
            name:"B4",
            type:"B",
            location:{
            lat:22.1184,
            lat: 78.04502,
            },
        },
        {
            name:"C1",
            type:"C",
            location:{
            lat:22.11878,
            lng: 78.04624,
            },
        },
        {
            name:"C2",
            type:"C",
            location:{
            lat:22.11856,
            lng: 78.0463,
            },
        },
        {
            name:"C3",
            type:"C",
            location:{
            lat:22.11858, 
            lng:78.04549,
            },
        },
        {
            name:"C4",
            type:"C",
            location:{
            lat:22.11833,
            lng: 78.04553,
            },
        }
    ]
    const [selctedMarker,setSelectedMarker] = useState(null);
    const [checkValue,setCheckValue] = useState({checkedMarker:[]});
    const handleChange = (e) =>{
        
        const {value} = e.target;
        const checkedMarker = e.target.checked;
        
        const {checkedValue} = checkValue;
        // console.log(` ${value} is ${checkedMarker}`)
        if(checkedMarker){
            
                
            
            setCheckValue({
                checkedMarker:[checkedMarker, value],
                
            })  
        }
        else{
            setCheckValue({
                checkedValue : [checkedMarker, value]  
            });
        }

    }
    const google = window.google
    const points = [];
    
    // function addMarker  (){
        
    //     for(let i =0;i<markers.length;i++){
    //         const marker = new google.maps.Marker({
    //             position: markers.location,
    //             icon:markers.type=='A'?Type_A
    //             :markers.type=='B'?Type_B:
    //             marker.type=='C'?Type_C:"" ,
    //             animation: google.maps.Animation.DROP,
                    
    //         })
    //         points.push(marker);
    //     }  
    // }
    return (isLoaded && ( <>
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={19}
        
        >
        
        
        {markers.map((marker) =>{
            console.log(checkValue)
            return(
                <div key={marker.name}>
                    <Marker position={marker.location} options={{
                    icon:
                    marker.type=='A'
                    ?Type_A
                    :marker.type=='B'
                    ?Type_B:
                    marker.type=='C'
                    ?Type_C
                    :"",
                    }}/>
                </div>
                
            )
            
        })
        }
        {console.log(markers)}
        {console.log(points)}
        {selctedMarker && (
            <InfoWindow
                position={selctedMarker.location}
                onCloseClick={()=>{
                    setSelectedMarker(null);
                }}
            >
                <div>
                    {selctedMarker.name}
                </div>
            </InfoWindow>
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
    </div>
        </>
    )
    );
};

export default Map;