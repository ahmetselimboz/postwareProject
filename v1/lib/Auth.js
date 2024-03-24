const LocalStrategy = require("passport-local").Strategy;
//const { ExtractJwt, Strategy } = require("passport-jwt");
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

        if (!findUser) return done(null, false);
        const checkPassword = await bcrypt.compare(password, findUser.password);
        if (!checkPassword)
          return done(null, false, );
        if (findUser && findUser.isAdmin == false)
          return done(null, false
           );
        return done(
          null,
          {
            id: findUser._id,
            name: findUser.name,
            surname: findUser.surname,
            language: findUser.language,
            photo: findUser.photo,
            about: findUser.about,
            urls: findUser.urls,
          },
          
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
