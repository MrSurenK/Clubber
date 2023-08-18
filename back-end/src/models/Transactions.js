const mongoose = require("mongoose");

const TransactionsSchema = new mongoose.Schema(
  {
    transactionId: { type: String, required: true },
    transactionDate: { type: Date, required: true, default: Date.now() },
    paymentStatus: { type: Boolean, required: true, default: false },
    productId: { type: String, required: true },
    memberId: { type: String, required: true },
    staffId: { type: String, required: true },
  },
  { collection: "transactions" }
);

module.exports = mongoose.model("Transactions", TransactionsSchema);
