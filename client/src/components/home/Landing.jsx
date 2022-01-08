import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AppBar, Button, Card, Toolbar, Typography } from "@material-ui/core";
import AppContext from "../context.js";

const Landing = () => {
  const { currentUser, setCurrentUser } = React.useContext(AppContext);
  const [userWorkouts, setUserWorkouts] = useState();
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

  useEffect(() => {
    if (!currentDate || !currentUser) {
      console.log("nope");
    }
    getWorkouts(currentUser.userId);
    setCurrentDate(currentDate.split(" at ")[0]);
  }, [currentUser, currentDate]);

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
      <Card className="landingContainer">
        <div className="landingHead">
          <Typography element="h3" variant="h5">
            Welcome, {currentUser.username}!
          </Typography>
          <Typography element="h5" variant="caption">
            {currentDate}
          </Typography>
        </div>
        <div className="landingPaths">
          <Button
            onClick={(e) => {
              e.preventDefault();
              console.log(userWorkouts);
            }}
          >
            TESTING
          </Button>
        </div>
        <div className="landingFoot"></div>
      </Card>
    </div>
  );
};

export default Landing;
