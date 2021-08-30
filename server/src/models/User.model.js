const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: String,
  email: String,
  firstName: String,
  lastName: String,
  image: String,
});

module.exports = mongoose.model("User", userSchema);
