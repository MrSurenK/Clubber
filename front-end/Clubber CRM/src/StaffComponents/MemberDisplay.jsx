import React from "react";
import useFetch from "../hooks/useFetch";
import { ThemeProvider, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";

const MemberDisplay = () => {
  const fetchData = useFetch();
  // Get members from API
  const getMembers = async () => {
    const res = await fetchData("/users/member", "GET");
    if (res.ok) {
      console.log(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  getMembers();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          marginLeft: "20%",
        }}
      >
        <Container
          maxWidth="md"
          sx={{ textAlign: "center", marginBottom: "50vh" }}
        >
          <Typography variant="h5">Member List</Typography>
        </Container>
      </div>
    </>
  );
};

export default MemberDisplay;
