import React, { useState, useEffect, useRef, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  Container,
  Typography,
  Checkbox,
  RadioGroup,
  Radio,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { DatePicker, DateField } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const ReservationForm = () => {
  const userCtx = useContext(UserContext);
  const [reservation, setReservation] = useState({
    reservationId: "REV-" + uuidv4(),
    reservationDate: new Date(),
    memberId: "",
  });

  const [members, setMembers] = useState([]);
  const [date, setDate] = useState([]);
  const [time, setTime] = useState([]);
  const [pax, setPax] = useState([]);
  const [value, setValue] = useState(dayjs("2022-04-17"));
  const [status, setStatus] = useState([]);

  const fetchData = useFetch();

  //for adding new reservations

  const fetchMembers = async () => {
    const res = await fetchData(
      "/users/member",
      undefined,
      undefined,
      userCtx.accessToken
    );
    setMembers(res.data);
  };

  useEffect(() => {
    fetchMembers();
    console.log(members);
  }, []);

  // API PUT Call
  const addReservation = async () => {
    const res = await fetchData(
      "/reservations",
      "PUT",
      {
        reservationId: reservation.reservationId,
        memberId: reservation.memberId,
        reservationDate: date,
        reservationTime: time,
        reservationPax: pax,
        reservationStatus: "Pending",
        reservationCreatedDate: reservation.reservationDate,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      console.log("Reservation Added Successfully");
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReservation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Add a New Reservation
        </Typography>
        <br />
        <TextField
          label="Member ID"
          name="memberId"
          value={reservation.memberId}
          onChange={handleInputChange}
          fullWidth
          placeholder="Search for a member..."
          inputProps={{
            list: "member-options",
            autoComplete: "off",
          }}
        />
        <datalist id="member-options">
          {members.map((member) => (
            <option key={member.memberId} value={member.memberId}>
              {member.memberId}
            </option>
          ))}
        </datalist>
        <FormControl fullWidth>
          <Typography>Date</Typography>
          <TextField
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          ></TextField>
          <br />
          <Typography>Time</Typography>
          <TextField
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          ></TextField>
          <br />
          <Typography>Pax</Typography>
          <TextField
            value={pax}
            onChange={(e) => {
              setPax(e.target.value);
            }}
          ></TextField>
          <br />
          <Typography>Status</Typography>
          <TextField value={"Pending"}>Pending</TextField>
          <Button onClick={addReservation}>Add Reservation</Button>
        </FormControl>
      </Container>
    </div>
  );
};

export default ReservationForm;
