const { Router } = require("express");
const {
  getMemebership,
  postMembership,
} = require("../controllers/bememberController");

const bememberRouter = Router();

bememberRouter.get("/", getMemebership);
bememberRouter.post("/", postMembership);

module.exports = bememberRouter;
