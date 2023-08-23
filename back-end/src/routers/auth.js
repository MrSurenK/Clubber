const express = require("express");
const router = express.Router();

const checkValid = require("../middleware/checkValid");
const {
  validateRegistrationData,
  validateLoginData,
  validateRefreshData,
  validateResetPassworddata,
} = require("../validators/auth");

const {
  register,
  login,
  refresh,
  resetPassword,
} = require("../controllers/auth");

router.put("/register", validateRegistrationData, checkValid, register);
router.post("/login", validateLoginData, checkValid, login);
router.post("/refresh", validateRefreshData, checkValid, refresh);
router.post("/reset", validateResetPassworddata, checkValid, resetPassword);

module.exports = router;
