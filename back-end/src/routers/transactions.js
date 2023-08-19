const express = require("express");

const {
  seedTransactions,
  getAllTransactions,
  getTransactionsByTransactionId,
  getTransactionsByMemberId,
  addNewTransactions,
  updatePaymentStatus,
} = require("../controllers/transactions");

const {
  validatetransactionIdInParam,
  validatememberIdInParam,
  validateAddTransactionData,
  validateUpdateTransactionkData,
} = require("../validators/transactions");

const checkValid = require("../middleware/checkValid");

const router = express.Router();

router.get("/seed", seedTransactions);
router.get("/", getAllTransactions);
router.get(
  "/t/:transactionId",
  validatetransactionIdInParam,
  checkValid,
  getTransactionsByTransactionId
);
router.get(
  "/m/:memberId",
  validatememberIdInParam,
  checkValid,
  getTransactionsByMemberId
);
router.put("/", validateAddTransactionData, checkValid, addNewTransactions);
router.patch(
  "/:transactionId",
  validatetransactionIdInParam,
  validateUpdateTransactionkData,
  checkValid,
  updatePaymentStatus
);

module.exports = router;
