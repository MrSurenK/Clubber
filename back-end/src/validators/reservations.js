const { body, param } = require("express-validator");
const ReservationsModel = require("../models/Reservations");
const UsersModel = require("../models/Users");

const isReservationIdUnique = async (reservationId) => {
  const existingReservation = await ReservationsModel.findOne({
    reservationId,
  });
  return !existingReservation;
};

const validateMemberIdExists = async (memberId) => {
  const member = await UsersModel.findOne({ memberId });
  if (!member) {
    throw new Error("memberId does not exist");
  }
};

const validateIdInParam = [
  param("reservationId", "ReservationId is invalid").matches(/^R\d{7}$/),
];

const validateAddReservationData = [
  // body("reservationId", "reservationId is required").not().isEmpty(),
  // body("reservationId", "reservationId is invalid").matches(/^R\d{7}$/),
  body("reservationId").custom(async (value) => {
    if (!(await isReservationIdUnique(value))) {
      throw new Error("reservationId has already been used");
    }
  }),
  body("memberId", "memberId is required").not().isEmpty(),
  body("memberId", "memberId is invalid").matches(
    /^MEM-\d{7}-[A-Za-z0-9]{6}-\d{6}$/
  ),
  body("memberId").custom(validateMemberIdExists),
  body("reservationDate", "reservationDate is required").not().isEmpty(),
  body("reservationDate", "must be a date").isDate(),
  body("reservationTime", "reservationTime is required").not().isEmpty(),
  body(
    "reservationTime",
    "reservationTime must be in the format 'HH:mm'"
  ).matches(/^([01]\d|2[0-3]):[0-5]\d$/),
  body("reservationPax", "reservationPax is required").not().isEmpty(),
  body("reservationPax", "reservationPax must be a number").isNumeric(),
  body("reservationStatus", "reservationStatus is required").not().isEmpty(),
  body("reservationStatus").custom((value) => {
    if (value !== "Approved" && value !== "Pending" && value !== "Rejected") {
      throw new Error(
        "reservationStatus must be 'Approved', 'Pending', or 'Rejected'"
      );
    }
    return true;
  }),
];

const validateUpdateReservationData = [
  body("reservationDate", "reservationDate is required").not().isEmpty(),
  body("reservationDate", "must be a date").isDate(),
  body("reservationTime", "reservationTime is required").not().isEmpty(),
  body(
    "reservationTime",
    "reservationTime must be in the format 'HH:mm'"
  ).matches(/^([01]\d|2[0-3]):[0-5]\d$/),
  body("reservationPax", "reservationPax is required").not().isEmpty(),
  body("reservationPax", "reservationPax must be a number").isNumeric(),
  body("reservationStatus", "reservationStatus is required").not().isEmpty(),
  body("reservationStatus").custom((value) => {
    if (value !== "Approved" && value !== "Pending" && value !== "Rejected") {
      throw new Error(
        "reservationStatus must be 'Approved', 'Pending', or 'Rejected'"
      );
    }
    return true;
  }),
];

module.exports = {
  validateIdInParam,
  validateAddReservationData,
  validateUpdateReservationData,
};
