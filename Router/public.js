const express = require("express");
const router = express.Router();
const {
    register,
    login,
    addPhone,
    deletePhone,
    sercPhone,
    editPhone,
} = require("../Controller/public");
const authentication = require("../Middelware/authentication");

router.post("/register", register);
router.post("/login", login);
router.get("/phone", sercPhone);

router.use(authentication);

router.post("/phone", addPhone);
router.delete("/phone/:id", deletePhone);
router.patch("/phone/:id", editPhone);

module.exports = router;
