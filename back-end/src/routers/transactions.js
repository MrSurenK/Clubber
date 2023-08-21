const express = require("express");

const {
  seedTransactions,
  getAllTransactions,
  getTransactionsByTransactionId,
  getTransactionsByMemberId,
  addNewTransactions,
  updatePaymentStatus,
  getTotalAmountSpentbyMemberId,
  getTotalAmountOutstandingbyMemberId,
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
router.get(
  "/totalamount/:memberId",
  validatememberIdInParam,
  checkValid,
  getTotalAmountSpentbyMemberId
);
router.get(
  "/outstandingamount/:memberId",
  validatememberIdInParam,
  checkValid,
  getTotalAmountOutstandingbyMemberId
);

module.exports = router;
