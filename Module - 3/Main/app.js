var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const dishRouter = require("./routes/dishRouter.js");
const leaderRouter = require("./routes/leaderRouter.js");
const promoRouter = require("./routes/promoRouter.js");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const Mongoose = require("mongoose");
const Dishes = require("./models/dishes.js");

// DB Config
const dbUrl = "mongodb://localhost:27017/conFusion";
const connect = Mongoose.connect(dbUrl);

connect.then(
  (db) => {
    console.log("Connected Correctly to the database");
  },
  (err) => {
    console.log(err);
  }
);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("12345-67890-09876-54321"));

const auth = (req, res, next) => {
  console.log(req.signedCookies);

  if (!req.signedCookies.user) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      const err = new Error("You are not authenticated!");

      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      return next(err);
    }

    var auth = new Buffer.from(authHeader.split(" ")[1], "base64")
      .toString()
      .split(":");

    const username = auth[0];
    const password = auth[1];

    if (username === "admin" && password === "password") {
      res.cookie("user", "admin", { signed: true });
      next();
    } else {
      const err = new Error("You are not authenticated!");

      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      return next(err);
    }
  } else {
    if (req.signedCookies.user === "admin") {
      next();
    } else {
      const err = new Error("You are not authenticated!");

      err.status = 401;
      return next(err);
    }
  }
};

app.use(auth);

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/dishes", dishRouter);
app.use("/leaders", leaderRouter);
app.use("/promotions", promoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
