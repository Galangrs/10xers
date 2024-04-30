const express = require("express");
const router = express.Router();
const { register , login } = require("../Controller/public")
const allowedIPs = require("../Middelware/adminIp")

router.use(allowedIPs)

router.post("/register", register)
router.post("/login", login)

module.exports = router