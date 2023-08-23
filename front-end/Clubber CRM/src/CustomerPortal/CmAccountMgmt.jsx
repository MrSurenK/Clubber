import * as React from "react";
import { useState, useRef, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const CmAccountMgmt = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  const curPasswordRef = useRef();
  const newPasswordRef = useRef();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleChangePassword = async () => {
    const data = {
      id: userCtx.userId,
      currentPassword: curPasswordRef.current.value,
      newPassword: newPasswordRef.current.value,
    };

    const res = await fetchData("/auth/reset", "POST", data);

    if (res.ok) {
      // console.log("Reset Password successful", res.data);
      alert(JSON.stringify(res.data));
    } else {
      // console.error("Reset Password failed:", res.data);
      alert(JSON.stringify(res.data));
    }
  };

  const toggleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h6">
          Account Management
        </Typography>
        <br />
        <Typography component="h1" variant="h6">
          Change Password
        </Typography>
        <br />
        <Box>
          <TextField
            required
            fullWidth
            name="Current Password"
            label="Current Password"
            type={showCurrentPassword ? "text" : "password"}
            id="Current Password"
            autoComplete="Current Password"
            inputRef={curPasswordRef}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowCurrentPassword}>
                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <br />
          <br />
          <TextField
            required
            fullWidth
            name="New Password"
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            id="New Password"
            autoComplete="New Password"
            inputRef={newPasswordRef}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowNewPassword}>
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <br />
          <br />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleChangePassword}
          >
            Change Password
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default CmAccountMgmt;
