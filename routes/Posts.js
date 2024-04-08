const express = require("express");
const postsController = require("../controllers/Posts");
let router = express.Router();
const { checkAuthenticated } = require("../middlewares/checkAuth");

router.get("/blog/:id", postsController.getBlogPage);
router.post("/article/:id/click", postsController.postClick);

router.get("/admin/posts", checkAuthenticated, postsController.getPostPage);
router.get(
  "/admin/allPosts",
  checkAuthenticated,
  postsController.getAllPostsPage
);
router.get(
  "/admin/new-post",
  checkAuthenticated,
  postsController.getNewPostPage
);
router.post(
  "/admin/new-post",
  checkAuthenticated,
  postsController.PostNewPostPage
);
router.get(
  "/admin/post-update/:id",
  checkAuthenticated,
  postsController.getUpdatePostPage
);
router.post(
  "/admin/post-update",
  checkAuthenticated,
  postsController.getUpdatePost
);
router.get(
  "/admin/post-delete/:id",
  checkAuthenticated,
  postsController.getDeletePost
);
router.get(
  "/admin/post-set/:id",
  checkAuthenticated,
  postsController.getPostSet
);

module.exports = router;
