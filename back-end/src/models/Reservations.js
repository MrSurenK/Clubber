const mongoose = require("mongoose");

const ReservationsSchema = new mongoose.Schema(
  {
    reservationId: { type: String, require: true },
    memberId: { type: String, require: true },
    reservationDate: { type: Date, required: true },
    reservationTime: { type: String, required: true },
    reservationPax: { type: Number, required: true },
    reservationStatus: {
      type: String,
      required: true,
      enum: ["Approved", "Pending", "Rejected"],
      default: "Pending",
    },
    reservationCreatedDate: { type: Date, require: true, default: Date.now() },
  },
  { collection: "Reservations" }
);

module.exports = mongoose.model("Reservations", ReservationsSchema);
