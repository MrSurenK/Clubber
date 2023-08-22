import React, { useContext, useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";

const Reservations = () => {
  // Declare states to store table variables
  const [reservation, setReservation] = useState([]);

  // For pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchData = useFetch();

  // For confirming/rejecting reservation
  const [confirm, setConfirm] = useState([]);

  // Get API call
  const getReservations = async () => {
    const res = await fetchData("/reservations");

    if (res.ok) {
      setReservation(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getReservations();
    console.log(reservation);
  }, []);

  return <></>;
};

export default Reservations;
