const router = require("express").Router();

router.use(
  "/google",
  require("./google/signin.js"),
  require("./google/signup.js")
);

router.get("/logout", function (req, res) {
  req.session.destroy(function (e) {
    req.logout();
    res.redirect("/");
  });
});
module.exports = router;
