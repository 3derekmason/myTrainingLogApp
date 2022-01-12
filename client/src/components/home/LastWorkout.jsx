import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  AppBar,
  Button,
  Card,
  Container,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import AppContext from "../context.js";

const LastWorkout = () => {
  const { currentUser, setCurrentUser, userWorkouts, setUserWorkouts } =
    React.useContext(AppContext);

  const [lastWorkout, setLastWorkout] = useState();

  const getLastWorkout = (filterId) => {
    fetch(`/api/recent/?userId=${filterId}`)
      .then((res) => res.json())
      .then((data) => {
        setLastWorkout(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!currentUser || currentUser.message) {
    return <Navigate to="/" />;
  }

  return (
    <div className="workoutSummary">
      <Paper></Paper>
    </div>
  );
};

export default LastWorkout;
