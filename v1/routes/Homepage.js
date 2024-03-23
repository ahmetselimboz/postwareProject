const express = require("express");
let router = express.Router();
const homepageController= require("../controllers/Homepage");

router.get("/", homepageController.homepageData);


module.exports = router;
