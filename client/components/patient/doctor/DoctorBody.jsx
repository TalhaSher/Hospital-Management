import React from "react";
import FlexCenter from "../../../subComponents/FlexCenter";
import { Box, Chip, Typography } from "@mui/material";

const DoctorBody = ({ doctor }) => {
  const fullName = doctor.firstName + " " + doctor.lastName;
  return (
    <FlexCenter>
      <Box
        height="100vh"
        width="80%"
        margin="1rem 0"
        sx={{
          display: "flex",
          borderRadius: 1,
          backgroundColor: "#eceded",
          flexDirection: "column",
        }}
      >
        <Box
          width="100%"
          padding="1rem 1rem"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Chip color="primary" label={doctor.doctorOf} />
          <Chip color="success" label={doctor.education} />
        </Box>

        <Box width="100%" padding="1rem 1rem">
          <Typography>{fullName}</Typography>
        </Box>
        <Box width="100%" padding="1rem 1rem">
          <Typography variant="caption" color="text.secondary">
            {doctor.description}
          </Typography>
        </Box>
      </Box>
    </FlexCenter>
  );
};

export default DoctorBody;
