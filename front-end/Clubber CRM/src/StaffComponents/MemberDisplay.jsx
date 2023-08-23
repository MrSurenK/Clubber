import { useState, useContext, useEffect } from "react";
import * as React from "react";

import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import MemberModal from "./MemberModal";

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

const MemberDisplay = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const [members, setMembers] = useState([]);

  const [showMemberModal, setShowMemberModal] = useState(false);
  const [selectedMemberName, setSelectedMemberName] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState("");

  const getMembers = async () => {
    const res = await fetchData(
      "/users/member",
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      setMembers(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (shouldDelete) {
      const res = await fetchData(
        "/users/all/" + id,
        "DELETE",
        { staffRank: userCtx.staffRank },
        userCtx.accessToken
      );

      if (res.ok) {
        getMembers();
      } else {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      }
    }
  };

  // search query
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = members.filter((member) => {
    const lowerSearchQuery = searchQuery.toLowerCase();
    return (
      member.name.toLowerCase().includes(lowerSearchQuery) ||
      member.memberId.toLowerCase().includes(lowerSearchQuery)
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

  // Calculate the range of members to display based on pagination
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <div style={{ marginLeft: "20px" }}>
      <Container sx={{ textAlign: "left", marginBottom: "20px" }}>
        <Typography variant="h5">Member Database</Typography>
        <input
          type="text"
          placeholder="Search by Name or Member ID"
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
              <TableCell>Member Id</TableCell>
              <TableCell>Member Rank</TableCell>
              <TableCell>BarTab Active</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMembers.slice(startIndex, endIndex).map((member) => (
              <TableRow key={member._id}>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.isActive ? "true" : "false"}</TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.created_at}</TableCell>
                <TableCell>{member.memberId}</TableCell>
                <TableCell>{member.memberRank}</TableCell>
                <TableCell>{member.barTabActive ? "true" : "false"}</TableCell>
                <TableCell>
                  <Button
                    type="submit"
                    variant="outlined"
                    onClick={() => {
                      setSelectedMemberName(member.name);
                      setSelectedMemberId(member.memberId);
                      setShowMemberModal(true);
                    }}
                  >
                    Update
                  </Button>
                  {userCtx.staffRank === "manager" && (
                    <Button
                      variant="outlined"
                      onClick={() => handleDelete(member._id)}
                    >
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredMembers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
      {showMemberModal && (
        <MemberModal
          memberName={selectedMemberName}
          memberId={selectedMemberId}
          getMembers={getMembers}
          setShowMemberModal={setShowMemberModal}
        />
      )}
    </div>
  );
};

export default MemberDisplay;
