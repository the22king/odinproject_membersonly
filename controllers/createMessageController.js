const { insertMessage } = require("../db/queries");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

async function getCreateMessage(req, res) {
  res.render("createMessage", { user: req.user });
}

const validateUser = [body("message").escape()];

const postCreateMessage = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createMessage", {
        errors: errors.array(),
      });
    }

    const { message, userid } = req.body;

    try {
      await insertMessage(message, userid);
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  },
];

module.exports = { getCreateMessage, postCreateMessage };
