import React, { useEffect, useState } from "react";
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

const Reservations = () => {
  // Declare states to store table variables
  const [reservation, setReservation] = useState([]);

  // For pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 5));
  //   setPage(0);
  // };

  // Search function
  const handleSearch = () => {
    return reservation.filter((reserve) => {
      return (
        reserve.reservationId.toLowerCase().includes(search) ||
        reserve.memberId.toLowerCase().includes(search)
      );
    });
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <>
      <Container fixed sx={{ textAlign: "center" }}>
        <Typography variant="h4">Reservations</Typography>
        <TextField
          label="Search Reservation..."
          variant="outlined"
          sx={{ mb: 5, width: "40%" }}
          onChange={(e) => setSearch(e.target.value.toLowerCase)}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: "#ffc400" }}>
              <TableRow>
                {[
                  "Reservation ID",
                  "Member ID",
                  "Date",
                  "Time",
                  "Pax",
                  "Status",
                ].map((header) => (
                  <TableCell
                    sx={{
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "Exo",
                    }}
                    key={header}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {handleSearch().map((row, idx) => {
                return (
                  <TableRow key={idx}>
                    <TableCell component="th" scope="row">
                      {row.reservationId}
                    </TableCell>
                    <TableCell>{row.memberId}</TableCell>
                    <TableCell>{formatDate(row.reservationDate)}</TableCell>
                    <TableCell>{row.reservationTime}</TableCell>
                    <TableCell>{row.reservationPax}</TableCell>
                    <TableCell>{row.reservationStatus}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Reservations;
