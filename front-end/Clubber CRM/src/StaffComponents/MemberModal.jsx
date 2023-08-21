import React, { useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography, MenuItem } from "@mui/material";

const MemberModal = (props) => {
  return (
    <div>
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
        />
        <TextField
          id="rank"
          select
          label="Select"
          defaultValue="gold"
          helperText="Please select the rank"
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
          <Button onClick={props.handleClose}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MemberModal;
