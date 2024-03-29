import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EarningsperMonth from "../DashboardComponents/EarningsperMonth";
import ReceivablesperMonth from "../DashboardComponents/ReceivablesperMonth";
import TopSpenders from "../DashboardComponents/TopSpenders";
import NumberOfMembers from "../DashboardComponents/NumberOfMembers";
import TopOweMoney from "../DashboardComponents/TopOweMoney";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f2f2f2",
  ...theme.typography.body2,
  padding: theme.spacing(),
  color: theme.palette.text.secondary,
}));

const StaffDashboard = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1, p: 5 }}>
        <Typography component="h1" variant="h4">
          Revenue Data
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item>
              <EarningsperMonth></EarningsperMonth>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <ReceivablesperMonth></ReceivablesperMonth>
            </Item>
          </Grid>
        </Grid>
        <br />
        <br />
        <Typography component="h1" variant="h4">
          Member Data
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item>
              <NumberOfMembers></NumberOfMembers>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <TopSpenders></TopSpenders>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <TopOweMoney></TopOweMoney>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default StaffDashboard;
