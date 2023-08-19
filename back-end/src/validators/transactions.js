const { body, param } = require("express-validator");

const validatetransactionIdInParam = [
  param("transactionId", "transactionId is invalid").matches(/^T\d{7}$/),
];

const validatememberIdInParam = [
  param("memberId", "memberId is invalid").matches(/^M\d{7}$/),
];

const validateAddTransactionData = [
  body("transactionId", "transactionId is required").not().isEmpty(),
  body("transactionId", "transactionId is invalid").matches(/^T\d{7}$/),
  body("transactionDate", "transactionDate is required").not().isEmpty(),
  body("transactionDate", "transactionDate must be a date").isDate(),
  body("paymentStatus", "paymentStatus is required").not().isEmpty(),
  body("paymentStatus", "paymentStatus is required").isBoolean(),
  body("productId", "productId is required").not().isEmpty(),
  body("productId", "productId is invalid").matches(/^P\d{7}$/),
  body("memberId", "memberId is required").not().isEmpty(),
  body("memberId", "memberId is invalid").matches(/^M\d{7}$/),
  body("staffId", "staffId is required").not().isEmpty(),
  body("staffId", "staffId is invalid").matches(/^S\d{7}$/),
];

const validateUpdateTransactionkData = [
  body("paymentStatus", "paymentStatus is required").not().isEmpty(),
  body("paymentStatus", "paymentStatus is required").isBoolean(),
];

module.exports = {
  validatetransactionIdInParam,
  validatememberIdInParam,
  validateAddTransactionData,
  validateUpdateTransactionkData,
};
