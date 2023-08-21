const Reservations = require("../models/Reservations");
const ReservationsModel = require("../models/Reservations");

//SEED - seed reservations
const seedReservations = async (req, res) => {
  try {
    await ReservationsModel.deleteMany();
    await ReservationsModel.create([
      {
        _id: "64d0f3f75676c304033d8c89",
        reservationId: "R0000001",
        memberId: "M0000001",
        reservationDate: "2023-08-16",
        reservationTime: "19:00",
        reservationPax: 4,
        reservationStatus: "Pending",
        reservationCreatedDate: "2023-08-16",
      },
      {
        _id: "64d0f3f75676c304033d8c88",
        reservationId: "R0000002",
        memberId: "M0000002",
        reservationDate: "2023-08-20",
        reservationTime: "20:00",
        reservationPax: 2,
        reservationStatus: "Pending",
        reservationCreatedDate: "2023-08-16",
      },
    ]);
    res.json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: error.message });
  }
};

//GET - get all reservations
const getAllReservations = async (req, res) => {
  try {
    const allReservations = await ReservationsModel.find();
    res.json(allReservations);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.msg });
  }
};

//PUT - add new reservation
const addNewReservations = async (req, res) => {
  try {
    const newReservation = {
      reservationId: req.body.reservationId,
      memberId: req.body.memberId,
      reservationDate: req.body.reservationDate,
      reservationTime: req.body.reservationTime,
      reservationPax: req.body.reservationPax,
      reservationStatus: req.body.reservationStatus,
      reservationCreatedDate: req.body.reservationCreatedDate,
    };
    await ReservationsModel.create(newReservation);
    res.json({ status: "ok", msg: "new reservation added" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.msg });
  }
};

//POST - get reservation by reservationId
const getReservationById = async (req, res) => {
  try {
    const reservation = await ReservationsModel.findOne({
      reservationId: req.params.reservationId,
    });
    res.json(reservation);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.msg });
  }
};

//PATCH - update reservation by reservationId
const updateReservationById = async (req, res) => {
  try {
    const updatedReservation = {};
    if ("reservationDate" in req.body)
      updatedReservation.reservationDate = req.body.reservationDate;
    if ("reservationTime" in req.body)
      updatedReservation.reservationTime = req.body.reservationTime;
    if ("reservationPax" in req.body)
      updatedReservation.reservationPax = req.body.reservationPax;
    if ("reservationStatus" in req.body)
      updatedReservation.reservationStatus = req.body.reservationStatus;

    const result = await Reservations.findOneandUpdate(
      { reservationId: req.params.reservationId },
      updatedReservation,
      { new: true }
    );
    if (!result) {
      return res
        .status(404)
        .json({ status: "error", msg: "Reservation not found" });
    }
    res.json({ status: "ok", msg: "Reservation Updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.msg });
  }
};

module.exports = {
  seedReservations,
  getAllReservations,
  getReservationById,
  addNewReservations,
  updateReservationById,
};
