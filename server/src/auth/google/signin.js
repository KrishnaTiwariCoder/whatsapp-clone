const Strategy = require("passport-local").Strategy;
const User = require("../../models/User.model");

module.exports = new Strategy(
  {
    usernameField: "email",
    passwordField: "googleId",
  },
  function (email, password, done) {
    User.findOne({ email })
      .lean()
      .exec((err, user) => {
        if (err) {
          return done(err, null);
        }

        if (!user) {
          return done("No user found", null);
        }

        const isPasswordValid = password === user.googleId;

        if (!isPasswordValid) {
          return done("Google Authentication failed", null);
        }

        return done(null, user);
      });
  }
);
