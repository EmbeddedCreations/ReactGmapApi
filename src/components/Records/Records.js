import React,{ useEffect, useState }  from "react";
import {Link} from "react-router-dom";
import "./Records.css";
function Records() {

  const [data,setData] = useState([]);

  const columns = [
    { title: "ID", field: "id" },
    { title: "Date", field: "Trip_date" },
    { title: "User_ID", field: "User" },
    { title: "Name", field: "Name" },
    { title: "Trip", field: "Trip" },
    { title: "Marker Type", field: "Marker_type" },
    { title: "Distance(KM)", field: "Total_dist" },
    { title: "Revenue ₹", field: "Total_Amount" },
  ];

  useEffect(() => {
     const getData = async () => {
       const res = await fetch(
         "http://localhost/show_details.php"
       );
       const getData = await res.json();
       setData(getData);
     };
     getData();
   }, []);
   const handleSurveyButtonClick = (id) => {
    console.log(id);
  };
   
  return (
    <div>
      <h1 className="heading">Records Table</h1>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.field}>{column.title}</th>
            ))}
            <th>Survey</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
            {columns.map((column) => (
              <td key={column.field}>{row[column.field]}</td>
            ))}
            <td>
              <button onClick={() => handleSurveyButtonClick(row.User)}>
                Survey
              </button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Records;
