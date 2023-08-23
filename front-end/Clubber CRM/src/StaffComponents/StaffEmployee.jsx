import { useState, useContext, useEffect } from "react";
import * as React from "react";

import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import StaffModal from "./StaffModal";

import Container from "@mui/material/Container";
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Typography,
} from "@mui/material";

const StaffEmployee = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const [staffs, setStaffs] = useState([]);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [selectedStaffName, setSelectedStaffName] = useState("");
  const [selectedStaffId, setSelectedStaffId] = useState("");

  const getStaff = async () => {
    const res = await fetchData(
      "/users/staff",
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      setStaffs(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getStaff();
  }, []);

  // search query
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStaffs = staffs.filter((staff) => {
    const lowerSearchQuery = searchQuery.toLowerCase();
    return (
      staff.name.toLowerCase().includes(lowerSearchQuery) ||
      staff.staffId.toLowerCase().includes(lowerSearchQuery)
    );
  });

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate the range of staff members to display based on pagination
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <div style={{ marginLeft: "20px" }}>
      <Container sx={{ textAlign: "left", marginBottom: "20px" }}>
        <Typography variant="h5">Staff Database</Typography>
        <input
          type="text"
          placeholder="Search by Name or Staff ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>isActive</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Staff Id</TableCell>
              <TableCell>Staff Rank</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStaffs.slice(startIndex, endIndex).map((staff) => (
              <TableRow key={staff._id}>
                <TableCell>{staff.email}</TableCell>
                <TableCell>{staff.isActive ? "true" : "false"}</TableCell>
                <TableCell>{staff.name}</TableCell>
                <TableCell>{staff.created_at}</TableCell>
                <TableCell>{staff.staffId}</TableCell>
                <TableCell>{staff.staffRank}</TableCell>
                <TableCell>
                  <Button
                    type="submit"
                    variant="outlined"
                    onClick={() => {
                      setSelectedStaffName(staff.name);
                      setSelectedStaffId(staff.staffId);
                      setShowStaffModal(true);
                    }}
                  >
                    Update
                  </Button>
                  <Button>DELETE</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredStaffs.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
      {showStaffModal && (
        <StaffModal
          staffName={selectedStaffName}
          staffId={selectedStaffId}
          getStaff={getStaff}
          setShowStaffModal={setShowStaffModal}
        />
      )}
    </div>
  );
};

export default StaffEmployee;
