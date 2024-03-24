if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

var createError = require("http-errors");
var express = require("express");
const session = require("express-session");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var { Admin, Homepage } = require("./routes");
var { emptyData, mainAdmin } = require("./lib/firstDatas");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
const MongoDBStore = require("connect-mongodb-session")(session);
const config = require("./config/environments");
var app = express();

app.set("views", path.join(__dirname, "./views"));
app.set("layout", "./frontend/layout/layout", "./admin/layout/layout");
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));

emptyData();
mainAdmin();

const sessionStore = new MongoDBStore({
  uri: config.MONGODB_CONNECTION_STRING,
  collection: "sessions",
});

app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: sessionStore,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", Homepage.Users);
//app.use("/admin", Admin.Users);

app.use("/", Homepage.Homepage);
//app.use("/admin", Admin.Homepage);

app.use("/", Homepage.Categories);
//app.use("/admin", Admin.Categories);

app.use("/", Homepage.Posts);
//app.use("/admin", Admin.Posts);

app.use("/", Homepage.Footers);
//app.use("/admin", Admin.Footers);

app.use("/", Homepage.Contacts);
//app.use("/admin", Admin.Contacts);

app.use("/", Homepage.Subscribes);
//app.use("/admin", Admin.Subscribes);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

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
