const express = require("express");
const router = express.Router();

const checkValid = require("../middleware/checkValid");

const { register, login, refresh } = require("../controllers/auth");

router.put("/register", checkValid, register);
router.post("/login", checkValid, login);
router.post("/refresh", checkValid, refresh);

module.exports = router;
