const Renderer = require("../lib/Renderer");
const Users = require("../services/Users");
const logger = require("../lib/logger/LoggerClass");

const getAuthor = async (req, res) => {
  try {
    const page = req.query.id;
    const user = await Users.findOne({ _id: req.query.id });
    await Renderer.setData(res);
    Renderer.setHead(res);
    var pagination = Math.ceil(res.locals.post.length / 8);
    Renderer.setLocals(res, { page, pagination, user });
    res.render("./frontend/author");
  } catch (error) {
    logger.error(req.user.username, "Author", "Author-Page", error);
  }
};

module.exports = { getAuthor };
