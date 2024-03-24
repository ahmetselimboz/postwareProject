const express = require("express");
let router = express.Router();
const userController = require("../controllers/Users");
const {
  checkAuthenticated,
  checkLoggedIn,
} = require("../middlewares/checkAuth");


router.get("/admin/login", checkLoggedIn, userController.getLogin);

router.post("/admin/login", checkLoggedIn, userController.postLogin);

module.exports = router;
