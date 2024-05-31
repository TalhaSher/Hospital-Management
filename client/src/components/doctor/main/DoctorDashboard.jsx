import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import NavBar from "../../Navbar";
import AppointmentsTable from "./AppointmentsTable";
import PastAppointmentsTable from "./PastAppointmentsTable";
import DoctorInfo from "./DoctorInfo";
import DoctorAuth from "../../../auth/DoctorAuth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const DoctorDashboard = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState({});
  const [appointments, setAppointments] = useState([]);

  const user = useSelector((state) => state.auth.user);
  const login = useSelector((state) => state.auth.isLoggedIn);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (user.firstName) {
        if (user._id == id) {
          const fetchDoctorData = async () => {
            try {
              axios.get(`/doctor/${id}/dashboard`).then((res) => {
                setDoctor(res.data.doctor);
                setAppointments(res.data.doctor.appointments || []);
              });
            } catch (error) {
              console.error("Error fetching doctor data:", error);
            }
          };
          fetchDoctorData();
        } else {
          toast.error("Unauthorized");
          navigate(`/doctor/${id}/dashboard`);
        }
      }
    } catch (error) {
      window.location.reload();
    }
  }, [user]);

  const styles = {
    height: "100vh",
    width: "100vw",
    backgroundColor: "white",
    overflowX: "hidden",
  };

  return (
    <>
      <DoctorAuth>
        <NavBar />
        <Box sx={styles}>
          <DoctorInfo doctor={doctor} />
          <AppointmentsTable appointments={appointments} />
          <PastAppointmentsTable appointments={appointments} />
        </Box>
      </DoctorAuth>
    </>
  );
};

export default DoctorDashboard;
