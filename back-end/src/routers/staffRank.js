const express = require("express");
const router = express.Router();
const { seedStaffRanks, getStaffRanks } = require("../controllers/staffRank");

router.put("/seed", seedStaffRanks);
router.get("/get", getStaffRanks);

module.exports = router;
