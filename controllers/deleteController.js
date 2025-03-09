const { deleteMessage } = require("../db/queries");

async function getDeleteController(req, res) {
  const { id } = req.params;
  res.render("delete", {
    id: id,
    user: req.user,
    errorMsg: false,
  });
}

async function postDeleteController(req, res) {
  const { id, password } = req.body;

  if (password === "sudo") {
    await deleteMessage(id);
    res.redirect("/");
  } else {
    res.render("delete", {
      id: id,
      errorMsg: "Wrong password! Try again...",
    });
  }
}

module.exports = { getDeleteController, postDeleteController };
