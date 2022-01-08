import { Button, Card, Link, TextField, Typography } from "@material-ui/core";
import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "../context.js";

const SignUp = () => {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const defaultValues = {
    username: "",
    password: "",
    confirmPassword: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValues.password !== formValues.confirmPassword) {
      alert("Passwords must match!");
      setFormValues(defaultValues);
      return;
    }
    const newUserData = {
      username: formValues.username,
      password: formValues.password,
    };
    fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
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
    <div className="signupPage">
      <Card className="loginContainer">
        <div className="signupHead">
          <Typography component="h2" variant="h3">
            Create A Profile
          </Typography>
        </div>
        <div className="loginForm">
          <form onSubmit={handleSubmit}>
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
              label="Password *"
              type="password"
              variant="outlined"
              value={formValues.password}
              onChange={handleInputChange}
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password  *"
              type="password"
              variant="outlined"
              value={formValues.confirmPassword}
              onChange={handleInputChange}
            />
            <Typography component="h6" variant="caption">
              * required field
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              type="submit"
            >
              Sign Up!
            </Button>
          </form>
        </div>
        <div className="loginFoot">
          <Typography component="h4" variant="caption">
            Already a user? Log in{" "}
            <Link href="/" variant="body2">
              here
            </Link>
            !
          </Typography>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
