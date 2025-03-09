async function getLogin(req, res) {
  const { error } = req.query;
  if (error == 1) {
    res.render("login", {
      user: req.user,
      errorMsg: "Wrong username or password!",
    });
  } else {
    res.render("login", { user: req.user, errorMsg: false });
  }
}

module.exports = { getLogin };
