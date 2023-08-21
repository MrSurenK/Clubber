const express = require("express");
const router = express.Router();
const {
  seedMemberRanks,
  getMemberRanks,
} = require("../controllers/memberRank");

router.put("/seed", seedMemberRanks);
router.get("/get", getMemberRanks);

module.exports = router;
