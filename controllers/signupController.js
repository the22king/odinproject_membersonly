const { signUp, signUpAdmin } = require("../db/queries");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

async function getSignup(req, res) {
  res.render("signup");
}

const alphanumErr = "must only contain letters and numbers.";
const lengthErr = "must be between 1 and 10 characters";
const passErr =
  "must be at least 8 characters, contains at least 1 number, 1 uppercase and 1 symbol";

const validateUser = [
  body("username")
    .trim()
    .isAlphanumeric()
    .withMessage(`First name ${alphanumErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minNumbers: 1,
      minUppercase: 1,
      minLowercase: 1,
    })
    .withMessage(`Password ${passErr}`),
  body("confirmpassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords doesn't match"),
  body("adminpassword").escape(),
];

const postSignup = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signup", {
        errors: errors.array(),
      });
    }

    const { username, password, adminpassword } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const adminPass = process.env.ADMIN_PASSWORD;
    if (adminpassword === adminPass) {
      try {
        await signUpAdmin(username, hashedPassword);
        passport.authenticate("local")(req, res, function () {
          res.redirect("/");
        });
      } catch (err) {
        return next(err);
      }
    } else {
      try {
        await signUp(username, hashedPassword);
        passport.authenticate("local")(req, res, function () {
          res.redirect("/");
        });
      } catch (err) {
        return next(err);
      }
    }
  },
];

module.exports = { getSignup, postSignup };
