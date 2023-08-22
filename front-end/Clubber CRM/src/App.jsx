import "./App.css";
import { useState } from "react";
import Login from "./LoginSignUp/Login";
import SignUp from "./StaffComponents/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./User";
import StaffPortal from "./StaffComponents/StaffPortal";
import StaffDashboard from "./StaffComponents/StaffDashboard";
import MemberDisplay from "./StaffComponents/MemberDisplay";
import StaffRevenue from "./StaffComponents/StaffRevenue";
import StaffEmployee from "./StaffComponents/StaffEmployee";
import TransactionForm from "./StaffComponents/TransactionForm";
import CustomerDashboard from "./CustomerPortal/CustomerDashboard";
import CustomerPortal from "./CustomerPortal/CustomerPortal";
import CmAccountMgmt from "./CustomerPortal/CmAccountMgmt";
import UserContext from "./context/user";
import Registration from "./StaffComponents/Register";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [isStaff, setIsStaff] = useState(false);
  const [staffId, setStaffId] = useState("");
  const [staffRank, setStaffRank] = useState("");
  const [isMember, setIsMember] = useState(false);
  const [memberId, setMemberId] = useState("");
  const [memberRank, setMemberRank] = useState("");

  return (
    <>
      <UserContext.Provider
        value={{
          accessToken,
          setAccessToken,
          isStaff,
          setIsStaff,
          staffId,
          setStaffId,
          staffRank,
          setStaffRank,
          isMember,
          setIsMember,
          memberId,
          setMemberId,
          memberRank,
          setMemberRank,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/register" element={<SignUp />} />

            <Route path="/user" element={<User />}>
              {isMember === true && (
                <Route path="customer" element={<CustomerPortal />}>
                  <Route path="dashboard" element={<CustomerDashboard />} />
                  <Route path="account" element={<CmAccountMgmt />} />
                </Route>
              )}

              {isStaff === true && (
                <Route path="staff" element={<StaffPortal />}>
                  <Route
                    path="dashboard"
                    element={<StaffDashboard staffId={staffId} />}
                  />
                  <Route path="members" element={<MemberDisplay />} />
                  <Route path="revenue" element={<StaffRevenue />} />
                  <Route path="employee" element={<StaffEmployee />} />
                  <Route path="registration" element={<Registration />} />
                  <Route path="transaction" element={<TransactionForm />} />
                </Route>
              )}
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
