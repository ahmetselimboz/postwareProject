const renderService = require("../lib/Renderer");
const Users = require("../services/Users");
const logger = require("../lib/logger/LoggerClass");
const connectRedis = require("../db/redis");

const getData = async (req, res) => {
  try {
    await renderService.setData(res);
    renderService.setHead(res);
    //const value = await connectRedis.set('test', 'HELLO');
    //const value = await connectRedis.get("FIRSTNAME")
    //console.log(value);
    // connectRedis.quit();
    res.render("./frontend/index");
  } catch (error) {
    logger.error(req.user?.username, "Homepage", "Homepage", error);
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
