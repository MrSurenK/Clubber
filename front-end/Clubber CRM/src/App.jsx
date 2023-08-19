import "./App.css";
import SignIn from "./LoginSignUp/Login";
import SignUp from "./LoginSignUp/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StaffDashBoard from "./StaffComponents/StaffDashBoard";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/dashboard" element={<StaffDashBoard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
