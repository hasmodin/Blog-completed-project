const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/userController.js");

//getting signup form route and register route
router
  .route("/signup")
  .get(userController.signupForm)
  .post(wrapAsync(userController.signup));

//getting login form route and login route
router
  .route("/login")
  .get(userController.loginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

//logout route
router.route("/logout").get(userController.logout);

module.exports = router;
