import { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Modal,
  TextField,
  Backdrop,
  Fade,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import toast from "react-hot-toast";
import { doctorType } from "../../../subComponents/doctorType"; // Adjust the import path as needed

const headers = {
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
};

const DoctorsTable = ({ doctors }) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setDeleteOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    doctorOf: "",
    education: "",
    description: "",
    phoneNo: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteOpen = (id) => {
    setSelectedDoctor(id);
    setDeleteOpen(true);
  };
  const handleDeleteClose = () => setDeleteOpen(false);

  const handleDeletion = () => {
    try {
      handleDeleteClose();
      axios.delete(`/management/deleteDoctor/${selectedDoctor}`).then((res) => {
        if (res.status == 200) {
          toast.success("Deleted Successfully");
        }
      });
      setSelectedDoctor("");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        handleDeleteClose();
        toast.error(error.response.data.msg);
        setSelectedDoctor("");
      } else {
        handleDeleteClose();
        toast.error("An error occurred.");
        setSelectedDoctor("");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/management/create/doctor",
        { doctor: formValues },
        headers
      );
      if (response.status === 200) {
        toast.success("Account Created Successfully");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("An error occurred.");
      }
    }
    handleClose();
  };

  return (
    <>
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <Box sx={{ marginBottom: "2rem", padding: "0 2rem" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <Typography variant="h6" sx={{ textDecoration: "underline" }}>
              Doctors
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: "lightgrey",
                color: "black",
                "&:hover": {
                  backgroundColor: "grey",
                  cursor: "pointer",
                },
              }}
              onClick={handleOpen}
            >
              Add
            </Button>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Appointments</TableCell>
                <TableCell>Doctor Of</TableCell>
                <TableCell>Education</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor._id}>
                  <TableCell>{doctor._id}</TableCell>
                  <TableCell>
                    {doctor.firstName} {doctor.lastName}
                  </TableCell>
                  <TableCell>{doctor.appointments.length}</TableCell>
                  <TableCell>{doctor.doctorOf}</TableCell>
                  <TableCell>{doctor.education}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteOpen(doctor._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItem: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                Add Doctor
              </Typography>

              <IconButton
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: 27,
                  right: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                autoFocus
                value={formValues.firstName}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                value={formValues.lastName}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formValues.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formValues.password}
                onChange={handleChange}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="doctorOf-label">Doctor Of</InputLabel>
                <Select
                  labelId="doctorOf-label"
                  id="doctorOf"
                  name="doctorOf"
                  value={formValues.doctorOf}
                  onChange={handleChange}
                  label="Doctor Of"
                >
                  {doctorType.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                margin="normal"
                required
                fullWidth
                name="education"
                label="Education"
                id="education"
                value={formValues.education}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="description"
                label="Description"
                id="description"
                value={formValues.description}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="phoneNo"
                label="Phone Number"
                id="phoneNo"
                value={formValues.phoneNo}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add Doctor
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>

      <Modal open={openDelete} onClose={handleDeleteClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
        >
          <Box mb="2rem">
            <Typography>Are you sure ?</Typography>
          </Box>

          <Button
            variant="outlined"
            color="success"
            sx={{ marginRight: "1rem" }}
          >
            Cancel
          </Button>
          <Button variant="outlined" color="error" onClick={handleDeletion}>
            Delete
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default DoctorsTable;
