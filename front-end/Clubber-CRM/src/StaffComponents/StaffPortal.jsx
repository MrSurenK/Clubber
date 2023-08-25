import React from "react";
import StaffLayout from "./StaffLayout";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const StaffPortal = (props) => {
  const customTheme = createTheme({
    typography: {
      fontFamily: "Exo, Roboto",
    },
  });

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <StaffLayout staffId={props.staffId}></StaffLayout>rs
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

export default StaffPortal;
