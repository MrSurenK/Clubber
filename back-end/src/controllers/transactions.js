const Transactions = require("../models/Transactions");
const TransactionsModel = require("../models/Transactions");

// SEED - seed payment transactions
const seedTransactions = async (req, res) => {
  try {
    await TransactionsModel.deleteMany();
    await TransactionsModel.create([
      {
        _Id: "64d0f3f75676c304033d8c89",
        transactionId: "T000000001",
        transactionDate: "2023-08-16",
        paymentStatus: false,
        productId: "P0000001",
        memberId: "M0000001",
        staffId: "S0000001",
      },
      {
        _Id: "64d0f3f75676c304033d8c89",
        transactionId: "T000000002",
        transactionDate: "2023-08-17",
        paymentStatus: false,
        productId: "P0000002",
        memberId: "M0000002",
        staffId: "S0000002",
      },
      {
        _Id: "64d0f3f75676c304033d8c89",
        transactionId: "T000000003",
        transactionDate: "2023-08-18",
        paymentStatus: false,
        productId: "P0000003",
        memberId: "M0000003",
        staffId: "S0000003",
      },
      {
        _Id: "64d0f3f75676c304033d8c89",
        transactionId: "T000000004",
        transactionDate: "2023-08-19",
        paymentStatus: false,
        productId: "P0000004",
        memberId: "M0000004",
        staffId: "S0000004",
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

// GET - get purchase transaction by Transaction Id
const getTransactionsByTransactionId = async (req, res) => {
  try {
    const transaction = await TransactionsModel.find({
      transactionId: req.params.transactionId,
    });

    if (!transaction) {
      return res.status(404).json({
        status: "error",
        msg: "Transaction cannot be found by transaction Id",
      });
    }
    res.json(transaction);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.msg });
  }
};

// GET - get purchase transaction by Member Id
const getTransactionsByMemberId = async (req, res) => {
  try {
    const transaction = await TransactionsModel.find({
      memberId: req.params.memberId,
    });

    if (!transaction) {
      return res.status(404).json({
        status: "error",
        msg: "Transaction cannot be found by member Id",
      });
    }
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
      transactionId: req.body.transactionId,
      transactionDate: req.body.transactionDate,
      paymentStatus: req.body.paymentStatus,
      productId: req.body.productId,
      memberId: req.body.memberId,
      staffId: req.body.staffId,
    };
    await TransactionsModel.create(newTransaction);
    res.json({ status: "ok", msg: "transaction added" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.msg });
  }
};

// PATCH - update payment status
const updatePaymentStatus = async (req, res) => {
  try {
    const updatedPaymentStatus = {};
    if ("paymentStatus" in req.body)
      updatedPaymentStatus.paymentStatus = req.body.paymentStatus;

    const result = await TransactionsModel.updateMany(
      { transactionId: req.params.transactionId },
      { $set: updatedPaymentStatus }
    );

    if (result.nModified === 0) {
      return (
        res,
        status(404).json({
          status: "error",
          msg: "no transactions foundto update",
        })
      );
    }

    res.json({ status: "ok", msg: "transaction(s) updated" });
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
  updatePaymentStatus,
};
