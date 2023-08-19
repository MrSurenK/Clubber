const express = require("express");
const router = express.Router();
const {
  getAllStaff,
  getAllMember,
  getAllUser,
  getMemberById,
  patchMember,
} = require("../controllers/users");

router.get("/staff", getAllStaff);
router.get("/member", getAllMember);
router.get("/all", getAllUser);
router.post("/member", getMemberById);
router.patch("/member/:memberId", patchMember);

module.exports = router;
