const express = require("express");
let router = express.Router();
const userController = require("../controllers/Users");
const {
  checkAuthenticated,
  checkLoggedIn,
} = require("../middlewares/checkAuth");

router.get("/admin/login", checkLoggedIn, userController.getLogin);
router.post("/admin/login", checkLoggedIn, userController.postLogin);

router.get("/admin/register", checkLoggedIn, userController.getRegister);
router.post("/admin/register", checkLoggedIn, userController.postRegister);

router.post(
  "/admin/change-password",
  checkAuthenticated,
  userController.postChangePass
);
router.get("/admin/logout", userController.getLogOut);

router.get("/admin/admins", checkAuthenticated, userController.getAdminsPage);
router.get(
  "/admin/take-permission/:id",
  checkAuthenticated,
  userController.getAdminsTakePer
);
router.get(
  "/admin/give-permission/:id",
  checkAuthenticated,
  userController.getAdminsGivePer
);
router.get(
  "/admin/delete-user/:id",
  checkAuthenticated,
  userController.getDeleteUser
);

router.get("/admin/profile", checkAuthenticated, userController.getProfilePage);
router.post(
  "/admin/profile",
  checkAuthenticated,
  userController.postProfilePage
);

module.exports = router;
