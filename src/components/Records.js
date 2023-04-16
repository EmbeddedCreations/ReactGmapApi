<<<<<<< Updated upstream
import React, { useState } from "react";

function Records() {
  const [setData,data] = useState([]);
  // const data = [
  //   { id: 1, name: "John", age: 25, city: "New York", country: "USA" },
  //   { id: 2, name: "Jane", age: 30, city: "Paris", country: "France" },
  //   { id: 3, name: "Bob", age: 35, city: "London", country: "UK" },
  //   { id: 4, name: "Alice", age: 40, city: "Tokyo", country: "Japan" },
  // ];
=======
import React,{ useEffect, useState }  from "react";
import {Link} from "react-router-dom";

function Records() {

  const [data,setData] = useState([]);
>>>>>>> Stashed changes

  const columns = [
    { title: "ID", field: "Id" },
    { title: "Date", field: "Trip_date" },
    { title: "Name", field: "Name" },
    { title: "Trip", field: "Trip" },
    { title: "Marker Type", field: "Marker_type" },
    { title: "Distance(KM)", field: "Total_dist" },
    { title: "Revenue ₹", field: "Total_Amount" },
  ];
<<<<<<< Updated upstream
  // useEffect(() => {
  //   const getMarker = async () => {
  //     const res = await fetch(
  //       "http://localhost/show_details.php"
  //     );
  //     const getData = await res.json();
  //     setMarker(getData);
  //   };
  //   getMarker();
  // }, []);
=======
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

>>>>>>> Stashed changes
  return (
    <div>
      <button>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Back
        </Link>
      </button>
      <h1>Records Table</h1>
      <table>
        <thead>
          <tr>
            {console.log(data)}
            {columns.map((column) => (
              <th key={column.field}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={row.id}>{row[column.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Records;
