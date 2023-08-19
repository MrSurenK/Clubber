import React from "react";
import CustomerAccountMgmt from "./CmAccountMgmt";
import CustomerDashBoard from "./CustomerDashBoard";

const CustomerPortal = () => {
  return (
    <>
      <CustomerDashBoard></CustomerDashBoard>
      <CustomerAccountMgmt></CustomerAccountMgmt>
    </>
  );
};

export default CustomerPortal;
