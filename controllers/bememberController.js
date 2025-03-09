const { validateMembership } = require("../db/queries");
require("dotenv").config();

async function getMemebership(req, res) {
  res.render("bemember", { user: req.user });
}

async function postMembership(req, res, next) {
  const { id, password } = req.body;
  const membershipPass = process.env.MEMBERSHIP_PASSWORD;
  if (password === membershipPass) {
    try {
      await validateMembership(id);
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = { getMemebership, postMembership };
