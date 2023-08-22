const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESS_SECRET);
  } catch (error) {
    return null;
  }
};

const auth = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", msg: "no token found" });
  }

  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      req.decoded = decoded;
      next();
    } else {
      return res.status(401).json({ status: "error", msg: "unauthorized" });
    }
  } else {
    return res.status(403).json({ status: "error", msg: "forbidden" });
  }
};

const authStaff = (req, res, next) => {
  const token = req.headers["authorization"].replace("Bearer ", "");
  const decoded = verifyToken(token);

  if (decoded && decoded.isStaff) {
    req.decoded = decoded;
    next();
  } else {
    return res.status(401).json({ status: "error", msg: "unauthorized" });
  }
};

const authManager = (req, res, next) => {
  const token = req.headers["authorization"].replace("Bearer ", "");
  const decoded = verifyToken(token);

  if (decoded && decoded.staffRank === "manager") {
    req.decoded = decoded;
    next();
  } else {
    return res.status(401).json({ status: "error", msg: "unauthorized" });
  }
};

module.exports = { auth, authStaff, authManager };
