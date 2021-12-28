const { ObjectID } = require("mongodb/node_modules/bson");
const mongoose = require("mongoose");

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

const userSchema = mongoose.Schema({
  _id: ObjectID,
  userId: Number,
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema, "users");

const saveNewUser = async (data) => {
  const previous = await User.find({}).sort({ userId: -1 }).limit(1);
  const { userId } = previous[0];
  const doc = new User();
  doc._id = mongoose.Types.ObjectId();
  doc.userId = userId + 1;
  doc.username = data.username;
  doc.password = data.password;

  doc.save();
};
