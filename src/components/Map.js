import { GoogleMap, Marker } from "@react-google-maps/api";
import Type_A from '../assets/A.png'
import Type_B from '../assets/B.png'
import Type_C from '../assets/C.png'

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
    return (isLoaded && ( <>
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        >
        {/* <Marker position={center}/> */}
        {markers.map((marker) =>{
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
        })}
        </GoogleMap>
        </>
    )
    );
};

export default Map;