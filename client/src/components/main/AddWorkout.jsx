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
            <Button variant="text">Add</Button>
          </div>
        </div>
        <div className="addWorkoutFoot"></div>
      </Card>
    </div>
  );
};

export default AddWorkout;
