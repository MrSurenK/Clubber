import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CmAccountMgmt from "./CmAccountMgmt";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const CustomerDashboard = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1, p: 5 }}>
        <Typography component="h1" variant="h4">
          Customer Dashboard
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item>Customer QR Code</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <CmAccountMgmt></CmAccountMgmt>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CustomerDashboard;
