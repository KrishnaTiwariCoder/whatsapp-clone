const Strategy = require("passport-local").Strategy;
const User = require("../../models/User.model");

module.exports = new Strategy(
  {
    passReqToCallback: true,
    usernameField: "email",
    passwordField: "googleId",
  },
  function (req, email, password, done) {
    User.findOne({ email: req.body.email }).then((err, data) => {
      if (err) {
        done(err, null);
      } else {
        User.create(
          {
            email: req.body.email,
            googleId: req.body.googleId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            image: req.body.image,
          },
          (err, data) => {
            if (err) return done("Something went wrong", null);

            done(null, data);
          }
        );
        done(null, data);
      }
      if (data) {
        done("already registered", null);
      }
    });
  }
);
