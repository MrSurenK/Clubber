const mongoose = require("mongoose");
const uuid = require("uuid");

const TransactionsSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      default: `TRA-${uuid.v4()}`,
    },
    transactionDate: { type: Date, required: true, default: Date.now() },
    paymentStatus: { type: Boolean, required: true, default: false },
    productId: { type: String, required: true },
    memberId: { type: String, required: true },
    staffId: { type: String, required: true },
  },
  { collection: "transactions" }
);

module.exports = mongoose.model("Transactions", TransactionsSchema);
