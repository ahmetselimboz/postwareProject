const express = require("express");
let router = express.Router();
const contactController = require("../controllers/Contacts")

router.get("/contact",contactController.getContact);
router.post("/contact",contactController.postContact);


router.get("/admin/contact", contactController.getContactPage);
router.get("/admin/delete-contact/:id", contactController.getDeleteContact);


module.exports = router;
