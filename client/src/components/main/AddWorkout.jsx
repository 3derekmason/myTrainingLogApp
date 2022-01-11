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

  const [workoutDate, setWorkoutDate] = useState(new Date());
  const [workoutType, setWorkoutType] = useState("");
  const [exerciseOpen, setExerciseOpen] = useState(false);

  const handleExerciseOpen = () => setExerciseOpen(true);
  const handleExerciseClose = () => setExerciseOpen(false);

  const handleTypeChange = (e) => {
    e.preventDefault();
    setWorkoutType(e.target.value);
  };

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
        <div className="addWorkoutForm">
          <ReactDatePicker
            selected={workoutDate}
            onChange={(date) => setWorkoutDate(date)}
          />

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
            </Select>
            <FormHelperText>Training Style</FormHelperText>
          </FormControl>
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
            <Box className="addExerciseModal">
              <Typography id="exerciseModalTitle" variant="h6" component="h2">
                Add Exercise
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Add an exercise. Name, superset, sets, reps, and weight
              </Typography>
              <form style={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  id="exerciseName"
                  label="Exercise Name"
                  variant="standard"
                />
                <Typography element="h5" variant="caption">
                  Superset with previous?
                </Typography>
                <Checkbox aria-label="Checkbox demo" />
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
                </Card>
              </form>
            </Box>
          </Modal>
        </div>
        <div className="addWorkoutFoot"></div>
      </Card>
    </div>
  );
};

export default AddWorkout;
