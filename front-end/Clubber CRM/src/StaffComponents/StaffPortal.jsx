import React from "react";
import StaffLayout from "./StaffLayout";
import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const StaffPortal = () => {
  const customTheme = createTheme({
    typography: {
      fontFamily: "Exo, Roboto",
    },
  });

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <StaffLayout></StaffLayout>
        <Outlet />
      </ThemeProvider>
    </>
  );
};

export default StaffPortal;
