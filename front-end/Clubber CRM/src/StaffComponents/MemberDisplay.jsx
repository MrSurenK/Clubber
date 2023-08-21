import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import {
  Typography,
  TextField,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
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
  const [transactions, setTransactions] = useState([]);
  // Due to async nature of transaction call, require loading for table
  const [loading, setLoading] = useState(false);

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

  const getTransactions = async (memberId) => {
    const res = await fetchData("/transactions/totalamount/" + memberId, "GET");
    console.log("Transaction response for", memberId, ":", res);
    if (res.ok) {
      setTransactions((prevTransactions) => ({
        ...prevTransactions,
        [memberId]: res.data.totalAmount,
      }));
      console.log(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const fetchTable = async () => {
    await Promise.all(
      members.map((member) => getTransactions(member.memberId))
    );
    setLoading(false); // Set loading to false after all transactions are fetched
  };

  useEffect(() => {
    getMembers();
  }, []);

  useEffect(() => {
    fetchTable();
  }, [members]); // Depend on members instead of transactions

  console.log("Transaction state: ", transactions);

  const handleSearch = () => {
    return members.filter((member) => {
      return (
        member.name.toLowerCase().includes(search) ||
        member.memberId.toLowerCase().includes(search) ||
        member.email.toLowerCase().includes(search)
      );
    });
  };

  return (
    <>
      <Container fixed sx={{ textAlign: "center" }}>
        <Typography variant="h4">Member List</Typography>
        <TextField
          label="Search Member..."
          variant="outlined"
          sx={{ mb: 5, width: "40%" }}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        ></TextField>

        <TableContainer component={Paper}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress sx={{ color: "purple" }} />
            </Box>
          ) : (
            <Table>
              <TableHead sx={{ bgcolor: "#ffc400" }}>
                <TableRow>
                  {[
                    "Name",
                    "Member ID",
                    "Email",
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
                      <TableCell>
                        {transactions[row.memberId]
                          ? transactions[row.memberId]
                          : "No transactions"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </>
  );
};

export default MemberDisplay;
