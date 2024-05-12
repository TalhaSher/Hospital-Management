import React from "react";
import Select from "react-select";
import { Box, Typography, Grid } from "@mui/material";
import { doctorTypes } from "../subComponents/doctorTypes";
import FlexCenter from "../subComponents/FlexCenter";

const Filter = ({ filterChangeHandler }) => {
  return (
    <Box backgroundColor="grey">
      <FlexCenter>
        <Box width="80%" display="flex">
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <Typography>Doctor Of :</Typography>
            </Grid>
            <Grid item xs={12}>
              <Select
                options={doctorTypes}
                defaultValue={doctorTypes[0]}
                isSearchable={true}
                isClearable={true}
                onChange={(selected) => {
                  filterChangeHandler(selected.value);
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </FlexCenter>
    </Box>
  );
};

export default Filter;
