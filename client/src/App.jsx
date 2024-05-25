import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import axios from "axios";
import "./App.css";
import MainPage from "./components/user/main/MainPage";
import AppointmentPage from "./components/user/doctor/AppointmentPage";
import AuthPage from "./components/user/auth/Auth";
import { Toaster } from "react-hot-toast";
import Appointment from "./components/user/appointments/Appointment";

function App() {
  axios.defaults.baseURL = "http://localhost:3000";
  axios.defaults.withCredentials = true;

  return (
    <BrowserRouter>
      <CssBaseline />
      <Toaster />
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/doctors" element={<MainPage />} />
        <Route path="/doctors/:id" element={<AppointmentPage />} />
        <Route path="/appointments" element={<Appointment />} />
        <Route path="*" element={<p>404 Not Found</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
