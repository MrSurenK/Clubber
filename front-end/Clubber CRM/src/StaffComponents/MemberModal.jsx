import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { Typography, MenuItem } from "@mui/material";
import MemberDisplay from "./MemberDisplay";
import useFetch from "../hooks/useFetch";
import styles from "./MemberModal.module.css";

const Overlay = (props) => {
  // const memberRankRef = useRef("");
  const fetchData = useFetch();

  const isActiveRef = useRef(false);
  const nameRef = useRef("");
  const isMemberRef = useRef(false);
  const memberRankRef = useRef("");
  const barTabActiveRef = useRef(false);

  const updateMember = async (memberId) => {
    const updateData = {};

    if (isActiveRef.current.value)
      updateData.isActive = isActiveRef.current.value;
    if (nameRef.current.value) updateData.name = nameRef.current.value;
    if (isMemberRef.current.value)
      updateData.isMember = isMemberRef.current.value;
    if (memberRankRef.current.value)
      updateData.memberRank = memberRankRef.current.value;
    if (barTabActiveRef.current.value)
      updateData.barTabActive = barTabActiveRef.current.value;

    const res = await fetchData(
      "/users/member/" + memberId,
      "PATCH",
      updateData
    );

    if (res.ok) {
      props.getMembers();
      props.handleClose();
      console.log(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  // const updateMember = async (memberId) => {
  //   const res = await fetchData("/users/member/" + memberId, "PATCH", {
  //     name: nameRef.current,
  //     memberId: memberIdRef.current,
  //     memberRank: memberRankRef.current.value,
  //     email: emailRef.current.value,
  //   });

  //   if (res.ok) {
  //     props.getMembers();
  //     props.handleClose();
  //     console.log(res.data);
  //   } else {
  //     alert(JSON.stringify(res.data));
  //     console.log(res.data);
  //   }
  // };

  // useEffect(() => {
  //   nameRef.current = props.name;
  //   memberIdRef.current = props.id;
  //   // emailRef.current.value = props.email;
  //   // memberRankRef.current.value = props.rank;
  //   // console.log(props.rank);
  // }, [props.name, props.id, props.email, props.rank]);

  return (
    <div>
      {/* {console.log(props.rank)} */}
      <div open={props.open} onClose={props.handleClose}>
        <div>Update Member Details</div>
        <Typography>{props.name}</Typography>
        <Typography>{props.id}</Typography>
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
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="namel"
          fullWidth
          variant="standard"
          inputRef={nameRef}
        />
        <TextField
          required
          fullWidth
          id="formIsMember"
          label="Is Member"
          name="isMember"
          select
          inputRef={isMemberRef}
        >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </TextField>
        <TextField
          id="rank"
          select
          label="Select"
          defaultValue=""
          helperText="Please select the rank"
          inputRef={memberRankRef}
        >
          {[{ status: "bronze" }, { status: "silver" }, { status: "gold" }].map(
            (option) => (
              <MenuItem key={option.status} value={option.status}>
                {option.status}
              </MenuItem>
            )
          )}
        </TextField>
        <TextField
          required
          fullWidth
          id="barTabActive"
          label="BarTab Active"
          name="barTabActive"
          select
          inputRef={barTabActiveRef}
        >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </TextField>
        <div>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button onClick={() => updateMember(props.memberId)}>Update</Button>
        </div>
      </div>
    </div>
  );
};

const MemberModal = (props) => {
  return (
    <>
      <Overlay
        memberId={props.memberId}
        getMembers={props.getMembers}
        handleClose={props.handleClose}
      />
    </>
  );
};

export default MemberModal;
