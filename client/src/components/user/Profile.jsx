import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Card,
  Container,
  IconButton,
  FormControl,
  FormHelperText,
  InputLabel,
  Modal,
  Paper,
  Select,
  Toolbar,
  TextField,
  Typography,
} from "@material-ui/core";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import AppContext from "../context.js";

const bigFive = [
  "back squat",
  "deadlift",
  "bench press",
  "overhead press",
  "pendlay row",
];
const defaultValues = {
  "back squat": "",
  deadlift: "",
  "bench press": "",
  "overhead press": "",
  "pendlay row": "",
};

const Profile = () => {
  const { currentUser, setCurrentUser, userWorkouts } =
    React.useContext(AppContext);
  const [openUserLog, setOpenUserLog] = useState(false);
  const [maxModalOpen, setMaxModalOpen] = useState(false);
  const maxModalClose = () => setMaxModalOpen(false);
  const [growCount, setGrowCount] = useState("16px");
  const [userMaxObject, setUserMaxObject] = useState({});
  const [formValues, setFormValues] = useState(defaultValues);

  const handleNewMaxChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const buildNewUserMaxObject = (formValuesObject) => {
    const newUserMaxObject = userMaxObject;
    bigFive.forEach((lift) => {
      if (formValues[lift] !== "") {
        newUserMaxObject[lift] = Number(formValues[lift]);
      }
      if (!userMaxObject[lift]) {
        newUserMaxObject[lift] = 0;
      }
    });
    return newUserMaxObject;
  };

  useEffect(() => {
    if (currentUser) {
      fetch(`/api/profileMax/?userId=${currentUser?.userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUserMaxObject(data[0]);
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
            <Typography color="primary" element="h5" variant="caption">
              workouts logged since joining.
            </Typography>
          </Card>
          <div className="profileMax">
            <Typography element="p" variant="subtitle1">
              Track your 1 Rep Max for the Big 5:
            </Typography>
            {bigFive.map((lift, i) => {
              if (!userMaxObject[lift]) {
                return (
                  <Card key={i}>
                    <Typography element="h6" variant="subtitle1">
                      {lift.toUpperCase()}
                    </Typography>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        setMaxModalOpen(true);
                      }}
                    >
                      0
                    </Button>
                  </Card>
                );
              } else {
                return (
                  <Card key={i}>
                    <Typography element="h6" variant="subtitle1">
                      {lift.toUpperCase()}
                    </Typography>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        setMaxModalOpen(true);
                      }}
                    >
                      {userMaxObject[lift]}
                    </Button>
                  </Card>
                );
              }
            })}
            <Modal
              open={maxModalOpen}
              onClose={maxModalClose}
              aria-labelledby="newMaxModal"
            >
              <Paper className="newMaxModal">
                <Typography
                  id="newMaxModalTitle"
                  color="primary"
                  variant="h6"
                  component="h2"
                >
                  Congrats! Enter your new 1RM below:
                </Typography>
                {bigFive.map((lift, i) => {
                  return (
                    <div key={i}>
                      <TextField
                        id="newMaxWeight"
                        name={lift}
                        label={lift.toUpperCase()}
                        variant="standard"
                        value={formValues[lift]}
                        placeholder={JSON.stringify(userMaxObject[lift]) || "0"}
                        onChange={handleNewMaxChange}
                      />
                    </div>
                  );
                })}
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(userMaxObject);

                    console.log(buildNewUserMaxObject(formValues));
                  }}
                >
                  USER MAX OBJECT
                </Button>
              </Paper>
            </Modal>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default Profile;
