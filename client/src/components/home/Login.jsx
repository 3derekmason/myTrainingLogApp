import { Button, Card, Typography, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Login = () => {
  const defaultValues = {
    username: "",
    pin: "",
  };

  const [formValues, setFormValues] = useState(defaultValues);

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
      pin: formValues.pin,
    };
    console.log(user);
  };

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
              name="pin"
              label="Pin  *"
              type="password"
              variant="outlined"
              value={formValues.pin}
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
