const express = require("express");
const router = express.Router();
const {
  getAllStaff,
  getAllMember,
  getAllUser,
  getMemberById,
  getStaffById,
  patchMember,
  patchStaff,
  delUser,
} = require("../controllers/users");

const checkValid = require("../middleware/checkValid");
const { auth, authStaff, authManager } = require("../middleware/auth");
const {
  validateStaffIdData,
  validateMemberIdData,
} = require("../validators/users");

router.get("/staff", authStaff, getAllStaff);
router.get("/member", authStaff, getAllMember);
router.get("/all", authManager, getAllUser);
router.post("/member", auth, validateMemberIdData, checkValid, getMemberById);
router.post("/staff", authStaff, validateStaffIdData, checkValid, getStaffById);
router.patch("/member/:memberId", authStaff, checkValid, patchMember);
router.patch("/staff/:staffId", authManager, checkValid, patchStaff);
router.delete("/all/:id", authManager, checkValid, delUser);

module.exports = router;
