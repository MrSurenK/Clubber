const { body, param } = require("express-validator");
const ProductsModel = require("../models/Products");

const isProductIdUnique = async (productId) => {
  const existingProduct = await ProductsModel.findOne({ productId });
  return !existingProduct;
};

const validateIdInParam = [
  param("productId", "productId is invalid").matches(/^P\d{7}$/),
];

const validateAddProductData = [
  body("productId", "productId is required").not().isEmpty(),
  body("productId", "productId is invalid").matches(/^P\d{7}$/),
  body("productId").custom(async (value) => {
    if (!(await isProductIdUnique(value))) {
      throw new Error("productId has already been used");
    }
  }),
  body("productName", "productName is required").not().isEmpty(),
  body(
    "productName",
    "must have a min of 1 and a max of 24 characters"
  ).isLength({
    min: 1,
    max: 24,
  }),
  body("productPrice", "productPrice is required").not().isEmpty(),
  body(
    "productPrice",
    "productPrice must be a number with 2 decimal places"
  ).isDecimal({ decimal_digits: "2" }),
  body("productActive", "productActive is required").not().isEmpty(),
  body("productActive", "productActive needs to be boolean").isBoolean(),
];

const validateUpdateProductData = [
  body("productActive", "productActive is required").not().isEmpty(),
  body("productActive", "productActive needs to be boolean").isBoolean(),
];

module.exports = {
  validateIdInParam,
  validateAddProductData,
  validateUpdateProductData,
};
