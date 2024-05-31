import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { format, isToday, isTomorrow, parseISO } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";

const AppointmentsTable = ({ appointments }) => {
  const handleStatusChange = async (appointmentId, status) => {
    try {
      await axios.patch(`/doctor/appointment/${appointmentId}`, { status });
      toast.success("Appointments updated successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  const groupedAppointments = appointments.reduce((acc, appointment) => {
    const appointmentDate = parseISO(appointment.appointmentDate);
    let key;

    if (isToday(appointmentDate)) {
      key = "Today";
    } else if (isTomorrow(appointmentDate)) {
      key = "Tomorrow";
    } else {
      key = format(appointmentDate, "MM/dd/yyyy");
    }

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(appointment);

    return acc;
  }, {});

  const sortedGroupedAppointments = Object.keys(groupedAppointments).reduce(
    (acc, date) => {
      acc[date] = groupedAppointments[date].sort((a, b) => {
        if (
          a.status === "pending" &&
          (b.status === "approved" || b.status === "declined")
        ) {
          return -1;
        }
        if (a.status === "approved" && b.status === "declined") {
          return -1;
        }
        if (a.status === b.status) {
          return 0;
        }
        return 1;
      });
      return acc;
    },
    {}
  );

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      {Object.keys(sortedGroupedAppointments).map((date) => (
        <Box key={date} sx={{ marginBottom: "2rem" }}>
          <Typography variant="h6" sx={{ textDecoration: "underline" }}>
            {date}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Appointment Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedGroupedAppointments[date].map((appointment) => (
                <TableRow
                  key={appointment._id}
                  sx={{
                    backgroundColor:
                      appointment.status === "approved"
                        ? "lightgreen"
                        : appointment.status === "declined"
                        ? "lightcoral"
                        : "white",
                  }}
                >
                  <TableCell>{appointment.firstName}</TableCell>
                  <TableCell>{appointment.lastName}</TableCell>
                  <TableCell>
                    {format(
                      parseISO(appointment.appointmentDate),
                      "MM/dd/yyyy"
                    )}
                  </TableCell>
                  <TableCell>{appointment.status}</TableCell>
                  <TableCell>
                    {appointment.status === "pending" ? (
                      <Box>
                        <Button
                          variant="outlined"
                          color="success"
                          onClick={() =>
                            handleStatusChange(appointment._id, "approved")
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() =>
                            handleStatusChange(appointment._id, "declined")
                          }
                        >
                          Decline
                        </Button>
                      </Box>
                    ) : (
                      appointment.status
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      ))}
    </Box>
  );
};

export default AppointmentsTable;
