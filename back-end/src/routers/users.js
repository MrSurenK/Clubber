const express = require("express");
const router = express.Router();
const {
  getAllStaff,
  getAllMember,
  getAllUser,
  getMemberById,
  patchMember,
  patchStaff,
  delUser,
} = require("../controllers/users");

router.get("/staff", getAllStaff);
router.get("/member", getAllMember);
router.get("/all", getAllUser);
router.post("/member", getMemberById);
router.patch("/member/:memberId", patchMember);
router.patch("/staff/:staffId", patchStaff);
router.delete("/all/:id", delUser);

module.exports = router;
