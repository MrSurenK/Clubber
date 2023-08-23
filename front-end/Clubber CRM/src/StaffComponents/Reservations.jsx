import React, { useEffect, useState, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { TextField } from "@mui/material";
import ReservationModal from "./ReservationModal";

const Reservations = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const [reservations, setReservations] = useState([]);

  const [showMemberModal, setShowMemberModal] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [selectedreservationId, setSelectedReservationId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPax, setSelectedPax] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const getReservations = async () => {
    const res = await fetchData(
      "/reservations/",
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      setReservations(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getReservations();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ReservationId</TableCell>
              <TableCell align="left">Member Id</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Time</TableCell>
              <TableCell align="right">Pax</TableCell>
              <TableCell align="center">Reservation Status</TableCell>
              <TableCell align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow
                key={reservation._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {reservation.reservationId}
                </TableCell>
                <TableCell align="left">{reservation.memberId}</TableCell>
                <TableCell align="left">
                  {reservation.reservationDate}
                </TableCell>
                <TableCell align="left">
                  {reservation.reservationTime}
                </TableCell>
                <TableCell align="right">
                  {reservation.reservationPax}
                </TableCell>
                <TableCell align="center">
                  {reservation.reservationStatus}
                </TableCell>
                <TableCell align="center">
                  <button
                    onClick={() => {
                      setSelectedDate(reservation.reservationDate);
                      setSelectedTime(reservation.reservationTime);
                      setSelectedPax(reservation.reservationPax);
                      setSelectedStatus(reservation.reservationStatus);
                      setSelectedReservationId(reservation.reservationId);
                      setShowMemberModal(true);
                    }}
                  >
                    Edit Symbol
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showMemberModal && (
        <ReservationModal
          reservationId={selectedreservationId}
          memberId={selectedMemberId}
          getReservations={getReservations}
          setShowMemberModal={setShowMemberModal}
        />
      )}
    </>
  );
};

export default Reservations;
