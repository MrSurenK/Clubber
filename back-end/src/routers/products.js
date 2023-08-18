const express = require("express");

const {
  seedProducts,
  getProducts,
  addNewProduct,
  getProductbyProductId,
  updateProductStatus,
} = require("../controllers/products");

// const {} = require("../valIdators/transactions");

// const {auth, authAdmin} = require("../mIddleware/auth")

const router = express.Router();

router.get("/seed", seedProducts);
router.get("/", getProducts);
router.put("/", addNewProduct);
router.post("/:productId", getProductbyProductId);
router.patch("/:productId", updateProductStatus);

module.exports = router;
