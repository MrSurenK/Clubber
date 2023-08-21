const express = require("express");

const {
  seedProducts,
  getProducts,
  addNewProduct,
  getProductbyProductId,
  updateProductStatus,
} = require("../controllers/products");

const {
  validateIdInParam,
  validateAddProductData,
  validateUpdateProductData,
} = require("../validators/products");

const checkValid = require("../middleware/checkValid");

const router = express.Router();

router.get("/seed", seedProducts);
router.get("/", getProducts);
router.put("/", validateAddProductData, checkValid, addNewProduct);
router.post(
  "/:productId",
  validateIdInParam,
  checkValid,
  getProductbyProductId
);
router.patch(
  "/:productId",
  validateIdInParam,
  validateUpdateProductData,
  checkValid,
  updateProductStatus
);

module.exports = router;
