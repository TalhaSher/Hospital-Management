import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import NavBar from "../../Navbar";
import ManagementCard from "../extras/ManagementCard";

const Dashboard = () => {
  const { id } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  let appointmentsLength = appointments.length;
  let doctorsLength = doctors.length;

  useEffect(() => {
    axios.get("/management/doctors").then((res) => {
      setDoctors(res.data.doctors);
    });
  }, [id]);

  useEffect(() => {
    axios.get("/management/getappointments").then((res) => {
      setAppointments(res.data.appointments);
    });
  }, [id]);
  return (
    <>
      <CssBaseline />
      <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "white" }}>
        <NavBar />
        <ManagementCard
          doctorslength={doctorsLength}
          appointmentslength={appointmentsLength}
        />
      </Box>
    </>
  );
};

export default Dashboard;
