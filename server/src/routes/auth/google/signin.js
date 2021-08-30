const router = require("express").Router();
const passport = require("../../../auth");

router.post("/signin", (req, res) => {
  passport.authenticate("google-signin", function (error, user, info) {
    if (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }

    req.logIn(user, (err, data) => {
      if (err) {
        return res.status(401).json({ message: "Something went wrong:(" });
      }
    });

    user.isAuthenticate = true;
    return res.json(user);
  })(req, res);
});

module.exports = router;
