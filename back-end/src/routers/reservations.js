const express = require("express");

const {
  seedReservations,
  getAllReservations,
  getReservationById,
  addNewReservations,
  updateReservationById,
} = require("../controllers/reservations");

const {
  validateIdInParam,
  validateAddReservationData,
  validateUpdateReservationData,
} = require("../validators/reservations");

const checkValid = require("../middleware/checkValid");

const router = express.Router();

router.get("/seed", seedReservations);
router.get("/", getAllReservations);
router.put("/", validateAddReservationData, checkValid, addNewReservations);
router.post(
  "/:reservationId",
  validateIdInParam,
  checkValid,
  getReservationById
);
router.patch(
  "/:reservationId",
  validateIdInParam,
  validateUpdateReservationData,
  checkValid,
  updateReservationById
);

module.exports = router;
