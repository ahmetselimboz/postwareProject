const AuditLogs = require("../lib/AuditLogs");
const Renderer = require("../lib/Renderer");
const logger = require("../lib/logger/LoggerClass");
const Categories = require("../services/Categories");
const Posts = require("../services/Posts");
const Users = require("../services/Users");

/////////////////FRONTEND////////////////////

const getCategoryPage = async (req, res) => {
  try {
    var search = "";
    var category = "";
    var post = "";
    var catId = req.query.id;
    var page = req.query.p;

    await Renderer.setData(res);
    Renderer.setHead(res);

    if (req.query.id == "0203") {
      post = await Posts.listSortingPostswithDetails(
        { share: true },
        { click: "desc" }
      );
      category = { name: "Trend Posts" };
    } else if (req.query.id == "0204") {
      console.log("object2");
      post = await Posts.listSortingPostswithDetails(
        { share: true },
        { createdAt: "desc" }
      );
      category = { name: "Recent Posts" };
    } else if (req.query.id == "0205" && req.query.search) {
      search = req.query.search;
      const regex = new RegExp(search, "i");
      post = await Posts.listPostsWithDetails({
        $or: [
          { "tags.tagName": { $regex: regex } }, // tags dizisindeki tagName alanlarına göre arama yapar
          { title: { $regex: regex } }, // title alanına göre arama yapar
        ],
        share: true,
      });
      category = { name: 'Results for "' + req.query.search + '"' };
    } else {
      post = await Posts.listPostsWithDetails({
        categoryId: req.query.id,
        share: true,
      });
      category = await Categories.findOne({ _id: req.query.id });
    }
    var pagination = Math.ceil(post.length / 8);

    Renderer.setLocals(res, {
      post,
      catId,
      search,
      page,
      pagination,
      category,
    });

    res.render("./frontend/category-page");
  } catch (error) {
    logger.error(req.user?.username, "Categories", "Category-Page", error);
  }
};

/////////////////ADMIN////////////////////

const getAdminCategoryPage = async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.user.id });
    const count = await Posts.list({});
    const result = await Categories.list({});
    Renderer.setHead(res, "Admin | Categories");
    Renderer.setLocals(res, { result, count, user });
    res.render("./admin/ad_category", { layout: "./admin/layout/layout" });
  } catch (error) {
    logger.error(req.user.username, "Categories", "List-Page", error);
  }
};

const getAddCategoryPage = async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.user.id });
    Renderer.setHead(res, "Admin | Add Category");
    Renderer.setLocals(res, { user });
    res.render("./admin/ad_category-add", { layout: "./admin/layout/layout" });
  } catch (error) {
    logger.error(req.user.username, "Categories", "Add-Page", error);
  }
};

const postAddCategoryPage = async (req, res) => {
  try {
    const category = await Categories.create({ name: req.body.name });
    logger.info(req.user.username, "Categories", "Add", category);
    AuditLogs.info(req.user.username, "Categories", "Add", category)
    res.redirect("/admin/category");
  } catch (error) {
    logger.error(req.user.username, "Categories", "Add", error);
  }
};

const getDeleteCategory = async (req, res) => {
  try {
    if (!req.params) {
      res.redirect("/admin/category");
    } else {
      const category = await Categories.delete({ _id: req.params.id });
      logger.info(req.user.username, "Categories", "Delete", category);
      AuditLogs.info(req.user.username, "Categories", "Delete", category)
      res.redirect("/admin/category");
    }
  } catch (error) {
    logger.error(req.user.username, "Categories", "Delete", error);
  }
};

const getUpdateCategoryPage = async (req, res) => {
  try {
    const result = await Categories.findOne({ _id: req.params.id });
    const user = await Users.findOne({ _id: req.user.id });
    Renderer.setHead(res, "Admin | Update Category");
    Renderer.setLocals(res, { user, result });
    res.render("./admin/ad_category-update", {
      layout: "./admin/layout/layout",
    });
  } catch (error) {
    logger.error(req.user.username, "Categories", "Update-Page", error);
  }
};

const postUpdateCategory = async (req, res, next) => {
  try {
    if (req.body.id) {
      const category = await Categories.updateWhere(
        { _id: req.body.id },
        { name: req.body.name }
      );
      logger.info(req.user.username, "Categories", "Update", category);
      AuditLogs.info(req.user.username, "Categories", "Update", category)
      res.redirect("/admin/category");
    } else {
      res.redirect("/admin/category");
    }
  } catch (error) {
    logger.error(req.user.username, "Categories", "Update", error);
  }
};

module.exports = {
  getCategoryPage,
  getAdminCategoryPage,
  getAddCategoryPage,
  postAddCategoryPage,
  getDeleteCategory,
  getUpdateCategoryPage,
  postUpdateCategory,
};
