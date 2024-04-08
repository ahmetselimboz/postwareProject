const Renderer = require("../lib/Renderer");
const Contacts = require("../services/Contacts");
const Users = require("../services/Users");
const logger = require("../lib/logger/LoggerClass");
const AuditLogs = require("../lib/AuditLogs");

const getContact = async (req, res) => {
  try {
    await Renderer.setData(res);
    res.render("./frontend/contact");
  } catch (error) {
    logger.error(req.user?.username, "Contact", "Contact-Page", error);
  }
};

const postContact = async (req, res) => {
  try {
    const result = await Contacts.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      subject: req.body.subject,
      message: req.body.message,
    });

    res.redirect("/contact");
  } catch (error) {
    logger.error(req.user?.username, "Contact", "Add-Contact", error);
  }
};

const getContactPage = async (req, res, next) => {
 try {
  const user = await Users.findOne({ _id: req.user.id });
  const result = await Contacts.sortingList({}, { createdAt: "desc" });

  Renderer.setHead(res, "Admin | Contact");
  Renderer.setLocals(res, { user, result });

  res.render("./admin/ad_contact", {
    layout: "./admin/layout/layout",
  });
 } catch (error) {
  logger.error(req.user.username, "Contact", "List-Contact", error);
 }
};

const getDeleteContact = async (req, res, next) => {
  try {
    if (req.params.id) {
      const result = await Contacts.delete({_id:req.params.id});

      if (result) {
        logger.info(req.user.username, "Contact", "Delete", result)
        AuditLogs.info(req.user.username, "Contact", "Delete", result)
        res.redirect("/admin/contact");
      } else {
        res.redirect("/admin/contact");
      }
    } else {
      res.redirect("/admin/contact");
    }
  } catch (error) {
    logger.error(req.user.username, "Contact", "Delete", error)
  }
};

module.exports = { getContact, postContact, getContactPage, getDeleteContact };
