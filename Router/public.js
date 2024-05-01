const express = require("express");
const router = express.Router();
const {
    register,
    login,
    addPhone,
    deletePhone,
} = require("../Controller/public");
const authentication = require("../Middelware/authentication");

router.post("/register", register);
router.post("/login", login);

router.use(authentication);

router.post("/phone", addPhone);
router.delete("/phone/:id", deletePhone);

module.exports = router;
