const mongoose = require("mongoose");
const { ObjectID } = require("mongodb/node_modules/bson");
const bcrypt = require("bcryptjs");

mongoose.connect("mongodb://localhost:27017/mtla", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("connected successfully");
});

const UserSchema = mongoose.Schema({
  _id: ObjectID,
  userId: Number,
  username: String,
  password: String,
  loggedIn: Boolean,
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = function (plaintext, callback) {
  return callback(null, bcrypt.compareSync(plaintext, this.password));
};

const User = mongoose.model("User", UserSchema, "users");

module.exports = {
  addNewUser: async (req, res) => {
    const previous = await User.find({}).sort({ userId: -1 }).limit(1);
    const { userId } = previous[0];
    const doc = new User();
    doc._id = mongoose.Types.ObjectId();
    doc.userId = userId + 1;
    doc.username = req.body.username;
    doc.password = req.body.password;

    doc.save();
    res.status(201).send(doc);
  },
  loginUser: async (req, res) => {
    try {
      var user = await User.findOne({
        username: req.body.username,
      }).exec();
      if (!user) {
        return res.status(400).send({ message: "The username does not exist" });
      }
      user.comparePassword(req.body.password, (error, match) => {
        if (!match) {
          return res.status(400).send({ message: "The password is invalid" });
        }
      });
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
