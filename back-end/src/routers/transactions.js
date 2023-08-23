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

const { auth, authStaff, authManager } = require("../middleware/auth");

const router = express.Router();

router.get("/seed", seedTransactions);
router.get("/", authStaff, getAllTransactions);
router.get(
  "/t/:transactionId",
  authStaff,
  validatetransactionIdInParam,
  checkValid,
  getTransactionsByTransactionId
);
router.get(
  "/m/:memberId",
  authStaff,
  validatememberIdInParam,
  checkValid,
  getTransactionsByMemberId
);
router.put(
  "/",
  authStaff,
  validateAddTransactionData,
  checkValid,
  addNewTransactions
);
router.patch(
  "/:transactionId",
  authStaff,
  validatetransactionIdInParam,
  validateUpdateTransactionkData,
  checkValid,
  updatePaymentStatus
);
router.get(
  "/totalamount/:memberId",
  authStaff,
  validatememberIdInParam,
  checkValid,
  getTotalAmountSpentbyMemberId
);
router.get(
  "/outstandingamount/:memberId",
  authStaff,
  validatememberIdInParam,
  checkValid,
  getTotalAmountOutstandingbyMemberId
);

module.exports = router;
