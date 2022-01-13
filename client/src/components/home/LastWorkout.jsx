import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AppContext from "../context.js";

const LastWorkout = () => {
  const { currentUser, lastWorkout } = useContext(AppContext);
  const [expanded, setExpanded] = useState(false);

  const expandStyle = {
    transform: "rotate(180deg)",
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (!currentUser || currentUser.message) {
    return <Navigate to="/" />;
  }

  return (
    <div className="workoutSummary">
      <Card className="lastWorkoutCard">
        <CardHeader
          title="Summary of Last Workout:"
          subheader={lastWorkout[0]?.date}
        />

        <CardContent>
          <Typography variant="body2" component="p">
            Most recent workout summary
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon style={expanded ? expandStyle : {}} />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Workout:</Typography>
            <Typography paragraph>Row of exercise</Typography>
            <Typography paragraph>another Exercise Row</Typography>
            <Typography paragraph>another exercise row</Typography>
            <Typography>another exercise row?</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default LastWorkout;
