const mongoose = require("mongoose");
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1254236",
  key: "70a2121f2270af2d706f",
  secret: "68ac9000609ffe85557f",
  cluster: "eu",
  useTLS: true,
});

mongoose.connect(process.env.MONGO_URL, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;

db.once("open", () => {
  console.log("DB connected");

  const msgCollection = db.collection("messages");

  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log("change");
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("message", messageDetails.receiver.id, {
        ...messageDetails,
      });
    }
  });
});
