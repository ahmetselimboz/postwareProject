const Renderer = require("../lib/Renderer");
const Footers = require("../services/Footers");
const Users = require("../services/Users");
const logger = require("../lib/logger/LoggerClass");
const AuditLogs = require("../lib/AuditLogs");
const { flashMessage } = require("../lib/Flash");

const getFooterPage = async (req, res, next) => {
  try {
    const user = await Users.findOne({ _id: req.user.id });
    const result = await Footers.findOne({});

    if (!result)
      await Footers.create({
        urls: { instagram: ".", twitter: ".", facebook: "." },
      });

    Renderer.setHead(res, "Admin | Footer");
    Renderer.setLocals(res, { user, result });

    res.render("./admin/ad_footer", {
      layout: "./admin/layout/layout",
    });
  } catch (error) {
    logger.error(req.user.username, "Footer", "List-Footer", error);
  }
};

const postFooterPage = async (req, res, next) => {
  try {
    const footer = await Footers.updateWhere(
      { _id: req.body.id },
      {
        urls: {
          instagram: req.body.instagram,
          facebook: req.body.facebook,
          twitter: req.body.twitter,
        },
      }
    );

    flashMessage(req, {
      success_message: "You are logged in",
    });
    
    flashMessage(req, {
      error: "You cant login!",
    });

    //console.log(req.flash("name"));
    logger.info(req.user.username, "Footer", "Update", footer);
    AuditLogs.info(req.user.username, "Footer", "Update", footer);
    res.redirect("/admin/footer");
  } catch (error) {
    logger.error(req.user.username, "Footer", "Update", error);
  }
};

module.exports = { getFooterPage, postFooterPage };
