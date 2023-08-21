import React, { useContext, useEffect, useRef, useState } from "react";

import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";

const StaffRevenue = () => {
  // const userCtx = useContext(UserContext);
  const [transactions, setTransactions] = useState([]);
  const fetchData = useFetch();
  // const transactionIdRef = useRef("");
  // const transactionDateRef = useRef("");
  // const paymentStatusRef = useRef("");
  // const productIdRef = useRef("");
  // const memberIdRef = useRef("");
  // const staffIdRef = useRef("");

  const getTransactions = async () => {
    const res = await fetchData("/transactions");

    if (res.ok) {
      setTransactions(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  // const addTransactions = async () => {
  //   const res = await fetchData(
  //     "/transactions",
  //     "PUT",
  //     {
  //       transactionId: transactionIdRef.current.value,
  //       transactionDate: transactionDateRef.current.value,
  //       paymentStatus: paymentStatusRef.current.value,
  //       productId: productIdRef.current.value,
  //       memberId: memberIdRef.current.value,
  //       staffId: staffIdRef.current.value,
  //     },
  //     userCtx.accessToken
  //   );

  //   if (res.ok) {
  //     getTransactions();
  //   } else {
  //     alert(JSON.stringify(res.data));
  //     console.log(res.data);
  //   }
  // };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
      <div>
        <Container
          maxWidth="md"
          sx={{ textAlign: "center", marginBottom: "50vh" }}
        >
          <Button>Add New Transaction</Button>
          <Typography variant="h5">Existing Transactions</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Transaction Date</TableCell>
                <TableCell>Payment Status</TableCell>
                <TableCell>Product ID</TableCell>
                <TableCell>Staff ID</TableCell>
                <TableCell>Member ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.transactionId}>
                  <TableCell>{transaction.transactionId}</TableCell>
                  <TableCell>{transaction.transactionDate}</TableCell>
                  <TableCell>{transaction.paymentStatus}</TableCell>
                  <TableCell>{transaction.productId}</TableCell>
                  <TableCell>{transaction.staffId}</TableCell>
                  <TableCell>{transaction.memberId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container>
      </div>
    </>
  );
};

export default StaffRevenue;
