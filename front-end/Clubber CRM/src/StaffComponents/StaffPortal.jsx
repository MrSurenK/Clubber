import React from "react";
import StaffDashBoard from "./StaffDashBoard";
import MemberDisplay from "./MemberDisplay";
import StaffRevenue from "./StaffRevenue";
import StaffEmployee from "./StaffEmployee";
import StaffHeader from "./StaffHeader";

const StaffPortal = () => {
  return (
    <>
      <StaffHeader>Test</StaffHeader>
      <StaffDashBoard></StaffDashBoard>
      <MemberDisplay></MemberDisplay>
      <StaffRevenue></StaffRevenue>
      <StaffEmployee></StaffEmployee>
    </>
  );
};

export default StaffPortal;
