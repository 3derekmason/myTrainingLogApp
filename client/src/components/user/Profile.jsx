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
  const { currentUser, setCurrentUser } = React.useContext(AppContext);

  if (!currentUser || currentUser.message) {
    return <Navigate to="/" />;
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
      <div className="profilePage">
        <Paper className="profileContainer" elevation={8}>
          {currentUser?.username}
        </Paper>
      </div>
    </div>
  );
};

export default Profile;
