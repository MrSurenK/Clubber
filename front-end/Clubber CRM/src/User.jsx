import React from "react";
import StaffDashBoard from "./StaffComponents/StaffDashBoard";
import CustomerDashBoard from "./CustomerPortal/CustomerDashBoard";

const User = () => {
  return (
    <>
      <StaffDashBoard></StaffDashBoard>
      <CustomerDashBoard></CustomerDashBoard>
    </>
  );
};

export default User;
