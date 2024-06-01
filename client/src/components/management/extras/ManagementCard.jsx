import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const ManagementCard = ({ doctorslength, appointmentslength }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "row" : "column", // Change direction based on screen size
          flexWrap: isMobile ? "wrap" : "nowrap", // Allow wrapping on mobile
          justifyContent: isMobile ? "space-between" : "flex-start", // Adjust alignment
          margin: "2rem 0",
          gap: isMobile ? "1rem" : "2rem", // Adjust gap based on screen size
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "2rem",
            boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.2)", // Improved drop shadow
            borderRadius: "8px", // Rounded corners
            backgroundColor: "#fff", // White background
            width: isMobile ? "45%" : "60%", // Adjust width based on screen size
            minWidth: isMobile ? "120px" : "auto", // Minimum width for mobile
            textAlign: "center", // Center text for mobile
            margin: isMobile ? "0" : "0 auto", // Center the boxes on non-mobile
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between", // Space between the elements
              alignItems: "center", // Center align the items vertically
            }}
          >
            <Typography variant="h6">Doctors</Typography>
            <Typography variant="h4" color="green">
              {doctorslength}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "2rem",
            boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.2)", // Improved drop shadow
            borderRadius: "8px", // Rounded corners
            backgroundColor: "#fff", // White background
            width: isMobile ? "45%" : "60%", // Adjust width based on screen size
            minWidth: isMobile ? "120px" : "auto", // Minimum width for mobile
            textAlign: "center", // Center text for mobile
            margin: isMobile ? "0" : "0 auto", // Center the boxes on non-mobile
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between", // Space between the elements
              alignItems: "center", // Center align the items vertically
            }}
          >
            <Typography variant="h6">Appointments</Typography>
            <Typography
              variant="h4"
              color={appointmentslength > 0 ? "green" : "red"}
            >
              {appointmentslength}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ManagementCard;
