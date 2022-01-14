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

  const handleCheck = (e) => {
    e.preventDefault();
    setSuperset(e.target.checked);
  };

  const addNewSet = (e) => {
    e.preventDefault();
    const newSet = [Number(newSetReps), Number(newSetWeight)];
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

  const handleSetRepsChange = (e) => {
    e.preventDefault();
    setNewSetReps(e.target.value);
  };
  const handleSetWeightChange = (e) => {
    e.preventDefault();
    setNewSetWeight(e.target.value);
  };
  // Workout form helpers

  const handleTypeChange = (e) => {
    e.preventDefault();
    setWorkoutType(e.target.value);
  };

  const navigateAfterSubmit = () => {
    setAfterSubmit(true);
  };

  const addWorkoutToLog = (e) => {
    e.preventDefault();
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

  // Update add sets modal with number of sets stored
  useEffect(() => {}, [newExerciseSets, exercises]);

  if (!currentUser || currentUser.message) {
    return <Navigate to="/" />;
  }
  if (afterSubmit) {
    return <Navigate to="/landing" />;
  }

  return (
    <div className="landingPage">
      <AppBar position="static">
        <Toolbar>
          <Link
            to="/landing"
            style={{ textDecoration: "none", color: "#ffffff" }}
          >
            <Typography element="h5" variant="h5">
              [] MTLA
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
      <Card className="addWorkoutContainer">
        <div className="landingHead">
          <Typography element="h3" variant="h5">
            Log a workout!
          </Typography>
        </div>
        {/* * * * * * SET WORKOUT DATE * * * * */}
        <div className="addWorkoutForm">
          <ReactDatePicker
            selected={workoutDate}
            onChange={(date) => setWorkoutDate(date)}
          />
          {/* * * * * * SET WORKOUT TYPE * * * * */}
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="typeLabel">Type</InputLabel>
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
              <MenuItem value={"mob"}>Mobility</MenuItem>
              <MenuItem value={"stab"}>Stability</MenuItem>
              <MenuItem value={"cardio"}>Cardio</MenuItem>
            </Select>
            <FormHelperText>Training Style</FormHelperText>
          </FormControl>
          {/* * * * * ADD EACH EXERCISE * * * * */}
          <div className="addExerciseHead">
            <Typography element="h4" variant="h5">
              Exercises:
            </Typography>
            <Button variant="text" onClick={handleExerciseOpen}>
              Add
            </Button>
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
              <Typography id="exerciseModalTitle" variant="h6" component="h2">
                Add Exercise
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
                        <Typography element="h4" variant="h5" color="primary">
                          {i + 1}
                        </Typography>
                        <Typography element="h4" variant="h5" color="primary">
                          {newSet[0]}
                        </Typography>
                        <Typography element="h4" variant="h5" color="primary">
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

                  <Button onClick={addNewSet}>Add Set</Button>
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
          <Button fullWidth onClick={addWorkoutToLog}>
            ADD TO LOG
          </Button>
        </div>
        <div className="addWorkoutFoot"></div>
      </Card>
    </div>
  );
};

export default AddWorkout;
