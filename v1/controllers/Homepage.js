const renderService = require("../lib/Renderer");
const Users = require("../services/Users");
const logger = require("../lib/logger/LoggerClass");
const { flashMessage } = require("../lib/Flash");

const getData = async (req, res) => {
  try {
    await renderService.setData(res);
    renderService.setHead(res);


    res.render("./frontend/index");
  } catch (error) {
    logger.error(req.user.username, "Homepage", "Homepage", error);
  }
};

const adminData = async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.user.id });
    if (user) {
      await renderService.setHead(res, "Admin | Homepage");
      renderService.setLocals(res, { user });
      res.render("./admin/ad_index", { layout: "./admin/layout/layout" });
    }
  } catch (error) {
    logger.error(req.user.username, "Homepage", "List-Homepage", error);
  }
};

module.exports = { getData, adminData };
