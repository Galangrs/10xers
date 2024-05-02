const express = require("express");
const router = express.Router();
const { register, login } = require("../Controller/admin");
const allowedIPs = require("../Middelware/adminIp");

router.use(allowedIPs);

router.post("/register", register);

module.exports = router;
