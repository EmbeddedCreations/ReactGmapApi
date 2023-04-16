import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Records from "./Records";
import React from 'react'

function Routerpage() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/Records"
            exact element={<Records/>}
          />
        </Routes>
      </Router>
    </div>
  )
}

export default Routerpage
