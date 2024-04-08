const express = require("express");
let router = express.Router();
const authorController = require("../controllers/Author")

router.get("/author", authorController.getAuthor);

module.exports = router;
