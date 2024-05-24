const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const cors = require("cors");

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json())
.use(cors())
.use("/", require("./routes"))
.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

process.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception ${err}\n` + `Exception origin: ${origin}`,
  );
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});
