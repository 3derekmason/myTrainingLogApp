const mongoose = require("mongoose");
const { ObjectID } = require("mongodb/node_modules/bson");

mongoose.connect("mongodb://localhost:27017/mtla", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const WorkoutSchema = mongoose.Schema({
  _id: ObjectID,
  userId: Number,
  date: Date,
  type: String,
  exercises: {},
});

const Workout = mongoose.model("Workout", WorkoutSchema, "workouts");

module.exports = {
  getUserWorkouts: async (req, res) => {
    try {
      const id = req.query.userId;
      const workouts = await Workout.find({ userId: id });
    } catch (e) {
      res.status(500).send(e);
    }
  },
};
