import React, { useContext, useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";

const StaffRevenue = () => {
  const userCtx = useContext(UserContext);
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [staff, setStaff] = useState([]);
  const [members, setMembers] = useState([]);

  const fetchData = useFetch();

  // for updating payment status
  const [updatedPaymentStatus, setUpdatedPaymentStatus] = useState([]);

  // GET for all transactions
  const getTransactions = async () => {
    const res = await fetchData(
      "/transactions",
      undefined,
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      setTransactions(res.data);
      // Fetch product data
      const productRes = await fetchData(
        "/products",
        undefined,
        undefined,
        userCtx.accessToken
      );
      if (productRes.ok) {
        setProducts(productRes.data); // Assuming products are stored in state using `setProducts`
      }
      // Fetch staff data
      const staffRes = await fetchData(
        "/users/staff",
        undefined,
        undefined,
        userCtx.accessToken
      );
      if (staffRes.ok) {
        setStaff(staffRes.data); // Assuming staff members are stored in state using `setStaff`
      }
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

  // PATCH to update payment status
  const handlePaymentStatusChange = async (transaction) => {
    const updatedStatus = !transaction.paymentStatus; // Toggle the payment status
    console.log(transaction.transactionId);
    const res = await fetchData(
      `/transactions/${transaction.transactionId}`,
      "PATCH",
      { paymentStatus: updatedStatus },
      userCtx.accessToken
    );
    if (res.ok) {
      getTransactions();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  // search query
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = transactions.filter((transaction) => {
    const lowerSearchQuery = searchQuery.toLowerCase();
    const matchesTransactionId = transaction.transactionId
      .toLowerCase()
      .includes(lowerSearchQuery);
    const member = members.find((m) => m.memberId === transaction.memberId);
    const matchesMemberName =
      member && member.name.toLowerCase().includes(lowerSearchQuery);

    return matchesTransactionId || matchesMemberName;
  });

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value, 5);
    setPage(0);
  };

  // Calculate the range of transactions to display based on pagination
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(
    startIndex + rowsPerPage,
    filteredTransactions.length
  );

  return (
    <>
      <div style={{ marginLeft: "20px" }}>
        <Container sx={{ textAlign: "left", marginBottom: "20px" }}>
          <Typography variant="h5">Bar Tab</Typography>

          <input
            type="text"
            placeholder="Search by Transaction ID or Member Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Transaction Date</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>
                  Product Amount
                  <br /> (S$)
                </TableCell>
                <TableCell>Staff Name</TableCell>
                <TableCell>Member Name</TableCell>
                <TableCell>Payment Collected?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions
                .slice(startIndex, endIndex)
                .map((transaction) => {
                  const product = products.find(
                    (p) => p.productId === transaction.productId
                  );
                  const staffMember = staff.find(
                    (s) => s.staffId === transaction.staffId
                  );
                  const member = members.find(
                    (m) => m.memberId === transaction.memberId
                  );

                  return (
                    <TableRow key={transaction.transactionId}>
                      <TableCell>{transaction.transactionId}</TableCell>
                      <TableCell>
                        {transaction.transactionDate
                          ? new Date(
                              transaction.transactionDate
                            ).toLocaleDateString()
                          : ""}
                      </TableCell>
                      <TableCell>
                        {product ? product.productName : ""}
                      </TableCell>
                      <TableCell>
                        {product ? product.productPrice : ""}
                      </TableCell>
                      <TableCell>
                        {staffMember ? staffMember.name : ""}
                      </TableCell>
                      <TableCell>{member ? member.name : ""}</TableCell>
                      <TableCell>
                        <Checkbox
                          size="small"
                          defaultChecked={transaction.paymentStatus}
                          onChange={() =>
                            handlePaymentStatusChange(transaction)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredTransactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Container>
      </div>
    </>
  );
};

export default StaffRevenue;
