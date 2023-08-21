import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { ThemeProvider, Typography, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";

const MemberDisplay = () => {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState([]);

  const fetchData = useFetch();
  // Get members from API
  const getMembers = async () => {
    const res = await fetchData("/users/member", "GET");
    if (res.ok) {
      setMembers(res.data);
      console.log(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  const handleSearch = () => {
    return members.filter((member) => {
      return (
        member.name.toLowerCase().includes(search) ||
        member.memberId.includes(search) ||
        // Excluded member.
        member.email.toLowerCase().includes(search)
      );
    });
  };

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
        <Container fixed sx={{ textAlign: "center", marginTop: "35em" }}>
          <Typography variant="h4">Member List</Typography>
          <TextField
            label="Search Member..."
            variant="outlined"
            sx={{ mb: 5, width: "40%" }}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          ></TextField>

          <TableContainer sx={{ textAlign: "center", marginBottom: "50vh" }}>
            <Table>
              <TableHead>
                <TableRow>
                  {[
                    "Member ID",
                    "Name",
                    "email",
                    "Rank",
                    "Total Spend",
                    "Outstanding Amount",
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
                {handleSearch().map((row) => {
                  return (
                    <TableRow
                      sx={{
                        cursor: "pointer",
                      }}
                      key={row.name}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.memberId}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.memberRank}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    </>
  );
};

export default MemberDisplay;
