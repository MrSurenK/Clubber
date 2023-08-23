import * as React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import styles from "./Overlay.module.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Overlay = (props) => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const reservationIdRef = useRef();
  const memberIdRef = useRef();
  const reservationDateRef = useRef();
  const reservationTimeRef = useRef();
  const reservationPaxRef = useRef();
  const reservationStatusRef = useRef();

  const updateReservation = async (reservationId) => {
    const updateData = {};

    if (reservationDateRef.current.value)
      updateData.reservationDate = reservationDateRef.current.value;
    if (reservationTimeRef.current.value)
      updateData.reservationTime = reservationTimeRef.current.value;
    if (reservationPaxRef.current.value)
      updateData.reservationPax = reservationPaxRef.current.value;
    if (reservationStatusRef.current.value)
      updateData.reservationStatus = reservationStatusRef.current.value;

    console.log(updateData);

    const res = await fetchData(
      "/reservations/" + reservationId,
      "PATCH",
      updateData,
      userCtx.accessToken
    );
    if (res.ok) {
      props.getReservations();
      props.setShowMemberModal(false);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={`${styles.modal} container`}>
        <Container>
          <Typography variant="h5" fontWeight="bold">
            Update Reservation
          </Typography>
          <br />
          <Typography>Reservation ID: {props.reservationId}</Typography>
          <Typography>Member ID: {props.memberId}</Typography>
          <br />
          <Box>
            <TextField
              inputRef={reservationDateRef}
              required
              fullWidth
              id="forDate"
              label="Date"
              name="date"
            >
              <DatePicker
                defaultValue={reservationDateRef}
                label="Basic date picker"
              />
            </TextField>
            <br />
            <br />
            <TextField
              required
              fullWidth
              id="forTime"
              label="HH:MM"
              name="time"
              inputRef={reservationTimeRef}
            />
            <br />
            <br />
            <TextField
              required
              fullWidth
              id="formPax"
              label="Pax"
              name="pax"
              inputRef={reservationPaxRef}
            />
            <br />
            <br />
            <TextField
              required
              fullWidth
              id="formReservationStatus"
              label="Status"
              name="reservation status"
              select
              inputRef={reservationStatusRef}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </TextField>
            <br />
            <br />
            <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={() => updateReservation(props.reservationId)}
            >
              Update
            </Button>
            <br />
            <br />
            <Button
              type="button"
              fullWidth
              variant="outlined"
              onClick={() => props.setShowMemberModal(false)}
            >
              Cancel
            </Button>
          </Box>
        </Container>
      </div>
    </div>
  );
};

const ReservationModal = (props) => {
  return (
    <>
      <Overlay
        reservationId={props.reservationId}
        memberId={props.memberId}
        getReservations={props.getReservations}
        setShowMemberModal={props.setShowMemberModal}
      />
    </>
  );
};

export default ReservationModal;
