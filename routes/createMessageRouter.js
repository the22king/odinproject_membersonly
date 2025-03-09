const { Router } = require("express");
const {
  getCreateMessage,
  postCreateMessage,
} = require("../controllers/createMessageController");

const createMessageRouter = Router();

createMessageRouter.get("/", getCreateMessage);
createMessageRouter.post("/", postCreateMessage);

module.exports = createMessageRouter;
