import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AppBar, Button, Card, Toolbar, Typography } from "@material-ui/core";
import AppContext from "../context.js";

const UserLog = () => {
  const { currentUser, setCurrentUser, userWorkouts, setUserWorkouts } =
    React.useContext(AppContext);
  const [openUserLog, setOpenUserLog] = useState(false);

  useEffect(() => {}, [currentUser]);

  if (!currentUser || currentUser.message) {
    return <Navigate to="/" />;
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
    </div>
  );
};

export default UserLog;
