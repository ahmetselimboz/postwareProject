const passport = require("passport");
require("../lib/Auth")(passport);
const Renderer = require("../lib/Renderer");
const Users = require("../services/Users");

const getLogin = (req, res) => {

  Renderer.setHead(res, "Admin | Login");
  res.render("./admin/login", { layout: false });
};

const postLogin = async (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/admin/homepage",
    failureRedirect: "/admin/login",
    failureFlash: true,
    successFlash: true,
  })(req, res, next);
};

module.exports = { getLogin, postLogin };
