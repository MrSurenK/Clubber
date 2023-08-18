const UserModel = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// const register = async (req, res) => {
//     try {
//       const auth = await UserModel.findOne({ email: req.body.email });
//       if (auth) {
//         return res.status(400).json({ status: "error", msg: "duplicate email" });
//       }
//       const hash = await bcrypt.hash(req.body.password, 12);
//       await UserModel.create({
//         email: req.body.email,
//         hash,
//         role: req.body.role || "user",
//       });
//       res.json({ status: "success", msg: "registration successful" });
//     } catch (error) {
//       console.log(error.message);
//       res.json({ status: "error", msg: "invalid registration" });
//     }
//   };

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
      email: auth.email,
      isStaff: auth.isStaff,
      staffRank: auth.staffRank,
      isMember: auth.isMember,
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
      email: decoded.email,
      isStaff: decoded.isStaff,
      staffRank: decoded.staffRank,
      isMember: decoded.isMember,
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

module.exports = { login, refresh };