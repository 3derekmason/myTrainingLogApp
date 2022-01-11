import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AppBar, Button, Card, Toolbar, Typography } from "@material-ui/core";
import AppContext from "../context.js";

const AddWorkout = () => {
  const { currentUser, setCurrentUser, userWorkouts, setUserWorkouts } =
    React.useContext(AppContext);
  const [currentDate, setCurrentDate] = useState(
    new Intl.DateTimeFormat("en-GB", {
      dateStyle: "full",
      timeStyle: "long",
    }).format(new Date())
  );

  if (!currentUser || currentUser.message) {
    return <Navigate to="/" />;
  }

  return (
    <div className="landingPage">
      <AppBar position="static">
        <Toolbar>
          <Typography element="h5" variant="h5">
            [] MTLA
          </Typography>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setCurrentUser(null);
            }}
          >
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
      <Card className="addWorkoutContainer">
        <div className="landingHead">
          <Typography element="h3" variant="h5">
            Log a workout!
          </Typography>
        </div>
        <div className="addWorkoutForm"></div>
        <div className="addWorkoutFoot"></div>
      </Card>
    </div>
  );
};

export default AddWorkout;
