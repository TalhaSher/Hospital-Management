import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const Cards = ({ data }) => {
  const navigate = useNavigate();
  const fullName = data.firstName + " " + data.lastName;

  return (
    <Card
      sx={{
        width: "100%", // Ensure card takes up full width of grid item
        minHeight: 275,
        margin: "1rem 0",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* HEADING */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "0.6rem 0",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {data.doctorOf}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.education}
          </Typography>
        </Box>

        {/* NAME */}
        <Typography variant="h5" sx={{ padding: "0.6rem 0" }}>
          {fullName}
        </Typography>

        {/* Description */}
        <Typography variant="caption">{data.description}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => navigate(`/doctors/${data._id}`)}>
          Get Appointment
        </Button>
      </CardActions>
    </Card>
  );
};

export default Cards;
