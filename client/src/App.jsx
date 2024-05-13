import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import MainPage from "../components/patient/main/MainPage";
import AppointmentPage from "../components/patient/doctor/AppointmentPage";
import axios from "axios";
import "./App.css";

function App() {
  axios.defaults.baseURL = "http://localhost:3000";
  // axios.defaults.baseURL = "http://192.168.8.102:3000";
  axios.defaults.withCredentials = false;

  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path="/doctors" element={<MainPage />} />
        <Route path="/doctors/:id" element={<AppointmentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
