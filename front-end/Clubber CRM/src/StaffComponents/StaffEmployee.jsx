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

  return (
    <div style={{ marginLeft: "20px" }}>
      <Container sx={{ textAlign: "left", marginBottom: "20px" }}>
        <Typography variant="h5">Staff Database</Typography>
        <input
          type="text"
          placeholder="Search by Transaction ID or Member Name"
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
            {staffs.map((staff) => (
              <TableRow key={staff._id}>
                <TableCell component="th" scope="row">
                  {staff.email}
                </TableCell>
                <TableCell align="right">
                  {staff.isActive ? "true" : "false"}
                </TableCell>
                <TableCell align="right">{staff.name}</TableCell>
                <TableCell align="right">{staff.created_at}</TableCell>
                <TableCell align="right">{staff.staffId}</TableCell>
                <TableCell align="right">{staff.staffRank}</TableCell>
                <TableCell align="right">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
