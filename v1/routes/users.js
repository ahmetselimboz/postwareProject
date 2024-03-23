const express = require("express");
let router = express.Router();
const {list} =require("../controllers/Users");


router.get("/users", list)

module.exports = router;