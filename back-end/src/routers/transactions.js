const express = require("express");

const {
  seedTransactions,
  getAllTransactions,
  getTransactionsByTransactionId,
  getTransactionsByMemberId,
  addNewTransactions,
  updatePaymentStatus,
} = require("../controllers/transactions");

// const {} = require("../valIdators/transactions");

// const {auth, authAdmin} = require("../mIddleware/auth")

const router = express.Router();

router.get("/seed", seedTransactions);
router.get("/", getAllTransactions);
router.get("/t/:transactionId", getTransactionsByTransactionId);
router.get("/m/:memberId", getTransactionsByMemberId);
router.put("/", addNewTransactions);
router.patch("/:transactionId", updatePaymentStatus);

module.exports = router;
