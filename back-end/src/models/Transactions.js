const mongoose = require("mongoose");

const TransactionsSchema = new mongoose.Schema(
  {
    transactionID: { type: String, required: true },
    transactionDate: { type: Date, required: true, default: Date.now() },
    paymentStatus: { type: Boolean, required: true, default: false },
    productID: { type: String, required: true },
    memberID: { type: String, required: true },
    staffID: { type: String, required: true },
  },
  { collection: "transactions" }
);

module.exports = mongoose.model("Transactions", TransactionsSchema);
