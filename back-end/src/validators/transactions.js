const { body, param } = require("express-validator");
const ProductModel = require("../models/Products");
const UserModel = require("../models/Users");

const validatetransactionIdInParam = [
  param("transactionId", "transactionId is invalid").matches(
    /^TRA-\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/
  ),
];

const validatememberIdInParam = [
  param("memberId", "memberId is invalid").matches(
    /^MEM-\d{7}-[A-Za-z0-9]{6}-\d{6}$/
  ),
];

const validateProductIdExists = async (productId) => {
  const product = await ProductModel.findOne({ productId });
  if (!product) {
    throw new Error("productId does not exist");
  }
};

const validateMemberIdExists = async (memberId) => {
  const member = await UserModel.findOne({ memberId });
  if (!member) {
    throw new Error("memberId does not exist");
  }
};

const validateStaffIdExists = async (staffId) => {
  const staff = await UserModel.findOne({ staffId });
  if (!staff) {
    throw new Error("staffId does not exist");
  }
};

const validateAddTransactionData = [
  body("paymentStatus", "paymentStatus is required").not().isEmpty(),
  body("paymentStatus", "paymentStatus is required").isBoolean(),
  body("productId", "productId is required").not().isEmpty(),
  body("productId", "productId is invalid").matches(
    /^PRO-\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/
  ),
  body("productId").custom(validateProductIdExists),
  body("memberId", "memberId is required").not().isEmpty(),
  body("memberId", "memberId is invalid").matches(
    /^MEM-\d{7}-[A-Za-z0-9]{6}-\d{6}$/
  ),
  body("memberId").custom(validateMemberIdExists),
  body("staffId", "staffId is required").not().isEmpty(),
  body("staffId", "staffId is invalid").matches(
    /^STA-\d{7}-[A-Za-z0-9]{6}-\d{6}$/
  ),
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
