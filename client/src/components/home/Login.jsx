import { Button, Card, Typography, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Login = () => {
  return (
    <div className="loginPage">
      <Card className="loginContainer">
        <div className="loginHead">
          <Typography component="h1" variant="h3">
            MTLA
          </Typography>
          <Typography component="h3" variant="h5">
            Log in to your log...
          </Typography>
        </div>
        <div className="loginForm">
          <form>
            <TextField
              required
              id="outlined-required"
              label="Username"
              defaultValue=""
              variant="outlined"
            />
            <TextField
              id="outlined-password-input"
              label="Password  *"
              type="password"
              autoComplete="current-password"
              variant="outlined"
            />
            <Typography component="h6" variant="caption">
              * required field
            </Typography>
            <Button variant="contained" color="primary" fullWidth>
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
