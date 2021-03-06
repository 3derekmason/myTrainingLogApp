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
    const newUserMaxObject = userMaxObject?.["bigFive"]
      ? userMaxObject?.["bigFive"]
      : defaultValues;
    bigFive.forEach((lift) => {
      if (!userMaxObject?.["bigFive"]?.[lift]) {
        newUserMaxObject[lift] = 0;
      }
      if (formValues[lift] !== "") {
        newUserMaxObject[lift] = Number(formValues[lift]);
      }
    });
    return newUserMaxObject;
  };

  const updateUserMaxCollection = (e) => {
    e.preventDefault();
    const newMaxCollection = buildNewUserMaxObject(formValues);
    fetch("/api/profileMax/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: Number(currentUser.userId),
        newBigFive: newMaxCollection,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    fetch(`/api/profileMax/?userId=${currentUser?.userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUserMaxObject(data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    maxModalClose();
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
      <div className="profilePage">
        <Paper className="loginContainer" elevation={8}>
          <div className="profilePageHead">
            <Typography element="h4" variant="h4">
              {currentUser?.username}
            </Typography>
            <div style={{ display: "flex", gap: "8px" }}>
              <Button
                color="primary"
                variant="outlined"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenUserLog(true);
                }}
              >
                User Log
              </Button>
              <Button color="primary" variant="outlined">
                This Week
              </Button>
              <Link to="/addworkout" style={{ textDecoration: "none" }}>
                <Button variant="outlined" color="secondary">
                  ADD WORKOUT
                </Button>
              </Link>
            </div>
          </div>
          <Card className="userTotalWorkouts" style={{ background: "#efebe9" }}>
            <Typography
              color="secondary"
              style={{ fontSize: growCount, fontWeight: "bold" }}
            >
              {userWorkouts?.length}
            </Typography>
            <Typography element="h5" variant="caption">
              workouts logged since joining.
            </Typography>
          </Card>
          <div className="profileMax">
            <Card
              style={{
                width: "95%",
                height: "32px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderBottom: "1px solid #517AAC",
              }}
            >
              <Typography
                element="p"
                variant="body1"
                style={{ color: "#000000", fontVariant: "small-caps" }}
              >
                track your 1RM:
              </Typography>
            </Card>
            <Typography element="p" variant="caption">
              Click on any current one-rep max to edit.
            </Typography>
            <Card className="maxContainer" style={{ background: "#efebe9" }}>
              {bigFive.map((lift, i) => {
                if (!userMaxObject?.["bigFive"]?.[lift]) {
                  return (
                    <div key={i} className="bigFiveRow">
                      <Typography element="h6" variant="subtitle1">
                        {lift.toUpperCase()}
                      </Typography>
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={(e) => {
                          e.preventDefault();
                          setMaxModalOpen(true);
                        }}
                      >
                        0
                      </Button>
                    </div>
                  );
                } else {
                  return (
                    <div key={i} className="bigFiveRow">
                      <Typography element="h6" variant="subtitle1">
                        {lift.toUpperCase()}
                      </Typography>
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={(e) => {
                          e.preventDefault();
                          setMaxModalOpen(true);
                        }}
                      >
                        {userMaxObject?.["bigFive"]?.[lift]}
                      </Button>
                    </div>
                  );
                }
              })}
            </Card>
            <Modal
              open={maxModalOpen}
              onClose={maxModalClose}
              aria-labelledby="newMaxModal"
              className="newMaxModal"
            >
              <Paper className="newMaxModalContainer">
                <Typography
                  id="newMaxModalTitle"
                  variant="h6"
                  component="h2"
                  style={{ marginTop: "24px" }}
                >
                  Congrats, {currentUser.username}!
                </Typography>
                <Typography component="p" variant="caption">
                  Enter your new 1RM below:
                </Typography>
                {bigFive.map((lift, i) => {
                  return (
                    <div key={i}>
                      <TextField
                        id="newMaxWeight"
                        name={lift}
                        label={lift.toUpperCase()}
                        variant="outlined"
                        style={{ width: "100%" }}
                        value={formValues[lift]}
                        placeholder={
                          JSON.stringify(userMaxObject?.["bigFive"]?.[lift]) ||
                          "0"
                        }
                        onChange={handleNewMaxChange}
                      />
                    </div>
                  );
                })}
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginBottom: "16px" }}
                  onClick={updateUserMaxCollection}
                >
                  UPDATE
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
