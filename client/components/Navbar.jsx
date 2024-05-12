import React from "react";
import { Box, Typography } from "@mui/material";
import FlexCenter from "../subComponents/FlexCenter";

import Filter from "./Filter";

const NavBar = () => {
  return (
    <FlexCenter
      width="100%"
      height="8vh"
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "blue",
        margin: "0",
        flexDirection: "column",
      }}
    >
      <Box>
        <Typography>KPK Civil Hospital</Typography>
      </Box>
    </FlexCenter>
  );
};

export default NavBar;
