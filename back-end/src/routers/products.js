const express = require("express");

const {
  seedProducts,
  getProducts,
  addNewProduct,
  getProductbyProductID,
  updateProductStatus,
} = require("../constrollers/products");

// const {} = require("../validators/transactions");

// const {auth, authAdmin} = require("../middleware/auth")

const router = express.Router();

router.get("/products/seed", seedProducts);
router.get("/products", getProducts);
router.put("/products/", addNewProduct);
router.post("/products/:productID", getProductbyProductID);
router.patch("/products/:productID", updateProductStatus);

module.exports = router;
