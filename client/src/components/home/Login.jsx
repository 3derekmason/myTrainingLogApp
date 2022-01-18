import { Button, Card, Typography, TextField } from "@material-ui/core";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import AppContext from "../context.js";

const Login = () => {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const defaultValues = {
    username: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(defaultValues);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      username: formValues.username,
      password: formValues.password,
    };
    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentUser(data);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setFormValues(defaultValues);
  };

  if (loggedIn) {
    return <Navigate to="/landing" />;
  }

  return (
    <div className="loginPage">
      <Card className="loginContainer">
        <div className="loginHead">
          <Typography component="h3" variant="h5">
            My Training Log App
          </Typography>
          <FitnessCenterIcon color="primary" style={{ fontSize: "64px" }} />
          <Typography component="h3" variant="subtitle1">
            Log in to your log...
          </Typography>
        </div>
        <div className="loginForm">
          <form onSubmit={handleLogin}>
            <TextField
              required
              id="username"
              name="username"
              label="Username"
              variant="outlined"
              value={formValues.username}
              onChange={handleInputChange}
            />
            <TextField
              id="password"
              name="password"
              label="Password  *"
              type="password"
              variant="outlined"
              value={formValues.password}
              onChange={handleInputChange}
            />
            <Typography component="h6" variant="caption">
              * required field
            </Typography>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Log In
            </Button>
          </form>
        </div>
        <div className="loginFoot">
          <Typography component="h4" variant="caption">
            Not a user? Sign up{" "}
            <Link to="/signup" variant="body2">
              here
            </Link>
            !
          </Typography>
        </div>
      </Card>
    </div>
  );
};

export default Login;
