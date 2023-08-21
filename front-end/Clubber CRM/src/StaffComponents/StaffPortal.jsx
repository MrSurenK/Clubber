import React from "react";
import StaffLayout from "./StaffLayout";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

const StaffPortal = () => {
  const customTheme = createTheme({
    typography: {
      fontFamily: "Exo, Roboto",
    },
  });

  return (
    <>
      <StaffLayout></StaffLayout>rs
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
    </>
  );
};

export default StaffPortal;
