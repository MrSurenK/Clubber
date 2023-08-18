import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StaffDashboard from "./StaffComponents/StaffDashBoard";

const Display = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/dashboard" element={<StaffDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Display;
