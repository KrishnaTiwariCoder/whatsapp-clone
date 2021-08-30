const passport = require("passport");
const User = require("../models/User.model");

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (email, done) {
  User.findOne({ email }).exec((err, user) => {
    done(err, user);
  });
});

const GoogleLogin = require("./google/signin");
const GoogleRegister = require("./google/signup");

passport.use("google-signin", GoogleLogin);
passport.use("google-signup", GoogleRegister);

module.exports = passport;
