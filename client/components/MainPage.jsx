import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../subComponents/Cards";
import FlexCenter from "../subComponents/FlexCenter";
import { Grid, Box, useMediaQuery } from "@mui/material";
import Navbar from "./Navbar";

const MainPage = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get("/doctors").then((res) => setDoctors(res.data.doctors));
  }, []);

  return (
    <>
      <Navbar />
      <FlexCenter>
        <Box width="80%">
          <Grid container spacing={2}>
            {doctors.map((doctor, i) => (
              <Grid item key={i} xs={12} sm={6} md={3}>
                <Cards data={doctor} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </FlexCenter>
    </>
  );
};

export default MainPage;
