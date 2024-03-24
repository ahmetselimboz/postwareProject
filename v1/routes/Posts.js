const express = require("express");
const postsController = require("../controllers/Posts");
let router = express.Router();

router.get("/blog/:id", postsController.getBlogPage);
router.post("/article/:id/click", postsController.postClick);

module.exports = router;
