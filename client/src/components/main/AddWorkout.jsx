import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Card,
  Checkbox,
  IconButton,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Toolbar,
  TextField,
  Typography,
} from "@material-ui/core";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ReactDatePicker from "react-datepicker";
import AppContext from "../context.js";

const AddWorkout = () => {
  const { currentUser, setCurrentUser, userWorkouts, setUserWorkouts } =
    React.useContext(AppContext);

  // properties to match database schema for post
  const [workoutDate, setWorkoutDate] = useState(new Date());
  const [workoutType, setWorkoutType] = useState("");

  // Construct each set for each exercise to be added
  const [newExerciseName, setNewExerciseName] = useState("");
  const [newExerciseSuperset, setNewExerciseSuperset] = useState(false);
  const [newSetReps, setNewSetReps] = useState("");
  const [newSetWeight, setNewSetWeight] = useState("");

  const [superset, setSuperset] = useState(false);
  const [newExerciseSets, setNewExerciseSets] = useState([]);
  const [exercises, setExercises] = useState([]);

  // Modal controls, helpers etc...
  const [exerciseOpen, setExerciseOpen] = useState(false);
  const handleExerciseOpen = () => setExerciseOpen(true);
  const handleExerciseClose = () => setExerciseOpen(false);

  const [afterSubmit, setAfterSubmit] = useState(false);
  const [navigateProfile, setNavigateProfile] = useState(false);

  const handleCheck = (e) => {
    e.preventDefault();
    setSuperset(e.target.checked);
  };

  const addNewSet = (e) => {
    e.preventDefault();

    const newSet = [Number(newSetReps), newSetWeight];
    const newSets = newExerciseSets;
    setNewSetReps("");
    setNewSetWeight("");
    if (newSet[0] === 0 || newSet[1] === 0) {
      alert("Please fill in both fields");
      return;
    }
    newSets.push(newSet);
    setNewExerciseSets(newSets);
  };

  const addExerciseToWorkout = (e) => {
    e.preventDefault();
    if (newExerciseSets.length === 0) {
      handleExerciseClose();
      return;
    }
    const newExercises = exercises;
    const exerciseToAdd = {
      [newExerciseName]: {
        sets: newExerciseSets,
        superset: superset,
      },
    };
    newExercises.push(exerciseToAdd);
    setExercises(newExercises);
    setNewExerciseName("");
    setNewExerciseSets([]);
    setSuperset(false);
    handleExerciseClose();
  };

  // Workout form helpers
  const handleSetRepsChange = (e) => {
    e.preventDefault();
    setNewSetReps(e.target.value);
  };

  const handleSetWeightChange = (e) => {
    e.preventDefault();
    setNewSetWeight(e.target.value);
  };

  const handleTypeChange = (e) => {
    e.preventDefault();
    setWorkoutType(e.target.value);
  };

  const navigateAfterSubmit = () => {
    setAfterSubmit(true);
  };

  const addWorkoutToLog = (e) => {
    e.preventDefault();
    if (exercises.length === 0) {
      navigateAfterSubmit();
      return;
    }
    const newWorkout = {
      userId: currentUser.userId,
      date: workoutDate,
      type: workoutType,
      exercises: exercises,
    };
    fetch("/api/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWorkout),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setWorkoutDate(new Date());
    setWorkoutType("");
    setExercises([]);
    navigateAfterSubmit();
  };

  if (!currentUser || currentUser.message) {
    return <Navigate to="/" />;
  }
  if (navigateProfile) {
    return <Navigate to="/profile" />;
  }
  if (afterSubmit) {
    return <Navigate to="/landing" />;
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
                setNavigateProfile(true);
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
        <Card className="addWorkoutContainer">
          <div className="landingHead">
            <Link
              to="/landing"
              style={{ textDecoration: "none", marginBottom: "24px" }}
            >
              <Button color="primary">BACK TO HOME</Button>
            </Link>
            <Card
              style={{
                width: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#ededdd",
              }}
            >
              <Typography component="h3" variant="h5">
                Add a new workout!
              </Typography>
            </Card>
          </div>
          {/* * * * * * SET WORKOUT DATE * * * * */}
          <div className="addWorkoutForm">
            <Typography element="p" variant="caption">
              Select date and training style of workout:
            </Typography>
            <ReactDatePicker
              selected={workoutDate}
              onChange={(date) => setWorkoutDate(date)}
            />
            {/* * * * * * SET WORKOUT TYPE * * * * */}
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                labelId="typeLabel"
                id="typeSelector"
                value={workoutType}
                label="Type"
                onChange={handleTypeChange}
              >
                <MenuItem value={"push"}>Push</MenuItem>
                <MenuItem value={"pull"}>Pull</MenuItem>
                <MenuItem value={"core"}>Core</MenuItem>
                <MenuItem value={"mobility"}>Mobility</MenuItem>
                <MenuItem value={"stability"}>Stability</MenuItem>
                <MenuItem value={"cardio"}>Cardio</MenuItem>
              </Select>
              <FormHelperText>Choose Training Style</FormHelperText>
            </FormControl>
            {/* * * * * ADD EACH EXERCISE * * * * */}
            <div className="addExerciseHead">
              <div>
                <Typography element="h4" variant="h5">
                  Exercises:
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button className="addIcon" onClick={handleExerciseOpen}>
                  <Typography element="h4" color="secondary" variant="caption">
                    Add new:
                  </Typography>
                  <AddBoxIcon color="secondary" />
                </Button>
              </div>
            </div>
            <div className="newExerciseContainer">
              {exercises.map((exercise, i) => {
                return (
                  <Card className="newExercise" key={i}>
                    <Typography element="h4" variant="button">
                      {Object.keys(exercise)[0]}
                    </Typography>
                    <Typography element="h4" variant="caption">
                      {exercise[Object.keys(exercise)[0]].sets}
                    </Typography>
                    <Typography element="h4" variant="button">
                      {JSON.stringify(
                        exercise[Object.keys(exercise)[0]].superset
                      )}
                    </Typography>
                  </Card>
                );
              })}
            </div>
            <Modal
              open={exerciseOpen}
              onClose={handleExerciseClose}
              aria-labelledby="addExerciseModal"
            >
              {/* * * * * * * MODAL FOR EXERCISE * * * * * */}
              <Box className="addExerciseModal">
                <Typography
                  style={{ marginTop: "24px" }}
                  id="exerciseModalTitle"
                  color="secondary"
                  variant="h6"
                  component="h2"
                >
                  Add a new exercise to workout
                </Typography>
                <form
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    id="exerciseName"
                    label="Exercise Name"
                    variant="standard"
                    style={{ width: "90%" }}
                    value={newExerciseName}
                    onChange={(e) => {
                      e.preventDefault();
                      setNewExerciseName(e.target.value);
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Typography element="h5" variant="caption">
                      Superset with previous?
                    </Typography>
                    <Checkbox
                      checked={superset}
                      onChange={handleCheck}
                      aria-label="superset"
                    />
                  </div>
                  <Card className="exerciseSetsCard">
                    <div className="cardHead">
                      <Typography element="h3" variant="subtitle1">
                        Set
                      </Typography>
                      <Typography element="h3" variant="subtitle1">
                        Reps
                      </Typography>
                      <Typography element="h3" variant="subtitle1">
                        Weight
                      </Typography>
                    </div>
                    {newExerciseSets.map((newSet, i) => {
                      return (
                        <div className="cardHead" key={i}>
                          <Typography element="h4" variant="h5">
                            {i + 1}
                          </Typography>
                          <Typography element="h4" variant="h5">
                            {newSet[0]}
                          </Typography>
                          <Typography element="h4" variant="h5">
                            {newSet[1]}
                          </Typography>
                        </div>
                      );
                    })}
                    <div className="cardHead">
                      <Typography element="h3" variant="h4" color="secondary">
                        {newExerciseSets.length + 1}
                      </Typography>
                      <TextField
                        id="newSetReps"
                        variant="outlined"
                        className="setRW"
                        value={newSetReps}
                        onChange={handleSetRepsChange}
                      />
                      <TextField
                        id="newSetWeight"
                        variant="outlined"
                        className="setRW"
                        value={newSetWeight}
                        onChange={handleSetWeightChange}
                      />
                    </div>

                    <Button color="secondary" onClick={addNewSet}>
                      Add Set
                    </Button>
                  </Card>
                  <Button
                    variant="outlined"
                    color="secondary"
                    style={{ marginBottom: "24px" }}
                    onClick={addExerciseToWorkout}
                  >
                    Add Exercise
                  </Button>
                </form>
              </Box>
            </Modal>
            <Button
              variant="contained"
              color="secondary"
              onClick={addWorkoutToLog}
              style={{ width: "50%" }}
            >
              LOG
            </Button>
          </div>
          <div className="addWorkoutFoot"></div>
        </Card>
      </div>
    </div>
  );
};

export default AddWorkout;
