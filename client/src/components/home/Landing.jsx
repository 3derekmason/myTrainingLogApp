import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import AppContext from "../context.js";

const Landing = () => {
  const { currentUser } = React.useContext(AppContext);
  return (
    <div>
      <div>TRAINING LOG APP</div>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button size="large">Log In</Button>
      </Link>
      <Link to="/signup" style={{ textDecoration: "none" }}>
        <Button size="large">Sign Up</Button>
      </Link>
      <Button
        onClick={(e) => {
          e.preventDefault();
          console.log(currentUser);
        }}
      >
        Test
      </Button>
    </div>
  );
};

export default Landing;
