import React from "react";
import { Box, Typography } from "@mui/material";
import FlexCenter from "../../subComponents/FlexCenter";

const NavBar = () => {
  return (
    <FlexCenter
      width="100%"
      height="8vh"
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#c1d3eb",
        margin: "0",
        flexDirection: "column",
        color: "white",
      }}
    >
      <Box>
        <Typography
          sx={{
            display: "inline-block",
            fontFamily: "Pacifico",
            zIndex: 3,
            letterSpacing: "2px",
            fontWeight: "bold",
            fontSize: "large",
          }}
        >
          KPK Civil Hospital
        </Typography>
      </Box>
    </FlexCenter>
  );
};

export default NavBar;
