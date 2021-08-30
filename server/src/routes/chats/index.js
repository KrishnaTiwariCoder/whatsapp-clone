const router = require("express").Router();
const Messages = require("../../models/Messages.model");
const UserModel = require("../../models/User.model");

router.get("/previousChats/:personId", async (req, res) => {
  const { personId } = req.params;

  let sentMessages = await Messages.find({ "sender.id": personId });
  let receivedMessages = await Messages.find({ "receiver.id": personId });

  let common_chat_person_set = new Set();

  sentMessages.map((message) => {
    common_chat_person_set.add(message.receiver.id);
  });

  receivedMessages.map((message) => {
    common_chat_person_set.add(message.sender.id);
  });

  let idsArray = Array.from(common_chat_person_set);

  let result = [];

  for (let i = 0; i < idsArray.length; i++) {
    const id = idsArray[i];
    const data = await UserModel.findOne({ _id: id });
    result.push(data);
  }

  res.status(200).json(result);
});

router.post("/sendMessage/", async (req, res) => {
  const { message, receiverEmail, senderId } = req.body;
  const senderInfo = await UserModel.findOne({ _id: senderId });
  const receiverInfo = await UserModel.findOne({ email: receiverEmail });

  if (!receiverInfo || !senderInfo) {
    return res.status(401).json("Id not valid");
  }
  Messages.create(
    {
      message,
      sender: {
        name: `${senderInfo.firstName} ${senderInfo.lastName}`,
        id: senderInfo._id,
        googleId: senderInfo.googleId,
        email: senderInfo.email,
        image: senderInfo.image,
      },
      receiver: {
        name: `${receiverInfo.firstName} ${receiverInfo.lastName}`,
        id: receiverInfo._id,
        googleId: receiverInfo.googleId,
        email: receiverInfo.email,
        image: receiverInfo.image,
      },
    },
    (err, data) => {
      if (err) return res.status(400).json(err);
      return res
        .status(200)
        .json({ ...data, createdAt: data.createdAt.getTime() });
    }
  );
});

router.post("/chatsBetweenPeople", async (req, res) => {
  const { senderId, receiverId } = req.body;
  const sentMessages = await Messages.find({
    "sender.id": senderId,
    "receiver.id": receiverId,
  });
  const receivedMessages = await Messages.find({
    "sender.id": receiverId,
    "receiver.id": senderId,
  });
  let allMessages = [...sentMessages, ...receivedMessages];

  // console.log(allMessages[0].createdAt);
  allMessages = allMessages.map((elm) => {
    return { ...elm, createdAt: elm.createdAt.getTime() };
  });

  allMessages.sort(function (a, b) {
    return a.createdAt - b.createdAt;
  });

  res.status(200).send(allMessages);
});

module.exports = router;
