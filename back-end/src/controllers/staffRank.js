const StaffRankModel = require("../models/StaffRank");

const seedStaffRanks = async (req, res) => {
  try {
    await StaffRankModel.deleteMany();
    await StaffRankModel.create([
      { staffRank: "manager" },
      { staffRank: "minion" },
    ]);

    res.json({ status: "success", message: "Staff ranks seeded successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "Failed to seed staff ranks" });
  }
};

const getStaffRanks = async (req, res) => {
  try {
    const staffRanks = await StaffRankModel.find();
    const staffRanksReturn = staffRanks.map((rank) => {
      return {
        staffRank: rank.staffRank,
      };
    });
    res.json(staffRanksReturn);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "Failed to get staff ranks" });
  }
};

module.exports = { seedStaffRanks, getStaffRanks };
