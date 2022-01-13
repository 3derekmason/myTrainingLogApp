import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Button, Card, Paper, Typography } from "@material-ui/core";
import AppContext from "../context.js";

const LastWorkout = () => {
  const { currentUser, lastWorkout } = React.useContext(AppContext);

  if (!currentUser || currentUser.message) {
    return <Navigate to="/" />;
  }

  return (
    <div className="workoutSummary">
      <Paper>
        Most recent Workout:
        <Typography element="h6" variant="caption">
          {JSON.stringify(lastWorkout[0]?.date)}
          {JSON.stringify(lastWorkout[0]?.type)}
          {JSON.stringify(lastWorkout[0]?.exercises)}
        </Typography>
      </Paper>
    </div>
  );
};

export default LastWorkout;
