const express = require("express");
let router = express.Router();
const categoryController = require("../controllers/Category");

router.get("/category", categoryController.getCategoryPage);


router.get("/admin/category", categoryController.getAdminCategoryPage);
router.get("/admin/category-add", categoryController.getAddCategoryPage);
router.post("/admin/category-add", categoryController.postAddCategoryPage);
router.get("/admin/category-delete/:id", categoryController.getDeleteCategory);
router.get("/admin/category-update/:id", categoryController.getUpdateCategoryPage);
router.post("/admin/category-update", categoryController.postUpdateCategory);


module.exports = router;
