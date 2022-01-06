import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./home/Landing.jsx";
import Login from "./home/Login.jsx";
import SignUp from "./home/SignUp.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </Router>
  );
};

export default App;
