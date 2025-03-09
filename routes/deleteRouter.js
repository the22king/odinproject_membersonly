const { Router } = require("express");
const {
  getDeleteController,
  postDeleteController,
} = require("../controllers/deleteController");

const deleteRouter = Router();

deleteRouter.get("/:id", getDeleteController);
deleteRouter.post("/:id", postDeleteController);

module.exports = deleteRouter;
