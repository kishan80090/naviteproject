import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompanyAssignment from "./component/CompanyAssinment"; 
import Wellcomepage from "./component/Wellcomepage";      

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CompanyAssignment />} />
        <Route path="/welcome" element={<Wellcomepage />} />
      </Routes>
    </Router>
  );
}

export default App;
