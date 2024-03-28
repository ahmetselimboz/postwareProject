const Renderer = require("../lib/Renderer");
const Response = require("../lib/Response");
const mail = require("../lib/sendMail");
const Categories = require("../services/Categories");
const Posts = require("../services/Posts");
const Users = require("../services/Users");
const logger = require("../lib/logger/LoggerClass");
const AuditLogs = require("../lib/AuditLogs");
const { flashMessage } = require("../lib/Flash");

const getBlogPage = async (req, res) => {
  try {
    const resultPost = await Posts.findOne({ _id: req.params.id });
    const category = await Categories.findOne({
      _id: resultPost.categoryId,
    });

    const user = await Users.findOne({ _id: resultPost.userId });
    const data = await Posts.listPostsSortAndLimit(
      {
        _id: { $ne: req.params.id },
        share: true,
      },
      {},
      2
    );
    let prev = await Posts.listPostsSortAndLimit(
      { _id: { $lt: req.params.id }, share: true },
      { createdAt: "desc" },
      1
    );
    if (prev.length > 0) prev = prev[0];
    let next = await Posts.listPostsSortAndLimit(
      { _id: { $gt: req.params.id }, share: true },
      { createdAt: "asc" },
      1
    );
    if (next.length > 0) next = next[0];

    await Renderer.setData(res);
    Renderer.setHead(res, resultPost.title, resultPost.desc);
    Renderer.setLocals(res, {
      resultPost,
      category,
      user,
      data,
      prev,
      next,
    });
    res.locals.title = req.flash("title");
    res.render("./frontend/blog-page");
  } catch (error) {
    logger.error(req.user.username, "Post", "Blog-Page", error);
  }
};

const postClick = async (req, res, next) => {
  try {
    let _id = req.params.id;
    const post = await Posts.findOne({ _id });
    // Veritabanında ilgili makalenin tıklama sayısını artır
    const article = await Posts.updateWhere(
      { _id },
      {
        click: post.click + 1,
      }
    );

    if (!article) {
      return res.status(404).send("Makale bulunamadı.");
    }

    res.status(200).send("Tıklama kaydedildi.");
  } catch (error) {
    logger.error(req.user.username, "Post", "Post-Click", error);
    res.status(500).send("Internal Server Error");
  }
};

const getPostPage = async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.user.id });
    if (user) {
      const result = await Posts.listSortingPostswithDetails(
        { userId: req.user.id },
        { createdAt: "desc" }
      );
      Renderer.setHead(res, "Admin | Posts");
      Renderer.setLocals(res, { user, result });

      res.render("./admin/ad_posts", { layout: "./admin/layout/layout" });
    }
  } catch (error) {
    logger.error(req.user.username, "Post", "List-Page", error);
  }
};

const getAllPostsPage = async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.user.id });
    if (user) {
      const result = await Posts.listSortingPostswithDetails(
        {},
        { createdAt: "desc" }
      );
      Renderer.setHead(res, "Admin | All Posts");
      Renderer.setLocals(res, { user, result });

      res.render("./admin/ad_admin_posts", { layout: "./admin/layout/layout" });
    }
  } catch (error) {
    logger.error(req.user.username, "Post", "List-All-Page", error);
  }
};

const getNewPostPage = async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.user.id });
    if (user) {
      const items = await Categories.list({});
      Renderer.setHead(res, "Admin | New Post");
      Renderer.setLocals(res, { user, items });
      res.render("./admin/ad_new-post", { layout: "./admin/layout/layout" });
    }
  } catch (error) {
    logger.error(req.user.username, "Post", "Add-Page", error);
  }
};

