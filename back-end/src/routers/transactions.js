const express = require("express");

const {
  seedTransactions,
  getAllTransactions,
  getTransactionsByTransactionId,
  getTransactionsByMemberId,
  addNewTransactions,
} = require("../constrollers/transactions");

// const {} = require("../validators/transactions");

// const {auth, authAdmin} = require("../middleware/auth")

const router = express.Router();

router.get("/transactions/seed", seedTransactions);
router.get("/transactions", getAllTransactions);
router.get("/transactions/:transactionID", getTransactionsByTransactionId);
router.get("/transactions/:memberID", getTransactionsByMemberId);
router.put("/transactions", addNewTransactions);

module.exports = router;
