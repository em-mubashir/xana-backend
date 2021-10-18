var express = require("express");
const passport = require("passport");
const path = require("path");
var app = express();
const cookieParser = require("cookie-parser");
const apiErrorHanlder = require("./error/api-error-hanlder");
const cors = require("cors");
require("colors");
const dotenv = require("dotenv");

app.use(cors());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(express.static("uploads"));
app.use(passport.initialize());
app.use(passport.session());

dotenv.config();

/*
 * Register routes here
 */

const userRouter = require("./routes/user.route");
app.use("/api/user", userRouter);

const adminRouter = require("./routes/admin.route");
app.use("/api/admin", adminRouter);

const reportRouter = require("./routes/report.route");
app.use("/api/reports", reportRouter);

const testRouter = require("./routes/test.route");
app.use("/api/test", testRouter);

var port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.status(200).send(`Welcome to Xana`);
});

// Page not found
app.use((req, res, next) => {
  next(res.status(404).send("Route Not found"));
});
app.use(apiErrorHanlder);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`.yellow.bold);
});
