import "./App.css";
import SignIn from "./LoginSignUp/Login";
import SignUp from "./LoginSignUp/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./User";
import StaffPortal from "./StaffComponents/StaffPortal";
import StaffDashBoard from "./StaffComponents/StaffDashBoard";
import MemberDisplay from "./StaffComponents/MemberDisplay";
import StaffRevenue from "./StaffComponents/StaffRevenue";
import StaffEmployee from "./StaffComponents/StaffEmployee";
import CustomerDashBoard from "./CustomerPortal/CustomerDashBoard";
import CustomerPortal from "./CustomerPortal/CustomerPortal";
import CmAccountMgmt from "./CustomerPortal/CmAccountMgmt";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/user" element={<User />}>
            <Route path="customer" element={<CustomerPortal />}>
              <Route path="dashboard" element={<CustomerDashBoard />} />
              <Route path="account" element={<CmAccountMgmt />} />
            </Route>
            <Route path="staff" element={<StaffPortal />}>
              <Route path="dashboard" element={<StaffDashBoard />} />
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
