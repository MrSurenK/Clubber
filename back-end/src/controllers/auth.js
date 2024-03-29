const UserModel = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const genRandomString = (length) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const generateStaffUID = (options = {}) => {
  const now = String(Date.now());
  const middlePos = Math.ceil(now.length / 2);
  let output = `STA-${now.substr(0, middlePos)}-${genRandomString(
    6
  )}-${now.substr(middlePos)}`;
  return output;
};

const generateMemberUID = (options = {}) => {
  const now = String(Date.now());
  const middlePos = Math.ceil(now.length / 2);
  let output = `MEM-${now.substr(0, middlePos)}-${genRandomString(
    6
  )}-${now.substr(middlePos)}`;
  return output;
};

const register = async (req, res) => {
  try {
    const auth = await UserModel.findOne({ email: req.body.email });
    if (auth) {
      return res.status(400).json({ status: "error", msg: "duplicate email" });
    }

    const hash = await bcrypt.hash(req.body.password, 12);

    let newStaffId = null;
    if (req.body.isStaff) {
      newStaffId = generateStaffUID();
    }

    let newMemberId = null;
    if (req.body.isMember) {
      newMemberId = generateMemberUID();
    }

    let barTabStatus = false;
    if (req.body.memberRank === "gold") {
      barTabStatus = true;
    }

    const newUser = {
      email: req.body.email,
      hash,
      isActive: req.body.isActive,
      name: req.body.name,
      isStaff: req.body.isStaff,
      staffId: newStaffId,
      staffRank: req.body.staffRank || null,
      isMember: req.body.isMember,
      memberId: newMemberId,
      memberRank: req.body.memberRank || null,
      barTabActive: barTabStatus,
    };

    await UserModel.create(newUser);
    res.json({ status: "success", msg: "registration successful" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: "invalid registration" });
  }
};

const login = async (req, res) => {
  try {
    const auth = await UserModel.findOne({ email: req.body.email });
    if (!auth) {
      console.log("user not found");
      return res.status(400).json({ status: "error", msg: "not authorised" });
    }
    if (!auth.isActive) {
      console.log("user not active");
      return res.status(401).json({ status: "error", msg: "user not active" });
    }
    const result = await bcrypt.compare(req.body.password, auth.hash);
    if (!result) {
      console.log("email or password error");
      return res.status(401).json({ status: "error", msg: "login failed" });
    }
    const claims = {
      id: auth._id,
      email: auth.email,
      isStaff: auth.isStaff,
      staffId: auth.staffId,
      staffRank: auth.staffRank,
      isMember: auth.isMember,
      memberId: auth.memberId,
      memberRank: auth.memberRank,
    };
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });
    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "230d",
      jwtid: uuidv4(),
    });
    res.json({ access, refresh });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "login failed" });
  }
};

const refresh = (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
    const claims = {
      id: decoded._id,
      email: decoded.email,
      isStaff: decoded.isStaff,
      staffId: decoded.staffId,
      staffRank: decoded.staffRank,
      isMember: decoded.isMember,
      memberId: decoded.ismemberId,
      memberRank: decoded.memberRank,
    };
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });
    res.json({ access });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "token refresh error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const auth = await UserModel.findOne({ _id: req.body.id });
    if (!auth) {
      console.log("user not found");
      return res.status(400).json({ status: "error", msg: "not authorised" });
    }
    const result = await bcrypt.compare(req.body.currentPassword, auth.hash);
    if (!result) {
      console.log("password error");
      return res.status(401).json({ status: "error", msg: "password error" });
    }
    const newHash = await bcrypt.hash(req.body.newPassword, 12);
    auth.hash = newHash;
    await auth.save();
    res.json({ status: "success", msg: "Password reset successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", msg: "Password Reset Failed" });
  }
};

module.exports = { register, login, refresh, resetPassword };
