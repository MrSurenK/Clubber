import { useState, useContext, useEffect } from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import StaffModal from "./StaffModal";

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
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell align="right">isActive</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Staff Id</TableCell>
              <TableCell align="right">Staff Rank</TableCell>
              <TableCell align="right">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffs.map((staff) => (
              <TableRow
                key={staff._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
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
                  <button
                    onClick={() => {
                      setSelectedStaffName(staff.name);
                      setSelectedStaffId(staff.staffId);
                      setShowStaffModal(true);
                    }}
                  >
                    Edit Symbol
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showStaffModal && (
        <StaffModal
          staffName={selectedStaffName}
          staffId={selectedStaffId}
          getStaff={getStaff}
          setShowStaffModal={setShowStaffModal}
        />
      )}
    </>
  );
};

export default StaffEmployee;
