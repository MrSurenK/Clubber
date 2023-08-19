const UserModel = require("../models/Users");
const moment = require("moment-timezone");

const formatDateInTimeZone = (date) => {
  return moment(date).tz("Asia/Singapore").format();
};

const getAllStaff = async (req, res) => {
  try {
    const allStaff = await UserModel.find({ isStaff: true });
    const allStaffReturn = allStaff.map((staff) => {
      return {
        _id: staff._id,
        email: staff.email,
        isActive: staff.isActive,
        name: staff.name,
        created_at: formatDateInTimeZone(staff.created_at),
        staffId: staff.staffId,
        staffRank: staff.staffRank,
      };
    });

    res.json(allStaffReturn);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

const getAllMember = async (req, res) => {
  try {
    const allMember = await UserModel.find({ isMember: true });
    const allMemberReturn = allMember.map((member) => {
      return {
        _id: member._id,
        email: member.email,
        isActive: member.isActive,
        name: member.name,
        created_at: formatDateInTimeZone(member.created_at),
        memberId: member.memberId,
        memberRank: member.memberRank,
        barTabActive: member.barTabActive,
      };
    });

    res.json(allMemberReturn);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUser = await UserModel.find();
    const allUserReturn = allUser.map((user) => {
      return {
        _id: user._id,
        email: user.email,
        isActive: user.isActive,
        name: user.name,
        created_at: formatDateInTimeZone(user.created_at),
        staffId: user.staffId,
        staffRank: user.staffRank,
        memberId: user.memberId,
        memberRank: user.memberRank,
        barTabActive: user.barTabActive,
      };
    });

    res.json(allUserReturn);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

const getMemberById = async (req, res) => {
  try {
    const member = await UserModel.findOne({ memberId: req.body.memberId });

    if (!member) {
      return res.status(404).json({ status: "error", msg: "Member not found" });
    }

    const memberReturn = {
      _id: member._id,
      email: member.email,
      isActive: member.isActive,
      name: member.name,
      created_at: formatDateInTimeZone(member.created_at),
      memberId: member.memberId,
      memberRank: member.memberRank,
      barTabActive: member.barTabActive,
    };

    res.json(memberReturn);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

module.exports = { getAllStaff, getAllMember, getAllUser, getMemberById };
