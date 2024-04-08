const express = require("express");
let router = express.Router();
const homepageController = require("../controllers/Homepage");
const {
  checkAuthenticated,
  checkLoggedIn,
} = require("../middlewares/checkAuth");

router.get("/", homepageController.getData);
router.get("/homepage", homepageController.getData);



router.get("/admin",checkAuthenticated, homepageController.adminData);
router.get("/admin/homepage",checkAuthenticated, homepageController.adminData);

module.exports = router;
