const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema(
  {
    productID: { type: String, required: true },
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productActive: { type: Boolean, required: true },
  },
  { collection: "products" }
);

module.exports = mongoose.model("Products", ProductsSchema);
