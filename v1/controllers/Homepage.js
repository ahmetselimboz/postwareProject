const renderService = require("../lib/Renderer");
const Category = require("../services/Categories");

const homepageData = async (req, res) => {
  try {
    await renderService.setData(res);
    res.locals.result = await Category.list();
    res.render("./frontend/index");
  } catch (error) {}
};


module.exports = { homepageData };
