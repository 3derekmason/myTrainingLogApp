const pool = require("../db");

module.exports = {
  addNewUser: (req, res) => {
    const data = req.body;
    pool.saveNewUser(data);
    res.status(201).send("User Created!");
  },
};
