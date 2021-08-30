const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    sender: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
      googleId: String,
      email: {
        type: String,
        required: true,
      },
      image: String,
    },
    receiver: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
      googleId: String,
      email: {
        type: String,
        required: true,
      },
      image: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("messages", MessageSchema);
