const Renderer = require("../lib/Renderer");
const Users = require("../services/Users");
const logger = require("../lib/logger/LoggerClass");
const Posts = require("../services/Posts");

const getAuthor = async (req, res) => {
  try {
    const page = req.query.p;
    const user = await Users.findOne({ _id: req.query.id });
    const post = await Posts.listPostsWithDetails({userId: user.id});
    await Renderer.setData(res);
    Renderer.setHead(res);
    Renderer.setLocals(res, {post});
    var pagination = Math.ceil(res.locals.post.length / 8);
    Renderer.setLocals(res, { page, pagination, user });
    res.render("./frontend/author");
  } catch (error) {
    logger.error(req.user?.username, "Author", "Author-Page", error);
  }
};

module.exports = { getAuthor };
