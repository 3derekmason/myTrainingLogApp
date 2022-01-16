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

const UserLog = () => {
  const { currentUser, setCurrentUser, userWorkouts, setUserWorkouts } =
    React.useContext(AppContext);
  const [openUserLog, setOpenUserLog] = useState(false);

  useEffect(() => {}, [currentUser]);

  if (!currentUser || currentUser.message) {
    return <Navigate to="/" />;
  }
  if (!userWorkouts) {
    return (
      <div>Something went wrong, or you have not logged any workouts!</div>
    );
  }
  return (
    <div>
      <AppBar position="static">
        <Toolbar className="appbar">
          <Link
            to="/landing"
            style={{ textDecoration: "none", color: "#ffffff" }}
          >
            <Typography element="h5" variant="h5">
              <FitnessCenterIcon /> MTLA
            </Typography>
          </Link>
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
      <div className="userLogPage">
        <Paper className="userLogContainer">
          <div className="userLogTopBar">
            <Typography element="h3" variand="h3">
              {currentUser?.username}'s Log
            </Typography>
          </div>

          {/* Begin Triple Map */}
          {userWorkouts?.map((workout, i) => {
            let splitDate = workout?.date?.split("T")[0];
            let formatDate = splitDate?.split("-");
            return (
              <Card className="workoutLogCard" key={i}>
                <div className="logCardLeft">
                  <Typography element="h5" variant="h5">
                    {`${formatDate[1]}-${formatDate[2]}-${formatDate[0]}`}
                  </Typography>
                  <Typography element="h5" variant="subtitle1">
                    {workout?.type}
                  </Typography>
                </div>
                <div className="logCardRight">
                  {workout?.exercises.map((exercise, i) => {
                    return (
                      <div className="logExercise" key={i}>
                        <Typography element="h6" variant="h6">
                          {Object.keys(exercise)[0]}
                        </Typography>
                        <ul>
                          {exercise[Object.keys(exercise)[0]].sets.map(
                            (set, i) => {
                              return (
                                <li key={i}>
                                  {set[0]} reps at {set[1]}
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </Paper>
      </div>
    </div>
  );
};

export default UserLog;
