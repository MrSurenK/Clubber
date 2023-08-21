const ProductsModel = require("../models/Products");

//SEED - seed products
const seedProducts = async (req, res) => {
  try {
    await ProductsModel.deleteMany();

    await ProductsModel.create([
      {
        productId: "P0000001",
        productName: "Cover Charge",
        productPrice: 15,
        productActive: true,
      },
      {
        productId: "P0000002",
        productName: "Drinks",
        productPrice: 30,
        productActive: true,
      },
      {
        productId: "P0000003",
        productName: "Bottle of Booze",
        productPrice: 300,
        productActive: true,
      },
      {
        productId: "P0000004",
        productName: "Extra Services",
        productPrice: 999,
        productActive: true,
      },
    ]);

    res.json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "seeding error" });
  }
};

//GET - get all products
const getProducts = async (req, res) => {
  try {
    const allProducts = await ProductsModel.find();
    res.json(allProducts);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: "cannot get products" });
  }
};

//PUT - add a new product
const addNewProduct = async (req, res) => {
  try {
    const newProduct = {
      productId: req.body.productId,
      productName: req.body.productName,
      productPrice: req.body.productPrice,
      productActive: req.body.productActive,
    };
    await ProductsModel.create(newProduct);
    res.json({ status: "ok", msg: "new product created" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.msg });
  }
};

//POST - get product by productId
const getProductbyProductId = async (req, res) => {
  try {
    const product = await ProductsModel.findOne({
      productId: req.params.productId,
    });
    res.json(product);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.msg });
  }
};

//PATCh - update product status by productId
const updateProductStatus = async (req, res) => {
  try {
    const updatedProduct = {};
    if ("productActive" in req.body)
      updatedProduct.productActive = req.body.productActive;

    const result = await ProductsModel.findOneAndUpdate(
      { productId: req.params.productId },
      updatedProduct,
      { new: true }
    );
    if (!result) {
      return res
        .status(404)
        .json({ status: "error", msg: "Product not found" });
    }
    res.json({ status: "ok", msg: "Product Active Status updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.msg });
  }
};

module.exports = {
  seedProducts,
  getProducts,
  addNewProduct,
  getProductbyProductId,
  updateProductStatus,
};
