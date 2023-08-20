const MemberRankModel = require("../models/MemberRank");

const seedMemberRanks = async (req, res) => {
  try {
    await MemberRankModel.deleteMany();
    await MemberRankModel.create([
      { memberRank: "gold" },
      { memberRank: "silver" },
    ]);

    res.json({
      status: "success",
      message: "Member ranks seeded successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "Failed to seed member ranks" });
  }
};

const getMemberRanks = async (req, res) => {
  try {
    const memberRank = await MemberRankModel.find();
    const memberRankReturn = memberRank.map((rank) => {
      return {
        memberRank: rank.memberRank,
      };
    });
    res.json(memberRankReturn);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "Failed to get member ranks" });
  }
};

module.exports = { seedMemberRanks, getMemberRanks };
