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

const buildDate = (dateString) => {
  if (!dateString) {
    return;
  }
  const splitDate = dateString.split("T");
  const splitDigits = splitDate[0].split("-");
  const month = splitDigits[1];
  const day = splitDigits[2];
  return `${month}/${day}`;
};

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
  if (!lastWorkout || lastWorkout.length === 0) {
    return (
      <div className="workoutSummary">
        <Card className="lastWorkoutCard">
          <Typography component="h4" variant="h5">
            Welcome to My Training Log App!
          </Typography>
          <Typography component="h5" variant="subtitle1">
            Click on <em>Add Workout</em> to log your first workout! All of your
            workouts will appear in the <em>User Log</em>. A summary of your
            most recently logged workout will appear here!
          </Typography>
          <Typography component="h5" variant="subtitle2">
            That's all for right now, more to come! Have fun training and
            logging.
          </Typography>
        </Card>
      </div>
    );
  }

  return (
    <div className="workoutSummary">
      <Card className="lastWorkoutCard" style={{ background: "#ededdd" }}>
        <CardHeader
          title="Most Recent Workout:"
          subheader={lastWorkout[0]?.type.toUpperCase()}
        />

        <CardContent>
          <Typography variant="caption" component="p">
            Last workout summary:
          </Typography>
          <Typography color="secondary" component="p" variant="h6">
            On <em>{buildDate(lastWorkout?.[0]?.date)}</em> you logged{" "}
            {Object.keys(lastWorkout?.[0]?.exercises).length} exercises
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          View:
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
            {lastWorkout[0]?.exercises?.map((exercise, i) => {
              const exerciseName = Object.keys(exercise)?.[0];

              return (
                <div className="lastWorkoutExRow" key={i}>
                  <Typography element="h6" variant="h6">
                    {exerciseName.toUpperCase()}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    {exercise[exerciseName]?.sets?.map((set, i) => {
                      return (
                        <Typography key={i} element="h6" variant="body2">
                          {`${set[0]} at ${set[1]}`}
                        </Typography>
                      );
                    })}
                  </div>
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
