const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mtla", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const ProfileMaxSchema = mongoose.Schema({
  _id: mongoose.ObjectId,
  userId: Number,
  "back squat": Number,
  deadlift: Number,
  "bench press": Number,
  "overhead press": Number,
  "pendlay row": Number,
  target: Number,
});

const ProfileMax = mongoose.model("ProfileMax", ProfileMaxSchema, "max");

module.exports = {
  getUserMaxObject: async (req, res) => {
    try {
      const id = req.query.userId;
      const maxObject = await ProfileMax.find({ userId: id });
      res.send(maxObject);
    } catch (e) {
      res.status(500).send(e);
    }
  },
};
