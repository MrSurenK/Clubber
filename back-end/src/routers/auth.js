const express = require("express");
const router = express.Router();

const checkValid = require("../middleware/checkValid");

const {
  register,
  login,
  refresh,
  resetPassword,
} = require("../controllers/auth");

router.put("/register", checkValid, register);
router.post("/login", checkValid, login);
router.post("/refresh", checkValid, refresh);
router.post("/reset", checkValid, resetPassword);

module.exports = router;
