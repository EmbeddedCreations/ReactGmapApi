import React, { useState } from "react"
import "./SideBar.css"
import axios from "axios";
const SideBar =(props)=>{
    const url = "";
    const trip = props.trip;
    const dist = props.dist;
    
    const [date,setDate] = useState('');
    const [name,setName] = useState('');
    const[posts,setposts] = useState([]);

    const handleSubmit=()=>{
        
        if(name.length===0){
            alert("Name Has Left Blank!");
        }
        else if(date.length === 0 ){
            alert("Date has been left Blank!")
        }else if(dist === undefined){
            alert("Calculate distance")
        }else{
             
            const t_dist = parseFloat(dist);
            
            let tripData = new FormData();
            tripData.append('Trip_date',date);
            tripData.append('Name',name);
            tripData.append('Trip',trip);
            tripData.append('Marker_type',trip[0]);
            tripData.append('Total_dist',t_dist);

            axios({
                method:'post',
                url : 'http://localhost/gmap/markers.php',
                data: tripData,
                config:{headers : {'Content-Type':'multipart/form-data'}}

            }).then(function(response){
                console.log(response);
                alert("new Contact Added succesfully");
            }).catch(function(response){
                console.log(response);
            })
         }
    }

    
    return(
        <div className="sidebar">
            <h1 className="heading">Gmap</h1>
            <div>
                <p className="label">Name:</p>
                <input className ="input"type="text"   onChange={(e)=>setName(e.target.value)}></input>
                
            </div>
            <div>
                <p className="label">Date:</p>
                <input className ="input" type="date" onChange={(e)=>setDate(e.target.value)}></input>
            </div>
            <div>
                <button className="btn" onClick={handleSubmit}>Select Route</button>
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