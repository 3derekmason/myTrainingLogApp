import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  AppBar,
  Button,
  Card,
  Container,
  Toolbar,
  Typography,
} from "@material-ui/core";
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
    <div className="userLogPage">
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
      <Container maxWidth="sm">
        <div className="userLogTopBar"></div>
        {userWorkouts?.map((workout, i) => {
          return (
            <Card key={i}>
              {workout?.date}
              {workout?.type}
              {Object.keys(workout?.exercises).map((exercise, i) => {
                return (
                  <div className="logExercise" key={i}>
                    {exercise}
                    <ul>
                      {workout.exercises[exercise].sets.map((set, i) => {
                        return (
                          <li key={i}>
                            {set[0]} reps at {set[1]}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </Card>
          );
        })}
      </Container>
    </div>
  );
};

export default UserLog;
