import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import AppointmentCard from "./AppointmentCard";
import Authenticator from "../../../auth/Authenticator";
import Navigation from "../navigation/Navigation";

const Appointment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    try {
      setIsLoading(true);
      axios.get("/appointments").then((res) => {
        const resData = res.data.user;
        const user = resData;
        setData(user);
        setIsLoading(false);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  }, []);

  return (
    <Authenticator>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Box
          sx={{
            height: "100vh",
            width: "80vw",
            backgroundColor: "white",
            borderRadius: 1,
          }}
        >
          {!isLoading ? <AppointmentCard user={data} /> : <p>Loading</p>}
        </Box>
      </Box>
      <Navigation />
    </Authenticator>
  );
};

export default Appointment;
