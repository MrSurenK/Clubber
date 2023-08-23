import React from "react";
import CustomerLayout from "./CustomerLayout";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const CustomerPortal = (props) => {
  const customTheme = createTheme({
    typography: {
      fontFamily: "Exo, Roboto",
    },
  });

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <CustomerLayout memberId={props.memberId}></CustomerLayout>rs
        <Box
          sx={{
            display: "flex",
            height: `calc(100% - ${100}px)`,
            marginTop: `${100}px`,
            alignItems: "flex-start",
            width: `calc(100% - ${240}px)`,
            marginLeft: `${240}px`,
          }}
        >
          <Outlet />
        </Box>
      </ThemeProvider>
    </>
  );
};

export default CustomerPortal;
