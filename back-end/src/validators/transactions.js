const { body, param } = require("express-validator");
const ProductModel = require("../models/Products");
const UsersModel = require("../models/Users");

const validatetransactionIdInParam = [
  param("transactionId", "transactionId is invalid").matches(/^T\d{7}$/),
];

const validatememberIdInParam = [
  param("memberId", "memberId is invalid").matches(/^M\d{7}$/),
];

const validateProductIdExists = async (productId) => {
  const product = await ProductModel.findOne({ productId });
  if (!product) {
    throw new Error("productId does not exist");
  }
};

const validateMemberIdExists = async (memberId) => {
  const member = await UsersModel.findOne({ memberId });
  if (!member) {
    throw new Error("memberId does not exist");
  }
};

const validateStaffIdExists = async (staffId) => {
  const staff = await UsersModel.findOne({ staffId });
  if (!staff) {
    throw new Error("staffId does not exist");
  }
};

const validateAddTransactionData = [
  body("transactionId", "transactionId is required").not().isEmpty(),
  body("transactionId", "transactionId is invalid").matches(/^T\d{7}$/),
  body("paymentStatus", "paymentStatus is required").not().isEmpty(),
  body("paymentStatus", "paymentStatus is required").isBoolean(),
  body("productId", "productId is required").not().isEmpty(),
  body("productId", "productId is invalid").matches(/^P\d{7}$/),
  body("productId").custom(validateProductIdExists),
  body("memberId", "memberId is required").not().isEmpty(),
  body("memberId", "memberId is invalid").matches(/^M\d{7}$/),
  body("memberId").custom(validateMemberIdExists),
  body("staffId", "staffId is required").not().isEmpty(),
  body("staffId", "staffId is invalid").matches(/^S\d{7}$/),
  body("staffId").custom(validateStaffIdExists),
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
