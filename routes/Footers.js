const express = require("express");
let router = express.Router();
const footerController = require("../controllers/Footers")


router.get("/admin/footer", footerController.getFooterPage);
router.post("/admin/footer", footerController.postFooterPage);


module.exports = router;