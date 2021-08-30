require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();

const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const passport = require("./auth");

app.use(passport.initialize());
app.use(passport.session());

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.MONGO_SECRET,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      ttl: 12 * 60 * 60,
    }),
  })
);

app.use(express.json());
app.use(cors());

app.use("/api", require("./routes"));

// lEMe95tpv3Dw3iV7
require("./db/config");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
