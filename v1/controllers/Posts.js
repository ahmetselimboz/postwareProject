const Renderer = require("../lib/Renderer");
const Categories = require("../services/Categories");
const Posts = require("../services/Posts");
const Users = require("../services/Users");

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
    res.locals.resultPost = resultPost;
    res.locals.category = category;
    res.locals.user = user;
    res.locals.data = data;
    res.locals.prev = prev;
    res.locals.next = next;

    res.render("./frontend/blog-page");
  } catch (error) {
    //console.log(error);
  }
};

const postClick = async (req, res, next) => {

  try {
    let _id = req.params.id;
    const post = await Posts.findOne({_id});
    // Veritabanında ilgili makalenin tıklama sayısını artır
    const article = await Posts.updateWhere({_id}, {
      click: post.click + 1,
    });

    if (!article) {
      return res.status(404).send("Makale bulunamadı.");
    }

    res.status(200).send("Tıklama kaydedildi.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getBlogPage, postClick };
