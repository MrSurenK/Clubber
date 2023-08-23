import * as React from "react";
import { useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CmAccountMgmt from "./CmAccountMgmt";
import CustomerQRCode from "../DashboardComponents/CustomerQRCode";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const CustomerDashboard = () => {
  const userCtx = useContext(UserContext);

  return (
    <>
      <Box sx={{ flexGrow: 1, p: 5 }}>
        <Typography component="h1" variant="h4">
          Customer Dashboard
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomerQRCode memberId={userCtx.memberId} />
          </Grid>
          <Grid item xs={6}>
            <Item>
              Member Rank: {userCtx.memberRank}
              Member Id: {userCtx.memberId}
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CustomerDashboard;
