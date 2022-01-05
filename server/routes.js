const router = require("express").Router();
const controller = require("./controllers/index.js");

router.post("/users", controller.user.addNewUser);

module.exports = router;
