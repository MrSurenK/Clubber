import "./App.css";
import SignIn from "./LoginSignUp/Login";
import SignUp from "./LoginSignUp/Register";
import Display from "./Display";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <Display></Display>
    </>
  );
}

export default App;
