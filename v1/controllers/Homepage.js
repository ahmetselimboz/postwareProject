const renderService = require("../lib/Renderer");
const Category = require("../services/Categories");
const Users = require("../services/Users");

const getData = async (req, res) => {
  try {
    await renderService.setData(res);
    renderService.setHead(res);
    res.render("./frontend/index");
  } catch (error) {
    console.log(error);
  }
};

const adminData = async (req, res) => {
  try {
    const user = await Users.findOne({ _id: "65ad076694aa9a82ad78abc0" });
    if (user) {
      await renderService.setHead(res, "Admin | Homepage");
      res.locals.user = user;
      res.locals.name = user.username;
      res.render("./admin/ad_index", { layout: "./admin/layout/layout" });
    }
  } catch (error) {}
};

module.exports = { getData, adminData };
