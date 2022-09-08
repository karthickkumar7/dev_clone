require("dotenv").config();
const express = require("express");
const { connection } = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const connectDb = require("./config/dbConnection");
const { logger, logEvents } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const corsOptions = require("./config/corsOptions");

const app = express();

connectDb();

app.use(logger);
app.use("/", express.static(path.join(__dirname, "public", "")));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// @routes
app.use("/", require("./routes/root"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/threads", require("./routes/thread.routes"));
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ msg: "404 Not Found!" });
  } else {
    res.type("txt").send("404 Not Found!");
  }
});

// @error handler
app.use(errorHandler);

connection.once("open", () => {
  console.log("db connected!");
  app.listen(process.env.PORT, () => console.log("Hey man leave her alone!"));
});

connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
