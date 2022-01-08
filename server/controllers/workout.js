const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mtla", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const WorkoutSchema = mongoose.Schema({
  _id: mongoose.ObjectId,
  userId: Number,
  date: Date,
  type: String,
  exercises: {},
});

const Workout = mongoose.model("Workout", WorkoutSchema, "workouts");

module.exports = {
  getUserWorkouts: async (req, res) => {
    try {
      const id = Number(req.query.userId);
      const workouts = await Workout.find({ userId: id });
      res.send(workouts);
    } catch (e) {
      res.status(500).send(e);
    }
  },
};
