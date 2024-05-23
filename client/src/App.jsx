import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import axios from "axios";
import "./App.css";
import MainPage from "../components/user/main/MainPage";
import AppointmentPage from "../components/user/doctor/AppointmentPage";
import AuthPage from "../components/user/auth/Auth";

function App() {
  axios.defaults.baseURL = "http://localhost:3000";
  axios.defaults.withCredentials = false;

  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/doctors" element={<MainPage />} />
        <Route path="/doctors/:id" element={<AppointmentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
