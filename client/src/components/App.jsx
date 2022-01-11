import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./home/Landing.jsx";
import Login from "./home/Login.jsx";
import SignUp from "./home/SignUp.jsx";
import UserLog from "./user/UserLog.jsx";

import AppContext from "./context.js";
import AddWorkout from "./main/AddWorkout.jsx";

const App = () => {
  const [currentUser, setCurrentUser] = useState();
  const [userWorkouts, setUserWorkouts] = useState();
  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userWorkouts,
        setUserWorkouts,
      }}
    >
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/userlog" element={<UserLog />} />
          <Route path="/addworkout" element={<AddWorkout />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
