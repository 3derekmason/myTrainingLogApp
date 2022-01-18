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
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import AppContext from "../context.js";

const Profile = () => {
  const { currentUser, setCurrentUser, userWorkouts } =
    React.useContext(AppContext);
  const [openUserLog, setOpenUserLog] = useState(false);
  const [growCount, setGrowCount] = useState("16px");
  const [userMaxObject, setUserMaxObject] = useState({});

  useEffect(() => {
    if (currentUser) {
      fetch(`/api/profileMax/?userId=${currentUser?.userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUserMaxObject(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userMaxObject]);

  useEffect(() => {
    if (userWorkouts?.length < 16) {
      setGrowCount("16px");
    } else if (userWorkouts?.length > 100) {
      setGrowCount("100px");
    } else {
      setGrowCount(userWorkouts?.length);
    }
  }, [userWorkouts]);

  if (!currentUser || currentUser.message) {
    return <Navigate to="/" />;
  }
  if (openUserLog) {
    return <Navigate to="/userlog" />;
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar className="appbar">
          <Link
            to="/landing"
            style={{ textDecoration: "none", color: "#ffffff" }}
          >
            <Typography className="appbarButton" element="h5" variant="h5">
              <FitnessCenterIcon /> MTLA
            </Typography>
          </Link>
          <div>
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
        <Paper className="loginContainer" elevation={8}>
          <div className="profilePageHead">
            <Typography color="primary" element="h4" variant="subtitle2">
              {currentUser?.username}
            </Typography>
            <div style={{ display: "flex", gap: "8px" }}>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setOpenUserLog(true);
                }}
              >
                User Log
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  console.log(userMaxObject);
                }}
              >
                This Week
              </Button>
            </div>
          </div>
          <Card className="userTotalWorkouts">
            <Typography
              color="secondary"
              style={{ fontSize: growCount, fontWeight: "bold" }}
            >
              {userWorkouts?.length}
            </Typography>
            <Typography color="primary" element="h5" variant="body2">
              workouts logged since joining.
            </Typography>
          </Card>
          <div className="profileMax"></div>
        </Paper>
      </div>
    </div>
  );
};

export default Profile;
