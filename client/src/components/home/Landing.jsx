import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AppBar, Button, Card, Toolbar, Typography } from "@material-ui/core";
import AppContext from "../context.js";

const getMonth = (month) => {
  const months = {
    Jan: "January",
    Feb: "February",
    Mar: "March",
    Apr: "April",
    May: "May",
    Jun: "June",
    Jul: "July",
    Aug: "August",
    Sep: "September",
    Oct: "October",
    Nov: "November",
    Dec: "December",
  };
  return months[month];
};

const getDayOfWeek = (day) => {
  const days = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday",
  };

  return days[day];
};

const makeDatePretty = (splitDate) => {
  const dayOfWeek = getDayOfWeek(splitDate[0]);
  const month = getMonth(splitDate[1]);
  const day = splitDate[2];
  const year = splitDate[3];

  return `${dayOfWeek}, ${day} ${month} ${year}`;
};

const Landing = () => {
  const { currentUser, setCurrentUser } = React.useContext(AppContext);
  const [currentDate, setCurrentDate] = useState(new Date().toString());
  const [prettyDate, setPrettyDate] = useState(
    makeDatePretty(currentDate.split(" "))
  );

  useEffect(() => {
    if (!currentDate) {
      console.log("nope");
    }

    console.log(prettyDate);
  }, [currentUser, currentDate]);

  if (!currentUser) {
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
          <Typography element="h5" variant="caption"></Typography>
        </div>
        <div className="landingPaths"></div>
        <div className="landingFoot"></div>
      </Card>
    </div>
  );
};

export default Landing;
