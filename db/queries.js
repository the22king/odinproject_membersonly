const pool = require("./pool");

async function signUp(username, password) {
  await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
    username,
    password,
  ]);
}

async function signUpAdmin(username, password) {
  await pool.query(
    "INSERT INTO users (username, password, ismember, isadmin) VALUES ($1, $2, $3, $4)",
    [username, password, true, true]
  );
}

async function getUserByName(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  const user = rows[0];
  return user;
}

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  const user = rows[0];
  return user;
}

async function validateMembership(id) {
  await pool.query("UPDATE users SET ismember = $1 WHERE id=$2", [true, id]);
}

async function getMessages() {
  const { rows } = await pool.query(
    "SELECT m.id, m.message, m.pubdate, u.username, u.ismember, u.isadmin FROM messages m JOIN users u ON m.user_id = u.id"
  );
  return rows;
}

async function insertMessage(message, userid) {
  await pool.query("INSERT INTO messages (message, user_id) VALUES ($1, $2)", [
    message,
    userid,
  ]);
}

async function deleteMessage(id) {
  await pool.query("DELETE FROM messages WHERE id=$1", [id]);
}

module.exports = {
  signUp,
  signUpAdmin,
  getUserByName,
  getUserById,
  validateMembership,
  getMessages,
  insertMessage,
  deleteMessage,
};
