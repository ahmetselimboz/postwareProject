const passport = require("passport");
require("../lib/Auth")(passport);
const Renderer = require("../lib/Renderer");
const Users = require("../services/Users");
const bcrypt = require("bcryptjs");
const mail = require("../lib/sendMail");
const logger = require("../lib/logger/LoggerClass");
const AuditLogs = require("../lib/AuditLogs");
const { flashMessage } = require("../lib/Flash");

const getLogin = async (req, res) => {
  try {
    await Renderer.setHead(res, "Admin | Login");
    res.render("./admin/login", { layout: false });
  } catch (error) {
    logger.error(req.user.username, "User", "Login-Page", error);
  }
};

const postLogin = async (req, res, next) => {
  try {
    passport.authenticate("local", {
      successRedirect: "/admin/homepage",
      failureRedirect: "/admin/login",
      failureFlash: true,
      successFlash: true,
    })(req, res, next);
  } catch (error) {
    logger.error(req.user.username, "User", "Login", error);
  }
};

const getRegister = (req, res) => {
  try {
    Renderer.setHead(res, "Admin | Register");
    res.render("./admin/register", {
      layout: false,
    });
  } catch (error) {
    logger.error(req.user.username, "User", "Register-Page", error);
  }
};

const postRegister = async (req, res) => {
  try {
    if (req.body.password != req.body.repassword) {
      console.log("Passwords doesn't match");
      return res.redirect("/admin/register");
    }

    const user = await Users.findOne({ username: req.body.username });

    if (user && user.isAdmin == false) {
      const deletedUser = await Users.delete(user.id);
    }

    if (user && user.idAdmin == true) {
      console.log("User already exists");
      return res.redirect("/admin/register");
    }

    const newUser = await Users.create({
      name: req.body.name,
      surname: req.body.surname,
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
    });

    await mail(newUser.username + " sent an access request");

    res.redirect("/admin/login");
  } catch (error) {
    logger.error(req.user.username, "User", "Register", error);
  }
};

const getLogOut = async (req, res, next) => {
  try {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }

      req.session.destroy((error) => {
        res.clearCookie("connect.sid");

        res.redirect("/admin/login");

        // res.redirect('/login');
      });
    });
  } catch (error) {
    logger.error(req.user.username, "User", "Logout", error);
  }
};

const postChangePass = async (req, res) => {
  try {
    const { oldPass, newPass, reNewPass } = req.body;

    if (oldPass && newPass && reNewPass) {
      const findUser = await Users.findOne({ _id: req.body.id });
      const checkPassword = await bcrypt.compare(oldPass, findUser.password);

      if (newPass == reNewPass && checkPassword) {
        const hashedPassword = await bcrypt.hash(newPass, 10);
        await Users.updateWhere(
          { _id: req.body.id },
          {
            password: hashedPassword,
          }
        );

        flashMessage(req, { success_message: "Password changed!" });
        res.redirect("/admin/profile");
      } else {
        flashMessage(req, {
          error: "Make sure your passwords correct or match!",
        });
        res.redirect("/admin/profile");
      }
    } else {
      flashMessage(req, {
        error: "Make sure you fill in all fields!",
      });

      res.redirect("/admin/profile");
    }
  } catch (error) {
    logger.error(req.user.username, "User", "Change-Password", error);
  }
};

const getDeleteUser = async (req, res) => {
  try {
    const deletedData = await Users.delete({ _id: req.params.id });
    logger.info(req.user.username, "User", "Delete-Profile", deletedData);
    AuditLogs.info(req.user.username, "User", "Delete-Profile", deletedData);
    res.redirect("/admin/admins");
  } catch (error) {
    logger.error(req.user.username, "User", "Delete-Profile", error);
  }
};

const getAdminsPage = async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.user.id });
    const result = await Users.list({ mainAdmin: false });
    await Renderer.setHead(res, "Admin | Admins");
    Renderer.setLocals(res, { user, result });
    res.render("./admin/ad_admins", { layout: "./admin/layout/layout" });
  } catch (error) {
    logger.error(req.user.username, "User", "List-Admins", error);
  }
};

const getAdminsTakePer = async (req, res) => {
  try {
    const updatedData = await Users.updateWhere(
      { _id: req.params.id },
      { isAdmin: false }
    );
    logger.info(req.user.username, "User", "Take-Permission", updatedData);
    AuditLogs.info(req.user.username, "User", "Take-Permission", updatedData);
    res.redirect("/admin/admins");
  } catch (error) {
    logger.error(req.user.username, "User", "Take-Permission", error);
  }
};

const getAdminsGivePer = async (req, res) => {
  try {
    const updatedData = await Users.updateWhere(
      { _id: req.params.id },
      { isAdmin: true }
    );

    logger.info(req.user.username, "User", "Give-Permission", updatedData);
    AuditLogs.info(req.user.username, "User", "Give-Permission", updatedData);
    res.redirect("/admin/admins");
  } catch (error) {
    logger.error(req.user.username, "User", "Give-Permission", error);
  }
};

const getProfilePage = async (req, res, next) => {
  try {
    const user = await Users.findOne({ _id: req.user.id });
    await Renderer.setHead(res, "Admin | Profile");
    Renderer.setLocals(res, { user });
    res.render("./admin/ad_profile", { layout: "./admin/layout/layout" });
  } catch (error) {
    logger.error(req.user.username, "User", "List-Profile", error);
  }
};

const postProfilePage = async (req, res) => {
  try {
    if (req.body) {
      var options = {
        photo: req.body.mainImg,
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        about: req.body.about,
        urls: {
          instagram: req.body.instagram,
          twitter: req.body.twitter,
          facebook: req.body.facebook,
          linkedin: req.body.linkedin,
        },
      };

      const updatedData = await Users.updateWhere(
        { _id: req.body.id },
        options
      );
      logger.info(req.user.username, "User", "Update-Profile", updatedData);
      AuditLogs.info(req.user.username, "User", "Update-Profile", updatedData);
      flashMessage(req, {
        success_message: "Profile is updated!",
      });
      res.redirect("/admin/profile");
    } else {
      res.redirect("/admin/profile");
    }
  } catch (error) {
    logger.error(req.user.username, "User", "Update-Profile", error);
  }
};

module.exports = {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  getLogOut,
  postChangePass,
  getDeleteUser,
  getAdminsPage,
  getAdminsTakePer,
  getAdminsGivePer,
  getProfilePage,
  postProfilePage,
};
