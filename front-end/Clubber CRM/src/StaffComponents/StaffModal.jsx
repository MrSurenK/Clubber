import * as React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import styles from "./Overlay.module.css";

const Overlay = (props) => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const nameRef = useRef();
  const isActiveRef = useRef();
  const isStaffRef = useRef();
  const staffRankRef = useRef();
  const [displayStaffRank, setDisplayStaffRank] = useState([]);

  const updateStaff = async (staffId) => {
    const updateData = {};

    if (nameRef.current.value) updateData.name = nameRef.current.value;
    if (isActiveRef.current.value)
      updateData.isActive = isActiveRef.current.value;
    if (isStaffRef.current.value) updateData.isStaff = isStaffRef.current.value;
    if (staffRankRef.current.value)
      updateData.staffRank = staffRankRef.current.value;

    const res = await fetchData(
      "/users/staff/" + staffId,
      "PATCH",
      updateData,
      userCtx.accessToken
    );
    if (res.ok) {
      props.getStaff();
      props.setShowStaffModal(false);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const getDisplayStaffRank = async () => {
    const res = await fetchData("/staffRank/get");

    if (res.ok) {
      setDisplayStaffRank(res.data);
    } else {
      console.log(res.data);
    }
  };

  useEffect(() => {
    getDisplayStaffRank();
  }, []);

  return (
    <div className={styles.backdrop}>
      <div className={`${styles.modal} container`}>
        <Container component="main" maxWidth="xs">
          <Typography component="h1" variant="h6">
            Update User
          </Typography>
          <br />
          <Typography component="h1" variant="h6">
            {props.staffName}
          </Typography>
          <br />
          <Typography component="h1" variant="h6">
            {props.staffId}
          </Typography>
          <br />
          <Box>
            <TextField
              required
              fullWidth
              id="formName"
              label="Name"
              name="name"
              autoComplete="name"
              inputRef={nameRef}
            />
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
              <MenuItem></MenuItem>
            </TextField>
            <br />
            <br />
            <TextField
              required
              fullWidth
              id="formIsStaff"
              label="Is Staff"
              name="Staff"
              select
              inputRef={isStaffRef}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </TextField>
            <br />
            <br />
            <TextField
              required
              fullWidth
              id="formStaffRank"
              label="Staff Rank"
              name="Staff Rank"
              select
              inputRef={staffRankRef}
            >
              {displayStaffRank.map((rank) => (
                <MenuItem key={rank.staffRank} value={rank.staffRank}>
                  {rank.staffRank}
                </MenuItem>
              ))}
            </TextField>
            <br />
            <br />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => updateStaff(props.staffId)}
            >
              Update
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => props.setShowStaffModal(false)}
            >
              Cancel
            </Button>
          </Box>
        </Container>
      </div>
    </div>
  );
};

const StaffModal = (props) => {
  return (
    <>
      <Overlay
        staffName={props.staffName}
        staffId={props.staffId}
        getStaff={props.getStaff}
        setShowStaffModal={props.setShowStaffModal}
      />
    </>
  );
};

export default StaffModal;
