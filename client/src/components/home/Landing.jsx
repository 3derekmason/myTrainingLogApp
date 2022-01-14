import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  AppBar,
  Button,
  Card,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import AppContext from "../context.js";
import LastWorkout from "./LastWorkout.jsx";

const Landing = () => {
  const {
    currentUser,
    setCurrentUser,
    lastWorkout,
    setLastWorkout,
    userWorkouts,
    setUserWorkouts,
  } = React.useContext(AppContext);

  const [openUserLog, setOpenUserLog] = useState(false);
  const [currentDate, setCurrentDate] = useState(
    new Intl.DateTimeFormat("en-GB", {
      dateStyle: "full",
      timeStyle: "long",
    }).format(new Date())
  );

  const getWorkouts = (filterId) => {
    fetch(`/api/workouts/?userId=${filterId}`)
      .then((res) => res.json())
      .then((data) => {
        setUserWorkouts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLastWorkout = (filterId) => {
    fetch(`/api/recent/?userId=${filterId}`)
      .then((res) => res.json())
      .then((data) => {
        setLastWorkout(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setCurrentDate(currentDate?.split(" at ")[0]);
  }, []);

  useEffect(() => {
    getWorkouts(currentUser?.userId);
    getLastWorkout(currentUser?.userId);
    console.log(userWorkouts, lastWorkout);
  }, [currentUser]);

  if (!currentUser || currentUser.message) {
    return <Navigate to="/" />;
  }
  if (openUserLog) {
    return <Navigate to="/userlog" />;
  }
  if (!userWorkouts) {
    return (
      <div>
        <Paper>Grabbing Workouts...</Paper>
      </div>
    );
  }
  return (
    <div className="landingPage">
      <AppBar position="static">
        <Toolbar>
          <Typography element="h5" variant="h5">
            <FitnessCenterIcon></FitnessCenterIcon> MTLA
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
      <Card className="landingContainer">
        <div className="landingHead">
          <Typography element="h3" variant="h5">
            Welcome, {currentUser?.username}!
          </Typography>
          <Typography element="h5" variant="caption">
            {currentDate}
          </Typography>
        </div>
        <div className="landingPaths">
          <Button
            onClick={(e) => {
              e.preventDefault();
              setOpenUserLog(true);
            }}
          >
            USER LOG
          </Button>
          <Link to="/addworkout">
            <Button>ADD WORKOUT</Button>
          </Link>
        </div>
        <div className="landingFoot">
          <LastWorkout />
        </div>
      </Card>
    </div>
  );
};

export default Landing;
