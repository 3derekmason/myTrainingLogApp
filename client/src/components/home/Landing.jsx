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
    <div>
      <AppBar position="static">
        <Toolbar className="appbar">
          <Typography className="appbarButton" element="h5" variant="h5">
            <FitnessCenterIcon /> MTLA
          </Typography>
          <div>
            <Button
              className="appbarButton"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              PROFILE
            </Button>
            <Button
              className="appbarButton"
              onClick={(e) => {
                e.preventDefault();
                setCurrentUser(null);
              }}
            >
              LOGOUT
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <div className="landingPage">
        <Card className="landingContainer">
          <div className="landingHead">
            <Typography
              element="h3"
              variant="h5"
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                color: "#3e2723",
              }}
            >
              Welcome,{" "}
              <div style={{ letterSpacing: "2px" }} color="primary">
                {currentUser?.username}
              </div>
              !
            </Typography>
            <Typography
              style={{ marginTop: "16px", color: "#827717" }}
              element="h4"
              variant="caption"
            >
              {currentDate}
            </Typography>
          </div>
          <div className="landingPaths">
            <Button
              onClick={(e) => {
                e.preventDefault();
                setOpenUserLog(true);
              }}
              color="primary"
            >
              USER LOG
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
              }}
              color="primary"
            >
              THIS WEEK
            </Button>
            <Link to="/addworkout" style={{ textDecoration: "none" }}>
              <Button color="secondary">ADD WORKOUT</Button>
            </Link>
          </div>
          <LastWorkout />
        </Card>
      </div>
    </div>
  );
};

export default Landing;
