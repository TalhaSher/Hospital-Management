import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Button,
  TextField,
  useMediaQuery,
  Snackbar,
} from "@mui/material";
import NavBar from "../Navbar";
import axios from "axios";
import FlexCenter from "../../../subComponents/FlexCenter";
import { Formik } from "formik";
import * as yup from "yup";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// APPOINTMENT SCHEMA

const appointmentSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  gender: yup.string().required("required"),
  age: yup.number().required("required"),
  phoneNo: yup.string().required("required"),
  appointmentDate: yup
    .date()
    .min(new Date(), "Appointment date cannot be in the past")
    .required("required"),
});

const initialValueAppointment = {
  firstName: "",
  lastName: "",
  gender: "",
  age: 0,
  phoneNo: "",
  appointmentDate: "", // Add the appointmentDate field
};

const AppointmentPage = () => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  };
  const { id } = useParams();
  const [doctor, setDoctor] = useState({});
  const [open, setOpen] = useState(false);
  const [maxAppointments, setMaxAppointments] = useState();

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const fullName = doctor.firstName + " " + doctor.lastName;

  useEffect(() => {
    axios.get(`/doctors/${id}`).then((res) => {
      setDoctor(res.data.doctor);
      setMaxAppointments(res.data.doctor.appointments.length);
    });
  }, []);

  const getAppointment = async (values, onSubmitProps) => {
    axios.post(`/doctors/${id}`, { values }, headers).then((res) => {
      onSubmitProps.resetForm();
      setOpen(true);
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    getAppointment(values, onSubmitProps);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      <NavBar />
      <FlexCenter>
        <Box
          height="100vh"
          width="80%"
          margin="1rem 0"
          sx={{
            display: "flex",
            borderRadius: 1,
            backgroundColor: "#eceded",
            flexDirection: "column",
          }}
        >
          <Box
            width="100%"
            padding="1rem 1rem"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Chip color="primary" label={doctor.doctorOf} />
            <Chip color="success" label={doctor.education} />
          </Box>

          <Box width="100%" padding="1rem 1rem">
            <Typography>{fullName}</Typography>
          </Box>
          <Box width="100%" padding="1rem 1rem">
            <Typography variant="caption" color="text.secondary">
              {doctor.description}
            </Typography>
            <Box>
              <Typography variant="caption" color="red">
                Remaining Appointments :{" "}
                {doctor.maxAppointments - maxAppointments}
              </Typography>
            </Box>
          </Box>

          <Box>
            <FlexCenter>
              <Box
                backgroundColor="#c1d3eb"
                width={isNonMobile ? "50%" : "80%"}
                borderRadius={1}
              >
                <Formik
                  onSubmit={handleFormSubmit}
                  initialValues={initialValueAppointment}
                  validationSchema={appointmentSchema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    resetForm,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <Box
                        gap="30px"
                        width="100%"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        padding="2rem 2rem"
                      >
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          width={isNonMobile ? "100%" : "80%"}
                          flexDirection={isNonMobile ? "row" : "column"}
                        >
                          <Box>
                            <TextField
                              label="First Name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.firstName}
                              name="firstName"
                              error={
                                Boolean(touched.firstName) &&
                                Boolean(errors.firstName)
                              }
                              helperText={touched.firstName && errors.firstName}
                              sx={{
                                margin: isNonMobile ? "0" : "1rem 0",
                              }}
                            />
                          </Box>
                          <Box>
                            <TextField
                              label="Last Name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.lastName}
                              name="lastName"
                              error={
                                Boolean(touched.lastName) &&
                                Boolean(errors.lastName)
                              }
                              helperText={touched.lastName && errors.lastName}
                              sx={{ marginLeft: isNonMobile ? "1rem " : 0 }}
                            />
                          </Box>
                        </Box>
                        <Box width={isNonMobile ? "100%" : "80%"}>
                          <TextField
                            label="Gender"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.gender}
                            name="gender"
                            error={
                              Boolean(touched.gender) && Boolean(errors.gender)
                            }
                            helperText={touched.gender && errors.gender}
                            sx={{ width: isNonMobile ? "100%" : "100%" }}
                          />
                        </Box>
                        <Box width={isNonMobile ? "100%" : "80%"}>
                          <TextField
                            label="Age"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.age}
                            name="age"
                            type="number"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            error={Boolean(touched.age) && Boolean(errors.age)}
                            helperText={touched.age && errors.age}
                            sx={{ width: isNonMobile ? "100%" : "100%" }}
                          />
                        </Box>
                        <Box width={isNonMobile ? "100%" : "80%"}>
                          <TextField
                            label="Phone No"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.phoneNo}
                            name="phoneNo"
                            error={
                              Boolean(touched.phoneNo) &&
                              Boolean(errors.phoneNo)
                            }
                            helperText={touched.phoneNo && errors.phoneNo}
                            sx={{ width: isNonMobile ? "100%" : "100%" }}
                          />
                        </Box>
                        <Box width={isNonMobile ? "100%" : "80%"}>
                          <TextField
                            label="Appointment Date"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.appointmentDate}
                            name="appointmentDate"
                            type="date"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            error={
                              Boolean(touched.appointmentDate) &&
                              Boolean(errors.appointmentDate)
                            }
                            helperText={
                              touched.appointmentDate && errors.appointmentDate
                            }
                            sx={{ width: isNonMobile ? "100%" : "100%" }}
                          />
                        </Box>
                      </Box>
                      <Box width={isNonMobile ? "100%" : "80%"}>
                        <Button
                          fullWidth
                          type="submit"
                          sx={{
                            m: "2rem 0",
                            p: "1rem",
                          }}
                          variant="outlined"
                        >
                          Get Appointment
                        </Button>
                      </Box>
                    </form>
                  )}
                </Formik>
              </Box>
            </FlexCenter>
          </Box>
        </Box>
      </FlexCenter>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="You will receive a call shortly!"
        action={action}
        sx={{
          backgroundColor: "white",
          color: "black",
        }}
      />
    </>
  );
};

export default AppointmentPage;
