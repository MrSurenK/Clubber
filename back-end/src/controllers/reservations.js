const Reservations = require("../models/Reservations");
const ReservationsModel = require("../models/Reservations");
const { v4: uuidv4 } = require("uuid");

//SEED - seed reservations
const seedReservations = async (req, res) => {
  try {
    await ReservationsModel.deleteMany();
    await ReservationsModel.create([
      {
        _id: "64e60af324766f938619039e",
        reservationId: "REV-29cfc2ae-c44a-4bca-8ca5-35565a4ddd84",
        memberId: "MEM-1692338-RAQVk6-243988",
        reservationDate: "2023-08-28T16:00:00.000Z",
        reservationTime: "10:20",
        reservationPax: 10,
        reservationStatus: "Pending",
        reservationCreatedDate: "2023-08-23T12:57:50.129Z",
      },
      {
        _id: "64e60b6324766f93861903a2",
        reservationId: "REV-1576e227-ef60-4528-8ac3-484bd40cdae6",
        memberId: "MEM-1692774-wRLzH1-384018",
        reservationDate: "2023-08-29T16:00:00.000Z",
        reservationTime: "14:30",
        reservationPax: 2,
        reservationStatus: "Pending",
        reservationCreatedDate: "2023-08-23T12:57:50.129Z",
      },
      {
        _id: "64e60b9324766f93861903a6",
        reservationId: "REV-eab9b150-cd95-42ec-805a-07ea00549219",
        memberId: "MEM-1692780-g94ksu-784282",
        reservationDate: "2023-10-29T16:00:00.000Z",
        reservationTime: "18:00",
        reservationPax: 4,
        reservationStatus: "Pending",
        reservationCreatedDate: "2023-08-23T12:57:50.129Z",
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
      reservationId: "REV-" + uuidv4(),
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

    const result = await Reservations.findOneAndUpdate(
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
