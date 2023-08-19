import React from "react";
import StaffLayout from "./StaffLayout";
import { Outlet } from "react-router-dom";

const StaffPortal = () => {
  return (
    <>
      <StaffLayout></StaffLayout>
      <Outlet />
    </>
  );
};

export default StaffPortal;
