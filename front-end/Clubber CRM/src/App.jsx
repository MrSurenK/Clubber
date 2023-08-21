import "./App.css";
import { useState } from "react";
import Login from "./LoginSignUp/Login";
import SignUp from "./LoginSignUp/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./User";
import StaffPortal from "./StaffComponents/StaffPortal";
import StaffDashboard from "./StaffComponents/StaffDashboard";
import MemberDisplay from "./StaffComponents/MemberDisplay";
import StaffRevenue from "./StaffComponents/StaffRevenue";
import StaffEmployee from "./StaffComponents/StaffEmployee";
import CustomerDashboard from "./CustomerPortal/CustomerDashboard";
import CustomerPortal from "./CustomerPortal/CustomerPortal";
import CmAccountMgmt from "./CustomerPortal/CmAccountMgmt";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [emailDisplay, setEmailDisplay] = useState("");
  const [isStaff, setIsStaff] = useState(false);
  const [staffId, setStaffId] = useState("");
  const [staffRank, setStaffRank] = useState("");
  const [isMember, setIsMember] = useState(false);
  const [memberId, setMemberId] = useState("");
  const [memberRank, setMemberRank] = useState("");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <Login
                setAccessToken={setAccessToken}
                setEmailDisplay={setEmailDisplay}
                setIsStaff={setIsStaff}
                setStaffId={setStaffId}
                setStaffRank={setStaffRank}
                setIsMember={setIsMember}
                setMemberId={setMemberId}
                setMemberRank={setMemberRank}
              />
            }
          />
          <Route path="/register" element={<SignUp />} />
          <Route path="/user" element={<User />}>
            <Route path="customer" element={<CustomerPortal />}>
              <Route path="dashboard" element={<CustomerDashboard />} />
              <Route path="account" element={<CmAccountMgmt />} />
            </Route>
            <Route path="staff" element={<StaffPortal />}>
              <Route path="dashboard" element={<StaffDashboard />} />
              <Route path="members" element={<MemberDisplay />} />
              <Route path="revenue" element={<StaffRevenue />} />
              <Route path="employee" element={<StaffEmployee />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
