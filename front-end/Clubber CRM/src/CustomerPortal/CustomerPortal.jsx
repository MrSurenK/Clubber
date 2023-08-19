import React from "react";
import CustomerAccountMgmt from "./CmAccountMgmt";
import CustomerDashBoard from "./CustomerDashboard";

const CustomerPortal = () => {
  return (
    <>
      <CustomerDashBoard></CustomerDashBoard>
      <CustomerAccountMgmt></CustomerAccountMgmt>
    </>
  );
};

export default CustomerPortal;
