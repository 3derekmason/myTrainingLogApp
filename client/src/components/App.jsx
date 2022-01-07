import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./home/Landing.jsx";
import Login from "./home/Login.jsx";
import SignUp from "./home/SignUp.jsx";

import AppContext from "./context.js";

const App = () => {
  const [currentUser, setCurrentUser] = useState();
  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
