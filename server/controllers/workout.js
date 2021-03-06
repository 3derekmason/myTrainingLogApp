const mongoose = require("mongoose");

// "mongodb://localhost:27017/mtla"

const WorkoutSchema = mongoose.Schema({
  _id: mongoose.ObjectId,
  userId: Number,
  date: Date,
  type: String,
  exercises: [],
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
  getLastWorkout: async (req, res) => {
    try {
      const id = Number(req.query.userId);
      const workout = await Workout.find({ userId: id })
        .limit(1)
        .sort({ _id: -1 });
      res.send(workout);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  addWorkout: async (req, res) => {
    try {
      const doc = new Workout();
      doc._id = mongoose.Types.ObjectId();
      doc.date = req.body.date;
      doc.userId = req.body.userId;
      doc.type = req.body.type;
      doc.exercises = req.body.exercises;
      doc.save();
      res.status(201).send(doc);
    } catch (e) {
      res.status(500).send(e);
    }
  },
};
