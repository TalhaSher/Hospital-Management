import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Typography,
} from "@mui/material";
import { format, parseISO, isBefore, subDays } from "date-fns";

const PastAppointmentsTable = ({ appointments }) => {
  const pastAppointments = appointments
    .filter((appointment) => {
      const appointmentDate = parseISO(appointment.appointmentDate);
      return isBefore(appointmentDate, subDays(new Date(), 1));
    })
    .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));

  return (
    <Box sx={{ marginTop: "2rem" }}>
      <Typography variant="h6">Past Appointments</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Appointment Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pastAppointments.map((appointment) => (
            <TableRow key={appointment._id}>
              <TableCell>{appointment.firstName}</TableCell>
              <TableCell>{appointment.lastName}</TableCell>
              <TableCell>
                {format(parseISO(appointment.appointmentDate), "MM/dd/yyyy")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default PastAppointmentsTable;
