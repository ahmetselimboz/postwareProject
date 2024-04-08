const LocalStrategy = require("passport-local").Strategy;
const env = require("../config/environments");
const User = require("../db/models/Users");
const bcrypt = require("bcryptjs");
const Users = require("../services/Users");

module.exports = (passport) => {
  const options = {
    usernameField: "username",
    passwordField: "password",
  };

  passport.use(
    new LocalStrategy(options, async (username, password, done) => {
      try {
        const findUser = await Users.findOne({ username });

        if (!findUser)
          return done(null, false, {
            message: "No such user record found",
          });
        const checkPassword = await bcrypt.compare(password, findUser.password);
        if (!checkPassword)
          return done(null, false, {
            message: "Username or password wrong",
          });
        if (findUser && findUser.isAdmin == false)
          return done(null, false, {
            message: "Wait for your admin status to be approved",
          });
        return done(
          null,
          {
            id: findUser._id,
            name: findUser.name,
            surname: findUser.surname,
            username: findUser.username,
            language: findUser.language,
            about: findUser.about,
            urls: findUser.urls,
          },
          {
            message: "You are logged in",
          }
        );
      } catch (error) {
        console.log(">>Error Auth.js: " + error);
      }
    })
  );

  passport.serializeUser(function (user, done) {
    process.nextTick(function () {
      done(null, user);
    });
  });

  passport.deserializeUser(async function (user, done) {
    return done(null, user);
  });
};
