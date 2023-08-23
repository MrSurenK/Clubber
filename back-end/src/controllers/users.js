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

const getStaffById = async (req, res) => {
  try {
    const staff = await UserModel.findOne({ staffId: req.body.staffId });

    if (!staff) {
      return res.status(404).json({ status: "error", msg: "Staff not found" });
    }

    const staffReturn = {
      _id: staff._id,
      email: staff.email,
      isActive: staff.isActive,
      name: staff.name,
      created_at: formatDateInTimeZone(staff.created_at),
      staffId: staff.staffId,
      staffRank: staff.staffRank,
    };

    res.json(staffReturn);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

const patchMember = async (req, res) => {
  try {
    const existingMember = await UserModel.find({
      memberId: req.params.memberId,
    });

    if (!existingMember) {
      return res
        .status(404)
        .json({ status: "error", message: "Member not found" });
    }

    const updateFields = {
      isActive: req.body.isActive || existingMember.isActive,
      name: req.body.name || existingMember.name,
      isMember: req.body.isMember || existingMember.isMember,
      memberRank: req.body.memberRank || existingMember.memberRank,
      barTabActive: req.body.barTabActive || existingMember.barTabActive,
    };
    const updatedMember = await UserModel.findOneAndUpdate(
      { memberId: req.params.memberId },
      updateFields,
      { new: true }
    );

    const sanitizedMember = {
      _id: updatedMember._id,
      email: updatedMember.email,
      isActive: updatedMember.isActive,
      name: updatedMember.name,
      created_at: updatedMember.created_at,
      isStaff: updatedMember.isStaff,
      staffId: updatedMember.staffId,
      staffRank: updatedMember.staffRank,
      isMember: updatedMember.isMember,
      memberRank: updatedMember.memberRank,
      barTabActive: updatedMember.barTabActive,
    };

    res.json(sanitizedMember);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

const patchStaff = async (req, res) => {
  try {
    const existingStaff = await UserModel.find({
      staffId: req.params.staffId,
    });

    if (!existingStaff) {
      return res
        .status(404)
        .json({ status: "error", message: "Staff not found" });
    }

    const updateFields = {
      isActive: req.body.isActive || existingStaff.isActive,
      name: req.body.name || existingStaff.name,
      isStaff: req.body.isStaff || existingStaff.isStaff,
      staffRank: req.body.staffRank || existingStaff.staffRank,
    };
    const updateStaff = await UserModel.findOneAndUpdate(
      { staffId: req.params.staffId },
      updateFields,
      { new: true }
    );

    const sanitizedStaff = {
      _id: updateStaff._id,
      email: updateStaff.email,
      isActive: updateStaff.isActive,
      name: updateStaff.name,
      created_at: updateStaff.created_at,
      isStaff: updateStaff.isStaff,
      staffId: updateStaff.staffId,
      staffRank: updateStaff.staffRank,
      isMember: updateStaff.isMember,
      memberRank: updateStaff.memberRank,
      barTabActive: updateStaff.barTabActive,
    };

    res.json(sanitizedStaff);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: error.message });
  }
};

const delUser = async (req, res) => {
  try {
    if (req.body.staffRank !== "manager") {
      return res
        .status(403)
        .json({ status: "error", message: "Not authorized" });
    }

    await UserModel.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

module.exports = {
  getAllStaff,
  getAllMember,
  getAllUser,
  getMemberById,
  getStaffById,
  patchMember,
  patchStaff,
  delUser,
};
