import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./home/Landing.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
};

export default App;
