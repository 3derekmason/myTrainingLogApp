const router = require("express").Router();
const controller = require("./controllers/index.js");

router.post("/users/signup", controller.user.addNewUser);
router.post("/users/login", controller.user.loginUser);

router.post("/workouts", controller.workout.addWorkout);

router.get("/workouts", controller.workout.getUserWorkouts);

module.exports = router;
