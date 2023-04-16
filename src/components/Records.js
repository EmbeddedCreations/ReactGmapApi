import React from "react";

function Records() {
  const data = [
    { id: 1, name: "John", age: 25, city: "New York", country: "USA" },
    { id: 2, name: "Jane", age: 30, city: "Paris", country: "France" },
    { id: 3, name: "Bob", age: 35, city: "London", country: "UK" },
    { id: 4, name: "Alice", age: 40, city: "Tokyo", country: "Japan" },
  ];

  const columns = [
    { title: "ID", field: "id" },
    { title: "Name", field: "name" },
    { title: "Age", field: "age" },
    { title: "City", field: "city" },
    { title: "Country", field: "country" },
  ];

  return (
    <div>
      <h1>Records Table</h1>
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
                <td key={`${row.id}-${column.field}`}>{row[column.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Records;
