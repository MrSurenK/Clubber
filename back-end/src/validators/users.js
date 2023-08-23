const { body } = require("express-validator");

const validateStaffIdData = [
  body("staffId", "staffId is required").not().isEmpty(),
];

const validateMemberIdData = [
  body("memberId", "memberId is invalid").not().isEmpty(),
];

module.exports = { validateStaffIdData, validateMemberIdData };
