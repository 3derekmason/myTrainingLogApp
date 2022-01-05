import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const Landing = () => {
  return (
    <div>
      <div>TRAINING LOG APP</div>
      <Link to="/login" style={{ textDecoration: "none" }}>
        <Button size="large">Log In</Button>
      </Link>
      <Link to="/signup" style={{ textDecoration: "none" }}>
        <Button size="large">Sign Up</Button>
      </Link>
    </div>
  );
};

export default Landing;
