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
import MemberModal from "./MemberModal";

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
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell align="right">isActive</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Member Id</TableCell>
              <TableCell align="right">Member Rank</TableCell>
              <TableCell align="right">BarTab Active</TableCell>
              <TableCell align="right">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow
                key={member._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {member.email}
                </TableCell>
                <TableCell align="right">
                  {member.isActive ? "true" : "false"}
                </TableCell>
                <TableCell align="right">{member.name}</TableCell>
                <TableCell align="right">{member.created_at}</TableCell>
                <TableCell align="right">{member.memberId}</TableCell>
                <TableCell align="right">{member.memberRank}</TableCell>
                <TableCell align="right">
                  {member.barTabActive ? "true" : "false"}
                </TableCell>
                <TableCell align="right">
                  <button
                    onClick={() => {
                      setSelectedMemberName(member.name);
                      setSelectedMemberId(member.memberId);
                      setShowMemberModal(true);
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

      {showMemberModal && (
        <MemberModal
          memberName={selectedMemberName}
          memberId={selectedMemberId}
          getMembers={getMembers}
          setShowMemberModal={setShowMemberModal}
        />
      )}
    </>
  );
};

export default MemberDisplay;
