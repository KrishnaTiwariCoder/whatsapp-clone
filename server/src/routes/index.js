const UserModel = require("../models/User.model");
const Messages = require("../models/Messages.model");
const router = require("express").Router();

router.use("/auth", require("./auth"));

router.get("/profile", async (req, res) => {
  const User = await UserModel.findOne({ _id: req.session.passport.user });
  res.status(200).send(User);
});

router.use("/", require("./chats/index"));

module.exports = router;
