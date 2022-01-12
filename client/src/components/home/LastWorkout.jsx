import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Button, Card, Paper, Typography } from "@material-ui/core";
import AppContext from "../context.js";

const LastWorkout = () => {
  const { currentUser, setCurrentUser, userWorkouts, setUserWorkouts } =
    React.useContext(AppContext);

  const [lastWorkout, setLastWorkout] = useState();

  const getLastWorkout = (filterId) => {
    fetch(`/api/recent/?userId=${filterId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLastWorkout(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getLastWorkout(currentUser.userId);
  }, [currentUser, userWorkouts]);

  if (!currentUser || currentUser.message) {
    return <Navigate to="/" />;
  }

  return (
    <div className="workoutSummary">
      <Paper>
        Most recent Workout:
        <Typography element="h2" variant="subtitle1">
          {lastWorkout?.date}
        </Typography>
        <Typography element="h2" variant="subtitle2">
          {lastWorkout?.type}
        </Typography>
        <Typography element="h2" variant="button">
          {JSON.stringify(lastWorkout?.exercises)}
        </Typography>
      </Paper>
    </div>
  );
};

export default LastWorkout;
