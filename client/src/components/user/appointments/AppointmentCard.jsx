import { useEffect, useState } from "react";
import { Box, Typography, Button, Modal } from "@mui/material";

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
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Box>
      {user.appointments.length ? (
        user.appointments.map((appointment) => (
          <Box
            key={appointment._id}
            mb={2}
            p={2}
            border="1px solid #ccc"
            borderRadius={1}
          >
            <Typography variant="h6">
              {appointment.firstName} {appointment.lastName}
            </Typography>
            <Typography>Appointment ID: {appointment._id}</Typography>
            <Typography>
              Doctor: {appointment.doctor.firstName}{" "}
              {appointment.doctor.lastName}
            </Typography>
            <Typography>
              Date: {new Date(appointment.appointmentDate).toLocaleDateString()}
            </Typography>
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
          <Button onClick={handleModalClose} color="success" variant="outlined">
            Close
          </Button>
          <Button color="error" variant="outlined">
            Delete
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default AppointmentCard;

// {
//     "_id": "66512cb0f330f0b5437b6319",
//     "role": "user",
//     "email": "xexcalibur9090@gmail.com",
//     "password": "$2b$10$hDs4o00qBgvN/gip/gEhyOi4RwMi6VrqlFmQ41QH7TXuI8XRJQVZO",
//     "appointments": [
//         {
//             "_id": "665242a85f93a0e145ca0883",
//             "firstName": "Talha",
//             "lastName": "Sher",
//             "gender": "Male",
//             "age": 20,
//             "phoneNo": "03182134928347",
//             "doctor": {
//                 "_id": "6640c9c5700b134e2a9b6bad",
//                 "role": "doctor",
//                 "firstName": "Talha",
//                 "lastName": "Khan",
//                 "email": "talhasher1232@gmail.com",
//                 "password": "$2b$10$QnKSuDxuB3CUOEnJvpWAs.nIe7jGg0MtoAyl3wWhK60CHPAqJ70ni",
//                 "doctorOf": "Plastic Surgeon",
//                 "education": "PHD",
//                 "description": "I am the best doctor there is, Ofcourse i will over charge you but it will be worth it. I will definitly charge more than 5000rs a session cuz im the best, im can not be replaced",
//                 "phoneNo": "03166394336",
//                 "maxAppointments": 30,
//                 "createdAt": "2024-05-12T13:53:09.849Z",
//                 "updatedAt": "2024-05-25T19:57:29.013Z",
//                 "__v": 3,
//                 "appointments": [
//                     "66514f49f4a44aba3b822578",
//                     "665240751198141db701f6f3",
//                     "665242a85f93a0e145ca0883"
//                 ]
//             },
//             "appointmentDate": "2024-05-27T00:00:00.000Z",
//             "__v": 0
//         }
//     ],
//     "__v": 4
// }
