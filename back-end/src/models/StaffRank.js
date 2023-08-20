const mongoose = require("mongoose");

const StaffRankSchema = new mongoose.Schema(
  {
    staffRank: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "staffRanks" }
);

const StaffRanks = mongoose.model("staffRanks", StaffRankSchema);
module.exports = StaffRanks;
