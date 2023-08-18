const Transactions = require("../models/Transactions");
const TransactionsModel = require("../models/Transactions");

// SEED - seed payment transactions
const seedTransactions = async (req, res) => {
  try {
    await TransactionsModel.deleteMany();
    await TransactionsModel.create([
      {
        _id: "64d0f3f75676c304033d8c89",
        transactionID: "T000000001",
        transactionDate: "2023-08-16",
        paymentStatus: false,
        productID: "P0000001",
        memberID: "M0000001",
        staffID: "S0000001",
      },
      {
        _id: "64d0f3f75676c304033d8c89",
        transactionID: "T000000002",
        transactionDate: "2023-08-17",
        paymentStatus: false,
        productID: "P0000002",
        memberID: "M0000002",
        staffID: "S0000002",
      },
      {
        _id: "64d0f3f75676c304033d8c89",
        transactionID: "T000000003",
        transactionDate: "2023-08-18",
        paymentStatus: false,
        productID: "P0000003",
        memberID: "M0000003",
        staffID: "S0000003",
      },
      {
        _id: "64d0f3f75676c304033d8c89",
        transactionID: "T000000004",
        transactionDate: "2023-08-19",
        paymentStatus: false,
        productID: "P0000004",
        memberID: "M0000004",
        staffID: "S0000004",
      },
    ]);
    res.json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: error.message });
  }
};

// GET - get all payment transactions
const getAllTransactions = async (req, res) => {
  try {
    const allTransactions = await TransactionsModel.find();
    res.json(allTransactions);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.msg });
  }
};

// GET - get a new purchase transaction by Transaction ID
const getTransactionsByTransactionId = async (req, res) => {
  try {
    const transaction = await TransactionsModel.findById(
      req.params.transactionID
    );
    res.json(transaction);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.msg });
  }
};

// GET - get a new purchase transaction by memberID
const getTransactionsByMemberId = async (req, res) => {
  try {
    const transaction = await TransactionsModel.findById(req.params.memberID);
    res.json(transaction);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.msg });
  }
};

// PUT - add a new purchase transaction
const addNewTransactions = async (req, res) => {
  try {
    const newTransaction = {
      transactionID: req.body.transactionID,
      transactionDate: req.body.transactionDate,
      paymentStatus: req.body.paymentStatus,
      productID: req.body.productID,
      memberID: req.body.memberID,
      staffID: req.body.staffID,
    };
    await TransactionsModel.create(newTransaction);
    res.json({ status: "ok", msg: "transaction saved" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.msg });
  }
};

module.exports = {
  seedTransactions,
  getAllTransactions,
  getTransactionsByTransactionId,
  getTransactionsByMemberId,
  addNewTransactions,
};
