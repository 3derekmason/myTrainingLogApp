import { Container, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Login = () => {
  return (
    <div className="loginPage">
      <Container>
        <div className="loginHead"></div>
        <div className="loginForm"></div>
        <div className="loginFoot">
          <Typography component="h4" variant="caption">
            Not a user? Sign up{" "}
            <Link to="/signup" variant="body2">
              here
            </Link>
            !
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default Login;
