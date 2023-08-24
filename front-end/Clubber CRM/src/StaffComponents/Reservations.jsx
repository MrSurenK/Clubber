import React, { useEffect, useState, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import ReservationModal from "./ReservationModal";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { TextField } from "@mui/material";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,

} from "@mui/material";

const Reservations = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const [reservations, setReservations] = useState([]);
  const [members, setMembers] = useState([]);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [selectedreservationId, setSelectedReservationId] = useState("");

  // GET for all reservations
  const getReservations = async () => {
    const res = await fetchData(
      "/reservations/",
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      setReservations(res.data);
      // Fetch member data
      const memberRes = await fetchData(
        "/users/member",
        undefined,
        undefined,
        userCtx.accessToken
      );
      if (memberRes.ok) {
        setMembers(memberRes.data); // Assuming members are stored in state using `setMembers`
      }
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getReservations();
  }, []);

  return (
    <div style={{ marginLeft: "20px" }}>
      <Container sx={{ textAlign: "left", marginBottom: "20px" }}>
        <Typography variant="h5">Reservations</Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ReservationId</TableCell>
              <TableCell>Member Id</TableCell>
              <TableCell>Member Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Pax</TableCell>
              <TableCell>Reservation Status</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => {
              const member = members.find(
                (m) => m.memberId === reservation.memberId
              );
              return (
                <TableRow key={reservation._id}>
                  <TableCell>{reservation.reservationId}</TableCell>
                  <TableCell>{reservation.memberId}</TableCell>
                  <TableCell>{member ? member.name : ""}</TableCell>
                  <TableCell>{reservation.reservationDate}</TableCell>
                  <TableCell>{reservation.reservationTime}</TableCell>
                  <TableCell>{reservation.reservationPax}</TableCell>
                  <TableCell align="center">
                    {reservation.reservationStatus}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      type="submit"
                      variant="outlined"
                      onClick={() => {
                        setSelectedMemberId(reservation.memberId);
                        setSelectedDate(reservation.reservationDate);
                        setSelectedTime(reservation.reservationTime);
                        setSelectedPax(reservation.reservationPax);
                        setSelectedStatus(reservation.reservationStatus);
                        setSelectedReservationId(reservation.reservationId);
                        setShowMemberModal(true);
                      }}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Container>

      {showMemberModal && (
        <ReservationModal
          reservationId={selectedreservationId}
          memberId={selectedMemberId}
          getReservations={getReservations}
          setShowMemberModal={setShowMemberModal}
        />
      )}
    </div>
  );
};

export default Reservations;
