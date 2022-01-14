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
          title="Summary of last workout:"
          subheader={
            lastWorkout[0]?.date + " || " + lastWorkout[0]?.type.toUpperCase()
          }
        />

        <CardContent>
          <Typography variant="caption" component="p">
            Most recent workout summary
          </Typography>
          {lastWorkout[0]?.exercises.map((exerciseObject, i) => {
            return (
              <Typography key={i} component="p" variant="h6">
                {Object.keys(exerciseObject)?.[0]}
              </Typography>
            );
          })}
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
            {lastWorkout[0]?.exercises.map((exercise, i) => {
              const exerciseName = Object.keys(exercise)?.[0];

              return (
                <div key={i}>
                  <Typography element="h6" variant="button">
                    {exerciseName.toUpperCase()}
                  </Typography>
                  {exercise[exerciseName]?.sets?.map((set, i) => {
                    return (
                      <Typography key={i} element="h6" variant="caption">
                        {`${set[0]} at ${set[1]} pounds`}
                      </Typography>
                    );
                  })}
                </div>
              );
            })}
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default LastWorkout;