const getUpdatePostPage = async (req, res) => {
  try {
    var tags = [];
    const user = await Users.findOne({ _id: req.user.id });
    const items = await Categories.list({});
    const result = await Posts.findOne({ _id: req.params.id });
    const item = await Categories.findOne({ _id: result.categoryId });
    for (let index = 0; index < result.tags.length; index++) {
      tags.push(result.tags[index].tagName);
    }
    Renderer.setHead(res, "Admin | Update Post");
    Renderer.setLocals(res, { result, user, items, item, tags });
    res.render("./admin/ad_update-post", { layout: "./admin/layout/layout" });
  } catch (error) {
    logger.error(req.user.username, "Post", "Update-Page", error);
  }
};

const getDeletePost = async (req, res) => {
  try {
    if (!req.params) {
      flashMessage(req, {
        error: "Post couldn't delete!",
      });
      res.redirect("/admin/posts");
    } else {
      const post = await Posts.delete({ _id: req.params.id });
      logger.info(req.user.username, "Post", "Delete", post);
      AuditLogs.info(req.user.username, "Post", "Delete", post);
      flashMessage(req, {
        success_message: "Post deleted!",
      });

      res.redirect("/admin/posts");
    }
  } catch (error) {
    logger.error(req.user.username, "Post", "Delete", error);
  }
};

const getUpdatePost = async (req, res) => {
  try {
    let taglar = [];

    const values = JSON.parse(req.body.tags);

    for (let i = 0; i < values.length; i++) {
      taglar[i] = values[i]["value"];
    }

    var options = {
      mainImg: req.body.mainImg,
      content: req.body.editdata,
      title: req.body.title,
      desc: req.body.desc,
      categoryId: req.body.itemNew,
      userId: req.user.id,
      tags: taglar.map((tag) => ({ tagName: tag })),
    };

    if (req.body.item) {
      options.categoryId = req.body.item;
    }

    const post = await Posts.updateWhere({ _id: req.body.id }, options);
    logger.info(req.user.username, "Post", "Update", post);
    AuditLogs.info(req.user.username, "Post", "Update", post);
    flashMessage(req, {
      success_message: "Post updated!",
    });
    res.redirect("/admin/posts");
  } catch (error) {
    logger.error(req.user.username, "Post", "Update", error);
  }
};

const PostNewPostPage = async (req, res) => {
  try {
    let tags = [];

    const values = JSON.parse(req.body.tags); // PARSE TAGS COMING IN FROM THE FRONT END

    for (let i = 0; i < values.length; i++) {
      tags[i] = values[i]["value"];
    }

    const post = await Posts.create({
      title: req.body.title,
      desc: req.body.desc,
      mainImg: req.body.mainImg,
      content: req.body.editdata,
      categoryId: req.body.item,
      userId: req.user.id,
      tags: tags.map((tag) => ({ tagName: tag })),
    });

    const findUser = await Users.findOne({ _id: req.user.id });
    await mail(
      findUser.username + ' published a post called " ' + req.body.title + ' "'
    );
    logger.info(req.user.username, "Post", "Add", post);
    AuditLogs.info(req.user.username, "Post", "Add", post);
    flashMessage(req, {
      success_message: "Post added! Please wait for your post to be verified",
    });
    res.redirect("/admin/posts");
  } catch (error) {
    logger.error(req.user.username, "Post", "Add", error);
  }
};

const getPostSet = async (req, res, next) => {
  try {
    if (req.params.id) {
      if (req.query.set == "share") {
        const findPost = await Posts.findOne({ _id: req.params.id });

        if (findPost.share == false) {
          await Posts.updateWhere({ _id: req.params.id }, { share: true });
        } else {
          await Posts.updateWhere({ _id: req.params.id }, { share: false });
        }
        res.redirect("/admin/allPosts");
      } else if (req.query.set == "delete") {
        await Posts.delete({ _id: req.params.id });
        res.redirect("/admin/allPosts");
      }
    }
  } catch (error) {
    logger.error(req.user.username, "Post", "Share", error);
  }
};

module.exports = {
  getBlogPage,
  postClick,
  getPostPage,
  getAllPostsPage,
  getNewPostPage,
  getUpdatePostPage,
  getDeletePost,
  getUpdatePost,
  PostNewPostPage,
  getPostSet,
};
