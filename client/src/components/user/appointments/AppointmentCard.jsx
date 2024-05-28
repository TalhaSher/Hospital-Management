import { useEffect, useState } from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const AppointmentCard = ({ user }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setSelectedAppointment(null);
    setOpenModal(false);
  };

  const deleteAppointment = async (id) => {
    try {
      const res = await axios.delete(`/appointment/${id}`);
      if (res.status === 200) {
        toast.success("Appointment Deleted");
        setSelectedAppointment(null);
        setOpenModal(false);
        window.location.reload();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        toast.error(error.response.data.msg);
      } else {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <Box>
      {user.appointments.length ? (
        user.appointments.map((appointment, index) => (
          <Box
            key={appointment._id}
            mb={2}
            p={2}
            border="1px solid #ccc"
            borderRadius={1}
            sx={{
              backgroundColor:
                appointment.status === "approved"
                  ? "lightgreen"
                  : appointment.status === "declined"
                  ? "lightcoral"
                  : "white",
            }}
          >
            <Typography variant="h6">Appointment # 0{index + 1}</Typography>
            <Typography variant="h6">
              {appointment.firstName} {appointment.lastName}
            </Typography>
            <Typography>Appointment ID: {appointment._id}</Typography>

            <Typography>Status: {appointment.status}</Typography>
            <Button onClick={() => handleModalOpen(appointment)}>
              Open Modal
            </Button>
          </Box>
        ))
      ) : (
        <Typography>No appointments found.</Typography>
      )}
      <Modal open={openModal} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            height: "50%",
            bgcolor: "white",
            borderRadius: 1,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">
            {selectedAppointment &&
              `${selectedAppointment.firstName} ${selectedAppointment.lastName}`}
          </Typography>
          <Typography>
            Doctor:{" "}
            {selectedAppointment &&
              `${selectedAppointment.doctor.firstName} ${selectedAppointment.doctor.lastName}`}
          </Typography>
          <Typography>
            Doctor of:{" "}
            {selectedAppointment && selectedAppointment.doctor.doctorOf}
          </Typography>
          <Typography>
            Date:{" "}
            {selectedAppointment &&
              new Date(
                selectedAppointment.appointmentDate
              ).toLocaleDateString()}
          </Typography>
          <Typography>
            Status: {selectedAppointment && selectedAppointment.status}
          </Typography>
          <Button onClick={handleModalClose} color="success" variant="outlined">
            Close
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={() => deleteAppointment(selectedAppointment._id)}
          >
            Cancel Appointment
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default AppointmentCard;
