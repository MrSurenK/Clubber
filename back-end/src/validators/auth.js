const { body } = require("express-validator");

const validateRegistrationData = [
  body("email", "email is required").not().isEmpty(),
  body("email", "valid email is required").isEmail(),
  body("password", "password is invalid").not().isEmpty().isLength({
    min: 6,
    max: 24,
  }),
  body("isActive", "isActive is required").not().isEmpty(),
  body("isStaff", "isStaff is required").not().isEmpty(),
  // body("staffRank", "staffRank is required").not().isEmpty(),
  body("isMember", "isMember is required").not().isEmpty(),
  // body("memberRank", "memberRank is required").not().isEmpty(),
];

const validateLoginData = [
  body("email", "email is required").not().isEmpty().isEmail(),
  body("password", "password is required").not().isEmpty(),
];

const validateRefreshData = [
  body("refresh", "refresh token is invalid")
    .not()
    .isEmpty()
    .isLength({ min: 1 }),
];

const validateResetPassworddata = [
  body("id").notEmpty().withMessage("User ID is required"),
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),
  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 6, max: 24 })
    .withMessage("Password must be between 6 and 24 characters"),
];

module.exports = {
  validateRegistrationData,
  validateLoginData,
  validateRefreshData,
  validateResetPassworddata,
};
