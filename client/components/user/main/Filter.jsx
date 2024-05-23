import React from "react";
import Select from "react-select";
import { Box, Typography, Grid } from "@mui/material";
import { doctorTypes } from "../../../subComponents/doctorTypes";
import FlexCenter from "../../../subComponents/FlexCenter";

const Filter = ({ filterChangeHandler }) => {
  return (
    <Box backgroundColor="grey">
      <FlexCenter>
        <Box
          width="80%"
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
          height="4rem"
        >
          <Typography>Doctor Of </Typography>

          <Box width="10rem">
            <Select
              options={doctorTypes}
              defaultValue={doctorTypes[0]}
              onChange={(selected) => {
                filterChangeHandler(selected.value);
              }}
            />
          </Box>
        </Box>
      </FlexCenter>
    </Box>
  );
};

export default Filter;
