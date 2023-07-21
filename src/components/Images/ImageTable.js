import React, { useEffect, useState } from "react";
import "./Records.css";

function ImageRecords() {
  const [data, setData] = useState([]);

  const columns = [
    { title: "ID", field: "id" },
    { title: "Height", field: "height" },
    { title: "Width", field: "width" },
    { title: "Image", field: "image" },
  ];

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        "https://embeddedcreation.in/deeGIS/backend/show_details.php"
      );
      const getData = await res.json();
      setData(getData);
    };
    getData();
  }, []);

  return (
    <div>
      <h1 className="heading">Image Records Table</h1>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.field}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.field}>
                  {column.field === "image" ? (
                    <img
                      src={row[column.field]}
                      alt={`Image ${row.id}`}
                      width={row.width}
                      height={row.height}
                    />
                  ) : (
                    row[column.field]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ImageRecords;

// Abhishek see the below given data format aise type ka data pass karna upar
// const imageData = [
//     {
//       id: 1,
//       height: 100,
//       width: 200,
//       image: "https://example.com/image1.jpg",
//     },
//     {
//       id: 2,
//       height: 150,
//       width: 300,
//       image: "https://example.com/image2.jpg",
//     }
//   ];
  