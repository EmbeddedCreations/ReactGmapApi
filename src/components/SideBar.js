import React, { useState } from "react"
import "./SideBar.css"
import TextField from '@mui/material/TextField';
import axios from "axios";
const SideBar =(props)=>{
    const url = "";
    const trip = props.trip;
    const dist = props.dist;
    const [date,setDate] = useState();
    const [name,setName] = useState();
    // const async creatTrip= ()=>{
    //     await axios.post(url,JSON.stringify({
    //         Trip_date:date,
    //         Name:name,
    //         Trip:trip,
    //         Marker_type:trip[0],
    //         Total_dist:dist
    //     }))
        
    // }
    return(
        <div className="sidebar">
            <h1 className="heading">Gmap</h1>
            <div>
                <p className="label">Name:</p>
                <input className ="input"type="text" name="name"></input>
                
            </div>
            <div>
                <p className="label">Date:</p>
                <input className ="input" type="date" name="name"></input>
            </div>
            <div>
                <button className="btn" onClick={()=>console.log(props.trip[0])}>Select Route</button>
                <button className="btn" onClick={()=>window.location.reload(true)}>Clear Route</button>
            </div>
            <div>
                <p className="label">Trip:</p>
                <p className="label">{props.trip}</p>
            </div>
            <div>
                <p className="label">Dist:</p>
                <p className="label">{props.dist}{(props.dist > 0)?"Km":""}</p>
            </div>
        </div>
    )
}


export default SideBar