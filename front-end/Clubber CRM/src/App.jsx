import "./App.css";
import SignIn from "./LoginSignUp/Login";
import SignUp from "./LoginSignUp/Register";
import Display from "./Display";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
      <Display></Display>
    </BrowserRouter>
  );
}

export default App;
