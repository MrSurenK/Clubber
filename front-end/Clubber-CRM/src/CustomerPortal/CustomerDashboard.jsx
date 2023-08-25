import * as React from "react";
import { useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CustomerQRCode from "../DashboardComponents/CustomerQRCode";
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
        <Typography component="h1" variant="h5">
          Use this QR Code to Sign In
        </Typography>
        <Item>
          <CustomerQRCode memberId={userCtx.memberId} />

          <br />

          <Typography component="h2" variant="h4">
            Member Rank:
          </Typography>
          <Typography component="h2" variant="h4" style={{ color: "gold" }}>
            {userCtx.memberRank.toUpperCase()}
          </Typography>
          <br />
          <Typography component="h2" variant="h6">
            Member Id:
          </Typography>
          <Typography>{userCtx.memberId}</Typography>
        </Item>
      </Box>
    </>
  );
};

export default CustomerDashboard;
