import * as React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import styles from "./Overlay.module.css";

const Overlay = (props) => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const nameRef = useRef();
  const isActiveRef = useRef();
  const isMemberRef = useRef();
  const memberRankRef = useRef();
  const barTabActiveRef = useRef();
  const [displayMemberRank, setDisplayMemberRank] = useState([]);

  const updateMember = async (memberId) => {
    const updateData = {};

    if (nameRef.current.value) updateData.name = nameRef.current.value;
    if (isActiveRef.current.value)
      updateData.isActive = isActiveRef.current.value;
    if (isMemberRef.current.value)
      updateData.isMember = isMemberRef.current.value;
    if (memberRankRef.current.value)
      updateData.memberRank = memberRankRef.current.value;
    if (barTabActiveRef.current.value)
      updateData.barTabActive = barTabActiveRef.current.value;

    const res = await fetchData(
      "/users/member/" + memberId,
      "PATCH",
      updateData,
      userCtx.accessToken
    );
    if (res.ok) {
      props.getMembers();
      props.setShowMemberModal(false);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const getDisplayMemberRank = async () => {
    const res = await fetchData("/memberRank/get");

    if (res.ok) {
      setDisplayMemberRank(res.data);
    } else {
      console.log(res.data);
    }
  };

  useEffect(() => {
    getDisplayMemberRank();
  }, []);

  return (
    <div className={styles.backdrop}>
      <div className={`${styles.modal} container`}>
        <Container>
          <Typography variant="h5" fontWeight="bold">
            Update User
          </Typography>
          <br />
          <Typography>Member Name: {props.memberName}</Typography>
          <Typography>Member ID: {props.memberId}</Typography>
          <br />
          <Box>
            <TextField
              required
              fullWidth
              id="formName"
              label="Name"
              name="name"
              autoComplete="name"
              defaultValue={props.memberName}
              inputRef={nameRef}
            />
            <br />
            <br />
            <TextField
              required
              fullWidth
              id="formMemberRank"
              label="Member Rank"
              name="Member Rank"
              select
              inputRef={memberRankRef}
            >
              {displayMemberRank.map((rank) => (
                <MenuItem key={rank.memberRank} value={rank.memberRank}>
                  {rank.memberRank}
                </MenuItem>
              ))}
            </TextField>
            <br />
            <br />
            <TextField
              required
              fullWidth
              id="formIsActive"
              label="Is Active"
              name="isActive"
              select
              inputRef={isActiveRef}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </TextField>
            <br />
            <br />
            <TextField
              required
              fullWidth
              id="formIsMember"
              label="Is Member"
              name="Member"
              select
              inputRef={isMemberRef}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </TextField>
            <br />
            <br />
            <TextField
              required
              fullWidth
              id="formBarTabActive"
              label="BarTab Active"
              name="BarTab Active"
              select
              inputRef={barTabActiveRef}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </TextField>
            <br />
            <br />
            <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={() => updateMember(props.memberId)}
            >
              Update
            </Button>
            <br /> <br />
            <Button
              type="button"
              fullWidth
              variant="outlined"
              onClick={() => props.setShowMemberModal(false)}
            >
              Cancel
            </Button>
          </Box>
        </Container>
      </div>
    </div>
  );
};

const MemberModal = (props) => {
  return (
    <>
      <Overlay
        memberName={props.memberName}
        memberId={props.memberId}
        getMembers={props.getMembers}
        setShowMemberModal={props.setShowMemberModal}
      />
    </>
  );
};

export default MemberModal;
