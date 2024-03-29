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
import Reservations from "./StaffComponents/Reservations";
import ReservationForm from "./StaffComponents/ReservationForm";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [isStaff, setIsStaff] = useState(false);
  const [staffId, setStaffId] = useState("");
  const [staffRank, setStaffRank] = useState("");
  const [isMember, setIsMember] = useState(false);
  const [memberId, setMemberId] = useState("");
  const [memberRank, setMemberRank] = useState("");
  const [userId, setUserId] = useState("");

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
          userId,
          setUserId,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/register" element={<SignUp />} />

            <Route path="/user" element={<User />}>
              {isMember && (
                <Route
                  path="customer"
                  element={<CustomerPortal memberId={memberId} />}
                >
                  <Route path="dashboard" element={<CustomerDashboard />} />
                  <Route path="account" element={<CmAccountMgmt />} />
                </Route>
              )}

              {isStaff && (
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
                  <Route path="reservations" element={<Reservations />} />
                  <Route path="reserve" element={<ReservationForm />} />
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
