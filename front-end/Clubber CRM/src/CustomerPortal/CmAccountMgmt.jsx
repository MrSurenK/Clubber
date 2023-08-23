import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const CmAccountMgmt = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            label="Current Password"
            variant="outlined"
            fullWidth
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="New Password"
            variant="outlined"
            fullWidth
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color="primary">
            Change Password
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={4}>
          <TextField
            label="Current Password"
            variant="outlined"
            fullWidth
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="New Email"
            variant="outlined"
            fullWidth
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color="primary">
            Change Email
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CmAccountMgmt;
