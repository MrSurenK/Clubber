import React, { useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography, MenuItem } from "@mui/material";
import MemberDisplay from "./MemberDisplay";
import useFetch from "../hooks/useFetch";

const MemberModal = (props) => {
  // const memberRankRef = useRef("");

  const nameRef = useRef(props.name);
  const memberIdRef = useRef(props.id);
  const memberRankRef = useRef("");
  const emailRef = useRef("");

  const fetchData = useFetch();

  const updateMember = async (memberId) => {
    const res = await fetchData("/users/member/" + memberId, "PATCH", {
      name: nameRef.current,
      memberId: memberIdRef.current,
      memberRank: memberRankRef.current.value,
      email: emailRef.current.value,
    });

    if (res.ok) {
      props.getMembers();
      handleClose();
      console.log(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    nameRef.current = props.name;
    memberIdRef.current = props.id;
    // emailRef.current.value = props.email;
    memberRankRef.current.value = props.rank;
    // console.log(props.rank);
  }, [props.name, props.id, props.email, props.rank]);

  return (
    <div>
      {console.log(props.rank)}
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Update Member Details</DialogTitle>
        <Typography>{props.name}</Typography>
        <Typography>{props.id}</Typography>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          inputRef={emailRef}
        />
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
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button onClick={updateMember}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MemberModal;
