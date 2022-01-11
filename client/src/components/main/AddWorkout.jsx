import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Card,
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

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
            <Box sx={modalStyle}>
              <Typography id="exerciseModalTitle" variant="h6" component="h2">
                Add Exercise
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Add an exercise. Name, superset, sets, reps, and weight
              </Typography>
            </Box>
          </Modal>
        </div>
        <div className="addWorkoutFoot"></div>
      </Card>
    </div>
  );
};

export default AddWorkout;
