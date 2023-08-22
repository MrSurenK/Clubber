import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import useFetch from "../hooks/useFetch";

export default function SignUp() {
  const fetchData = useFetch();
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formIsActive, setFormIsActive] = useState(true);
  const [formIsStaff, setFormIsStaff] = useState(false);
  const [formStaffRank, setFormStaffRank] = useState("");
  const [formIsMember, setFormIsMember] = useState(false);
  const [formMemberRank, setFormMemberRank] = useState("");
  const [displayStaffRank, setDisplayStaffRank] = useState([]);
  const [displayMemberRank, setDisplayMemberRank] = useState([]);

  const getDisplayStaffRank = async () => {
    const res = await fetchData("/staffRank/get");

    if (res.ok) {
      setDisplayStaffRank(res.data);
    } else {
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
    getDisplayStaffRank();
    getDisplayMemberRank();
  }, []);

  const handleRegister = async () => {
    const registerData = {
      name: formName,
      email: formEmail,
      password: formPassword,
      isActive: formIsActive,
      isStaff: formIsStaff,
      staffRank: formStaffRank,
      isMember: formIsMember,
      memberRank: formMemberRank,
    };

    const res = await fetchData("/auth/register", "PUT", registerData);

    if (res.ok) {
      setFormName("");
      setFormEmail("");
      setFormPassword("");
      setFormIsActive(true);
      setFormIsStaff(false);
      setFormStaffRank("");
      setFormIsMember(false);
      setFormMemberRank("");

      console.log("Registration successful:", res.data);
      // You can add logic here to navigate to a success page or perform other actions.
    } else {
      console.error("Registration failed:", res.data);
      // You can display an error message to the user or perform other error handling.
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Register New User
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
          value={formName}
          onChange={(e) => {
            setFormName(e.target.value);
          }}
        />{" "}
        <br />
        <br />
        <TextField
          required
          fullWidth
          id="formEmail"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={formEmail}
          onChange={(e) => {
            setFormEmail(e.target.value);
          }}
        />{" "}
        <br />
        <br />
        <TextField
          required
          fullWidth
          name="formPassword"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={formPassword}
          onChange={(e) => {
            setFormPassword(e.target.value);
          }}
        />{" "}
        <br />
        <br />
        {/* New drop-down inputs */}
        <TextField
          required
          fullWidth
          id="formIsStaff"
          label="Is Staff"
          name="isStaff"
          select
          value={formIsStaff}
          onChange={(e) => {
            setFormIsStaff(e.target.value);
          }}
        >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </TextField>{" "}
        <br />
        <br />
        <TextField
          required
          fullWidth
          id="formStaffRank"
          label="Staff Rank"
          name="staffRank"
          select
          value={formStaffRank}
          onChange={(e) => {
            setFormStaffRank(e.target.value);
          }}
        >
          {displayStaffRank.map((rank) => (
            <MenuItem key={rank.staffRank} value={rank.staffRank}>
              {rank.staffRank}
            </MenuItem>
          ))}
        </TextField>{" "}
        <br />
        <br />
        <TextField
          required
          fullWidth
          id="formIsMember"
          label="Is Member"
          name="isMember"
          select
          value={formIsMember}
          onChange={(e) => {
            setFormIsMember(e.target.value);
          }}
        >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </TextField>{" "}
        <br />
        <br />
        <TextField
          required
          fullWidth
          id="formMemberRank"
          label="Member Rank"
          name="formMemberRank"
          select
          value={formMemberRank}
          onChange={(e) => setFormMemberRank(e.target.value)}
        >
          {displayMemberRank.map((rank) => (
            <MenuItem key={rank.memberRank} value={rank.memberRank}>
              {rank.memberRank}
            </MenuItem>
          ))}
        </TextField>{" "}
        <br />
        <br />
        <Button
          type="button"
          fullWidth
          variant="contained"
          onClick={handleRegister}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}
