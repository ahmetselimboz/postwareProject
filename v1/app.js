if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

var express = require("express");
const session = require("express-session");
var path = require("path");
var cookieParser = require("cookie-parser");
var { Homepage } = require("./routes");
var { emptyData, mainAdmin } = require("./lib/firstDatas");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
const MongoDBStore = require("connect-mongodb-session")(session);
const config = require("./config/environments");
const customMorganLogger = require("./lib/Morgan");
const chalk = require("chalk");
var flash = require("connect-flash");
const { flashLocals} = require("./lib/Flash");
const { saveRedisAllPosts } = require("./services/Posts");
var app = express();

app.set("views", path.join(__dirname, "./views"));
app.set("layout", "./frontend/layout/layout", "./admin/layout/layout");
app.set("view engine", "ejs");

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));

emptyData();
mainAdmin();
saveRedisAllPosts();

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

app.use(flash());

app.use((req, res, next) => {

  flashLocals(req, res);
  next();
});

app.use(customMorganLogger);
app.use(passport.initialize());
app.use(passport.session());



app.use("/", Homepage.Users);
app.use("/", Homepage.Homepage);
app.use("/", Homepage.Categories);
app.use("/", Homepage.Posts);
app.use("/", Homepage.Footers);
app.use("/", Homepage.Contacts);
app.use("/", Homepage.Subscribes);
app.use("/", Homepage.Author);

app.use(function (err, req, res, next) {
  console.error(chalk.red(err));
  res.locals.error = req.app.get("env") == "development" ? err : {};
  res.render("error", { layout: false });
});

module.exports = app;
