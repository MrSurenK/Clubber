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

  return (
    <div style={{ marginLeft: "20px" }}>
      <Container sx={{ textAlign: "left", marginBottom: "20px" }}>
        <Typography variant="h5">Member Database</Typography>
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
              <TableCell>Member Id</TableCell>
              <TableCell>Member Rank</TableCell>
              <TableCell>BarTab Active</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
