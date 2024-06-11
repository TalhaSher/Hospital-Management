import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import NavBar from "../../Navbar";
import ManagementCard from "../extras/ManagementCard";
import DoctorsTable from "../extras/DoctorsTable";
import ManagementAuth from "../../../auth/ManagementAuth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { id } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  let appointmentsLength = appointments.length;
  let doctorsLength = doctors.length;

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    axios.get("/management/doctors").then((res) => {
      setDoctors(res.data.doctors);
    });
  }, [id]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    axios.get("/management/getappointments").then((res) => {
      setAppointments(res.data.appointments);
    });
  }, [id]);
  return (
    <ManagementAuth>
      <CssBaseline />
      <Box sx={{ width: "100vw", backgroundColor: "white" }}>
        <NavBar />
        <ManagementCard
          doctorslength={doctorsLength}
          appointmentslength={appointmentsLength}
        />
        <DoctorsTable doctors={doctors} />
      </Box>
    </ManagementAuth>
  );
};

export default Dashboard;
