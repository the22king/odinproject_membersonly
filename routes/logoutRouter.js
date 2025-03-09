const { Router } = require("express");
const { getLogout } = require("../controllers/logoutController");

const logoutRouter = Router();

logoutRouter.get("/", getLogout);

module.exports = logoutRouter;
