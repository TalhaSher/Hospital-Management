import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import NavBar from "../../Navbar";
import AppointmentsTable from "./AppointmentsTable";
import PastAppointmentsTable from "./PastAppointmentsTable";
import DoctorInfo from "./DoctorInfo";

const DoctorDashboard = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState({});
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const res = await axios.get(`/doctor/${id}/dashboard`);
        setDoctor(res.data.doctor);
        setAppointments(res.data.doctor.appointments || []);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctorData();
  }, [id]);

  const styles = {
    height: "100vh",
    width: "100vw",
    backgroundColor: "white",
    overflowX: "hidden",
  };

  return (
    <>
      <NavBar />
      <Box sx={styles}>
        <DoctorInfo doctor={doctor} />
        <AppointmentsTable appointments={appointments} />
        <PastAppointmentsTable appointments={appointments} />
      </Box>
    </>
  );
};

export default DoctorDashboard;
