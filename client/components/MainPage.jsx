import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../subComponents/Cards";
import FlexCenter from "../subComponents/FlexCenter";
import { Grid, Box, Typography } from "@mui/material";
import Navbar from "./Navbar";
import Filter from "./Filter";
import Skeletons from "./Skeletons";

const MainPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [filter, setFilter] = useState("All");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const filterChangeHandler = (value) => {
    setFilter(value);
  };

  useEffect(() => {
    setIsLoading(true);
    axios.get("/doctors").then((res) => {
      setDoctors(res.data.doctors);
      // Initially set filtered doctors to all doctors
      setFilteredDoctors(res.data.doctors);

      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (filter === "All") {
      setIsLoading(true);
      // If filter is "All", set filtered doctors to all doctors
      setFilteredDoctors(doctors);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      // Otherwise, filter the doctors based on the selected filter
      const filtered = doctors.filter((doctor) => doctor.doctorOf === filter);
      setFilteredDoctors(filtered);
      setIsLoading(false);
    }
  }, [doctors, filter]);

  return (
    <>
      <Navbar />
      <Filter filterChangeHandler={filterChangeHandler} />
      <FlexCenter>
        <Box width="80%">
          {isLoading && (
            <>
              <Skeletons />
              <Skeletons />
              <Skeletons />
              <Skeletons />
            </>
          )}
          {!isLoading && filteredDoctors.length === 0 ? (
            <Box
              width="100%"
              height="100vh"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>No Doctors Found !</Typography>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {filteredDoctors.map((doctor, i) => (
                <Grid item key={i} xs={12} sm={6} md={3}>
                  <Cards data={doctor} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </FlexCenter>
    </>
  );
};

export default MainPage;
