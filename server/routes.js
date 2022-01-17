const router = require("express").Router();
const controller = require("./controllers/index.js");

router.post("/users/signup", controller.user.addNewUser);
router.post("/users/login", controller.user.loginUser);

router.post("/workouts", controller.workout.addWorkout);
router.get("/workouts", controller.workout.getUserWorkouts);

router.get("/profileMax", controller.profileMax.getUserMaxObject);

router.get("/recent", controller.workout.getLastWorkout);

module.exports = router;
