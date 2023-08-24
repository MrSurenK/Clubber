const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema(
  {
    MessageID: { type: String, required: true },
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    messageTimeStamp: { type: Date, required: true },
    messageContent: { type: String, required: true },
  },
  { collection: "messages" }
);

module.exports = mongoose.model("Messages", MessagesSchema);
