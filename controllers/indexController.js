const { getMessages } = require("../db/queries");
const { decode } = require("html-entities");

async function getIndex(req, res) {
  try {
    const messages = await getMessages();
    const dateReadyMessages = messages.map((message) => {
      const date = new Date(message.pubdate);
      const newMessage = decode(message.message);
      message.message = newMessage;
      message.pubdate = date.toLocaleDateString();
    });
    console.log(messages);
    res.render("home", { user: req.user, messages: messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.render("home", { user: req.user, messages: [] });
  }
}

module.exports = { getIndex };
