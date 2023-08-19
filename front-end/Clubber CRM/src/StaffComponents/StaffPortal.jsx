import React from "react";
import StaffHeader from "./StaffHeader";
import { Outlet } from "react-router-dom";
import StaffSideBar from "./StaffSideBar";

const StaffPortal = () => {
  return (
    <>
      <StaffHeader></StaffHeader>
      <StaffSideBar></StaffSideBar>
      <Outlet />
    </>
  );
};

export default StaffPortal;
