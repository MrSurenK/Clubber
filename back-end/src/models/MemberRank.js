const mongoose = require("mongoose");

const memberRankSchema = new mongoose.Schema(
  {
    memberRank: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "memberRanks" }
);

const MemberRanks = mongoose.model("memberRanks", memberRankSchema);
module.exports = MemberRanks;
