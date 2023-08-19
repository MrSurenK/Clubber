const express = require("express");
const router = express.Router();
const {
  getAllStaff,
  getAllMember,
  getAllUser,
} = require("../controllers/users");

router.get("/staff", getAllStaff);
router.get("/member", getAllMember);
router.get("/all", getAllUser);

module.exports = router;
