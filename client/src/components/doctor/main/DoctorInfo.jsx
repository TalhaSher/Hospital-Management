import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const DoctorInfo = ({ doctor }) => {
  const date = doctor.createdAt ? new Date(doctor.createdAt) : null;

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ margin: "1rem " }}>
          {doctor.firstName} {doctor.lastName}
        </Box>
        <Box sx={{ margin: "1rem " }}>{doctor.doctorOf}</Box>
        <Box sx={{ margin: "1rem " }}>{doctor.education}</Box>
      </Box>
      <Divider />
      <Box
        sx={{
          width: "100vw",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ margin: "1rem " }}>{doctor.email}</Box>
        <Box sx={{ margin: "1rem " }}>{doctor.phoneNo}</Box>
      </Box>
      <Divider />
      <Box
        sx={{
          width: "100vw",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ margin: "1rem " }}>
          <Typography variant="caption">{doctor.description}</Typography>
        </Box>
      </Box>
      <Divider />

      {date && (
        <Box sx={{ margin: "1rem " }}>
          <Typography variant="caption">
            Joined At: {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default DoctorInfo;
