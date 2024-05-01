const express = require("express");
const router = express.Router();
const {
    register,
    login,
    addPhone,
    deletePhone,
} = require("../Controller/admin");
const allowedIPs = require("../Middelware/adminIp");
const authentication = require("../Middelware/authentication");

router.use(allowedIPs);

router.post("/register", register);
router.post("/login", login);

router.use(authentication);
router.post("/phone", addPhone);
router.delete("/phone/:id", deletePhone);

module.exports = router;
