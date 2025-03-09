const { Router } = require("express");
const { getLogin } = require("../controllers/loginController");
const passport = require("passport");

const loginRouter = Router();

loginRouter.get("/", getLogin);
loginRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login?error=1",
  })
);

module.exports = loginRouter;
