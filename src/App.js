import React from "react";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Signup from "./Pages/Signup/Signup";
import Signin from "./Pages/Signin/Signin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
  <Router>
    <Routes>
      <Route exact path="/" element={<Dashboard />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/signin" element={<Signin />} />
    </Routes>
  </Router>
  );
};

export default App;
