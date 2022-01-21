const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mtla", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const ProfileMaxSchema = mongoose.Schema({
  _id: mongoose.ObjectId,
  userId: Number,
  bigFive: {},
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
  updateMaxObject: async (req, res) => {
    try {
      const maxObject = await ProfileMax.updateOne(
        { userId: Number(req.body.userId) },
        { $set: { bigFive: req.body.newBigFive } },
        { upsert: true }
      );
      res.status(201).send(maxObject);
    } catch (e) {
      res.status(500).send(e);
    }
  },
};
