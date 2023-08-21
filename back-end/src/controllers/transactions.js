const TransactionsModel = require("../models/Transactions");
const ProductsModel = require("../models/Products");
const uuid = require("uuid");

// SEED - seed payment transactions
const seedTransactions = async (req, res) => {
  try {
    await TransactionsModel.deleteMany();
    await TransactionsModel.create([
      {
        _id: "64e18af5540c79fd815e4957",
        transactionId: "TRA-b2bdb78b-d7d9-432e-a7c4-875ced6aa836",
        transactionDate: "2023-08-16T00:00:00.000Z",
        paymentStatus: false,
        productId: "PRO-badad4ff-82b4-4d97-9cf1-49b97ea2d991",
        memberId: "MEM-1692338-BjJOdT-453249",
        staffId: "STA-1692338-6mA8Uo-166748",
      },
      {
        _id: "64e18af5540c79fd815e4958",
        transactionId: "TRA-4bcbaea9-25a6-4a86-92c0-d8919264fbbb",
        transactionDate: "2023-08-17T00:00:00.000Z",
        paymentStatus: false,
        productId: "PRO-65bedb3a-b24f-42b5-a36a-2c9c67fc5ae9",
        memberId: "MEM-1692338-BjJOdT-453249",
        staffId: "STA-1692338-J9Bvv2-194944",
      },
      {
        _id: "64e18af5540c79fd815e495a",
        transactionId: "TRA-6fa809f6-082f-4e09-af40-f6bebdd2843f",
        transactionDate: "2023-08-18T00:00:00.000Z",
        paymentStatus: false,
        productId: "PRO-093e4ef7-3b1f-4ec1-a3f1-5340c03ab8ac",
        memberId: "MEM-1692338-vaRuBG-408593",
        staffId: "STA-1692338-J9Bvv2-194944",
      },
      {
        _id: "64d0f3f75676c304033d8c89",
        transactionId: "TRA-eabda4a5-b2d7-4415-aa3a-d3abcc1272b7",
        transactionDate: "2023-08-19T00:00:00.000Z",
        paymentStatus: false,
        productId: "PRO-52cb7c70-e07a-4bae-a105-305bd4e1b7c7",
        memberId: "MEM-1692338-vaRuBG-408593",
        staffId: "STA-1692338-J9Bvv2-194944",
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
      transactionId: `TRA-${uuid.v4()}`,
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

// GET - get total spend to date based on memberId
const getTotalAmountSpentbyMemberId = async (req, res) => {
  try {
    const memberId = req.params.memberId;

    // Find all transactions with the specified memberId
    const transactions = await TransactionsModel.find({
      memberId: memberId,
    });

    console.log(memberId);

    // Calculate the total product amount for these transactions
    let totalAmount = 0;
    for (const transaction of transactions) {
      const product = await ProductsModel.findOne({
        productId: transaction.productId,
      });
      if (product) {
        totalAmount += product.productPrice;
      }
    }

    res.json({ totalAmount: totalAmount });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// GET - get total amount that's outstanding based on memberId
const getTotalAmountOutstandingbyMemberId = async (req, res) => {
  try {
    const memberId = req.params.memberId;

    // Find all transactions with the specified memberId and paymentStatus = false
    const transactions = await TransactionsModel.find({
      memberId: memberId,
      paymentStatus: false,
    });

    // Calculate the total product amount for these transactions
    let totalAmount = 0;
    for (const transaction of transactions) {
      const product = await ProductsModel.findOne({
        productId: transaction.productId,
      });
      if (product) {
        totalAmount += product.productPrice;
      }
    }

    res.json({ totalAmount: totalAmount });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

module.exports = {
  seedTransactions,
  getAllTransactions,
  getTransactionsByTransactionId,
  getTransactionsByMemberId,
  addNewTransactions,
  updatePaymentStatus,
  getTotalAmountSpentbyMemberId,
  getTotalAmountOutstandingbyMemberId,
};
