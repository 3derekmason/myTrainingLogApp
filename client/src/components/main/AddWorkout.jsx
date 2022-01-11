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
  const [newSetReps, setNewSetReps] = useState("");
  const [newSetWeight, setNewSetWeight] = useState("");
  const [newExerciseSets, setNewExerciseSets] = useState([]);

  // Modal controls, helpers etc...
  const [exerciseOpen, setExerciseOpen] = useState(false);
  const handleExerciseOpen = () => setExerciseOpen(true);
  const handleExerciseClose = () => setExerciseOpen(false);

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

    console.log(newExerciseSets);
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

  // Update add sets modal with number of sets stored
  useEffect(() => {}, [newExerciseSets]);

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
                  <Checkbox aria-label="superset" />
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
                >
                  Add Exercise
                </Button>
              </form>
            </Box>
          </Modal>
          <Button fullWidth>ADD TO LOG</Button>
        </div>
        <div className="addWorkoutFoot"></div>
      </Card>
    </div>
  );
};

export default AddWorkout;
